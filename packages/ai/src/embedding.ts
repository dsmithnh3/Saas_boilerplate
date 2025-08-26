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
  const response = await client.embeddings.create(
    {
      model: 'text-embedding-3-small',
      input: text,
    },
    { signal: abortSignal },
  );
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
  const vectorString = JSON.stringify(vector);

  await execute(async db => {
    // Check if embedding already exists for this document
    const existing = await db.embedding.findFirst({
      where: { documentId },
    });

    if (existing) {
      // Update existing embedding
      await db.embedding.update({
        where: { id: existing.id },
        data: { vector: vectorString },
      });
    } else {
      // Create new embedding
      await db.embedding.create({
        data: { documentId, vector: vectorString },
      });
    }
  });
}

/**
 * Perform a semantic search against stored document embeddings.
 * Returns matching embeddings including their associated documents.
 * Note: This is a simplified implementation. For production use with pgvector,
 * you would use cosine similarity ordering.
 */
export async function semanticSearch(query: string, limit = 5, abortSignal?: AbortSignal) {
  const queryVector = await generateEmbedding(query, abortSignal);

  return execute(async db => {
    const embeddings = await db.embedding.findMany({
      take: limit,
      include: { document: true },
    });

    // Calculate cosine similarity manually for now
    // In production, this would be done by the database with pgvector
    const results = embeddings.map(embedding => {
      const storedVector = JSON.parse(embedding.vector) as number[];
      const similarity = calculateCosineSimilarity(queryVector, storedVector);
      return { ...embedding, similarity };
    });

    // Sort by similarity (highest first)
    return results.sort((a, b) => b.similarity - a.similarity);
  });
}

/**
 * Calculate cosine similarity between two vectors.
 */
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
