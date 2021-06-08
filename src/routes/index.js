import loginRoutes from './login';
import policiesRoutes from './policies';
import clientsRoutes from './clients';
import healthCheckRoutes from './healthCheck';

export default function setupRoutes(fastify, _opts, next) {
  fastify.register(loginRoutes);
  fastify.register(policiesRoutes, { prefix: '/policies' });
  fastify.register(clientsRoutes, { prefix: '/clients' });
  fastify.register(healthCheckRoutes, { prefix: '/health-check' });

  next();
}
