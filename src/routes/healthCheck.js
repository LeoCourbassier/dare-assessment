import HealthCheckController from '../controllers/healthCheck/healthCheck';

const healthCheckRoutes = async (fastify, _options) => {
  fastify.get('/', (request, response) => {
    HealthCheckController.get(request, response);
  });
};

export default healthCheckRoutes;
