
import fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({
  logger: true
});

const start = async () => {
  try {
    // Register CORS
    await server.register(cors, {
      origin: true
    });

    // Register static file serving
    await server.register(import('@fastify/static'), {
      root: path.join(__dirname, 'dist'),
      prefix: '/',
      decorateReply: false
    });

    // API routes
    server.post('/api/urls', async (request, reply) => {
      try {
        const { url } = request.body;
        if (!url) {
          return reply.code(400).send({ error: 'URL is required' });
        }
        const shortUrl = Math.random().toString(36).substring(2, 8);
        return { shortUrl, longUrl: url };
      } catch (error) {
        console.error('Error processing URL:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    });

    // Start server
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running at http://0.0.0.0:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
