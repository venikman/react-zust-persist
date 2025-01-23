import fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = fastify({
  logger: true,
  trustProxy: true,
  disableRequestLogging: true
});

// Graceful shutdown
const signals = ['SIGTERM', 'SIGINT'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

await fastify.register(cors, {
  origin: true
});

// Serve static files from the dist directory
await fastify.register(import('@fastify/static'), {
  root: path.join(__dirname, 'dist'),
  prefix: '/'
});

// Health check endpoint
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// Example route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify!' }
});

// URL shortener routes
fastify.post('/api/urls', async (request, reply) => {
  const { url } = request.body;
  const shortUrl = Math.random().toString(36).substring(2, 8);
  // Here you would typically save to a database
  return { shortUrl, longUrl: url }
});

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}