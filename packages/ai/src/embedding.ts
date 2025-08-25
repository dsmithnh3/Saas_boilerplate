import OpenAI from 'openai';
import { env } from '@acme/config';
import { execute } from '@acme/db';

// Create a single OpenAI client instance. This avoids reinitialization
// overhead in serverless environments.
const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

/**
 * Generate an embedding vector for the provided text.
 *
 * @param text - Input text to encode.
 * @param abortSignal - Optional abort signal for cancellation.
 * @returns Array of numbers representing the embedding vector.
 */
export async function generateEmbedding(
  text: string,
  abortSignal?: AbortSignal,
): Promise<number[]> {
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    signal: abortSignal,
  });
  return response.data[0]?.embedding ?? [];
}

/**
 * Encode and persist a document's embedding in the database.
 * Existing embeddings for the document are updated.
 */
export async function storeDocumentEmbedding(
  documentId: string,
  text: string,
  abortSignal?: AbortSignal,
): Promise<void> {
  const vector = await generateEmbedding(text, abortSignal);
  await execute((db) =>
    db.embedding.upsert({
      where: { documentId },
      update: { vector },
      create: { documentId, vector },
    }),
  );
}

/**
 * Perform a semantic search against stored document embeddings.
 * Returns matching embeddings including their associated documents.
 */
export async function semanticSearch(
  query: string,
  limit = 5,
  abortSignal?: AbortSignal,
) {
  const vector = await generateEmbedding(query, abortSignal);
  return execute((db) =>
    db.embedding.findMany({
      take: limit,
      orderBy: { vector: { _cosine: vector } },
      include: { document: true },
    }),
  );
}
