import pino from 'pino';
import { context, trace } from '@opentelemetry/api';

/**
 * Configures a pino logger instance that automatically enriches each log
 * entry with the current OpenTelemetry trace and span identifiers. This
 * integration allows logs to be correlated with distributed traces in
 * observability backends.
 */
export const logger = pino({
  name: 'saas-boilerplate',
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        }
      : undefined,
  // Inject trace identifiers into every log entry for distributed tracing correlation
  mixin() {
    const span = trace.getSpan(context.active());
    const traceId = span?.spanContext().traceId;
    const spanId = span?.spanContext().spanId;
    return { traceId, spanId };
  },
});
