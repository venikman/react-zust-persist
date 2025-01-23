
import fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({
  logger: true
});

// Register CORS
await app.register(cors, {
  origin: true
});

// Register JSON parser
app.addContentTypeParser('application/json', { parseAs: 'string' }, async function (req, body) {
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error('Invalid JSON');
  }
});

// Serve static files
await app.register(import('@fastify/static'), {
  root: path.join(__dirname, 'dist'),
  prefix: '/'
});

// URL shortener routes
app.post('/api/urls', async (request, reply) => {
  try {
    const { url } = request.body;
    if (!url) {
      reply.code(400).send({ error: 'URL is required' });
      return;
    }
    const shortUrl = Math.random().toString(36).substring(2, 8);
    return { shortUrl, longUrl: url };
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', async () => {
  return { status: 'ok' };
});

// Start server
try {
  await app.listen({ port: 3000, host: '0.0.0.0' });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
