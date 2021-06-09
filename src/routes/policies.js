import PolicyController from '../controllers/policy/policy';

const policiesRoutes = async (fastify, _options) => {
  fastify.get('/',
    {
      querystring: {
        limit: { type: 'integer' },
        page: { type: 'integer' },
      },
      preHandler: [fastify.dareMiddleware, fastify.auth([fastify.authMiddleware])],
    }, (request, response) => {
      PolicyController.get(request, response);
    });

  fastify.get('/:id', { preHandler: [fastify.dareMiddleware, fastify.auth([fastify.authMiddleware])] }, (request, response) => {
    PolicyController.getById(request, response);
  });
};

export default policiesRoutes;
