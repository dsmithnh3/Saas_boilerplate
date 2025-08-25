import { z } from 'zod';

/**
 * Defines and validates all environment variables required by the application.
 *
 * Configuration values are declared in a Zod schema which provides rich
 * validation. At runtime the schema parses the `process.env` object and
 * throws if any mandatory variable is missing or malformed. Optional values
 * are marked accordingly.
 */
const envSchema = z.object({
  // Database URL in the form of a PostgreSQL connection string.
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid database URL'),
  // Secret used by NextAuth for signing JWTs. Should be at least 32 characters.
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET should be at least 32 characters long'),
  // Public URL where the Next.js application is hosted.
  NEXTAUTH_URL: z.string().url(),
  // API key for OpenAI or compatible embedding provider.
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  // S3-compatible object storage configuration. Optional if file uploads are disabled.
  S3_ENDPOINT: z.string().url().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  // OAuth credentials for GitHub provider. Optional if GitHub login is disabled.
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

// Parse the environment at module load time. If parsing fails the
// application will crash with a detailed error message which helps
// diagnosing misconfiguration early in the deployment process.
export const env: Env = envSchema.parse(process.env);
