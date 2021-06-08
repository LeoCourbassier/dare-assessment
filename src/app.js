import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyAuth from 'fastify-auth';
import authenticationMiddleware from './middlewares/authentication';
import dareMiddleware from './middlewares/dare';
import setupRoutes from './routes/index';

// Get jwt secret from env var, fallbacks to 's3cr3t'
const JWT_SECRET = process.env.JWT_SECRET || 's3cr3t';

// Get port to run the server, fallbacks to 3000
const PORT = process.env.PORT || 3000;

// Instantiate fastify
const Fastify = fastify({ logger: true });

// Register JWT utils
Fastify.register(fastifyJWT, {
  secret: JWT_SECRET,
});

// Register Auth package
Fastify.register(fastifyAuth);

// Register middlewares
Fastify.decorate('authMiddleware', authenticationMiddleware);
Fastify.decorate('dareMiddleware', dareMiddleware);

// Register our routes
Fastify.register(setupRoutes, { prefix: '/api/v1' });

// Init webserver
Fastify.listen(PORT, '0.0.0.0')
  .catch((err) => {
    Fastify.log.error(`starting server: ${err}`);
    process.exit(1);
  });
