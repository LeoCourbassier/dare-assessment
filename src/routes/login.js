import LoginController from '../controllers/login';

const loginRoutes = async (fastify, _options) => {
  fastify.post('/login', { preHandler: fastify.dareMiddleware }, async (request, response) => {
    await LoginController.post(request, response);
  });
};

export default loginRoutes;
