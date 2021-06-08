import ClientController from '../controllers/client';

const clientsRoutes = async (fastify, _options) => {
  fastify.get('/',
    {
      querystring: {
        limit: { type: 'integer' },
        name: { type: 'string' },
        page: { type: 'integer' },
      },
      preHandler: [fastify.dareMiddleware, fastify.auth([fastify.authMiddleware])],
    }, (request, response) => {
      ClientController.getByName(request, response);
    });

  fastify.get('/:id', { preHandler: [fastify.dareMiddleware, fastify.auth([fastify.authMiddleware])] }, (request, response) => {
    ClientController.getById(request, response);
  });

  fastify.get('/:id/policies', { preHandler: [fastify.dareMiddleware, fastify.auth([fastify.authMiddleware])] }, (request, response) => {
    ClientController.getPolicyByClientId(request, response);
  });
};

export default clientsRoutes;
