import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyAuth from 'fastify-auth';
import authenticationMiddleware from './middlewares/authentication';
import dareMiddleware from './middlewares/dare';
import setupRoutes from './routes/index';

export default class Server {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Server();

      // Get port to run the server, fallbacks to 3000
      this.instance.PORT = process.env.PORT || 3000;

      // Get jwt secret from env var, fallbacks to 's3cr3t'
      this.instance.JWT_SECRET = process.env.JWT_SECRET || 's3cr3t';

      // Instantiate fastify
      this.instance.fastifyInstance = fastify({ logger: true });

      // Register JWT utils
      this.instance.fastifyInstance.register(fastifyJWT, {
        secret: this.instance.JWT_SECRET,
      });

      // Register Auth package
      this.instance.fastifyInstance.register(fastifyAuth);

      // Register middlewares
      this.instance.fastifyInstance.decorate('authMiddleware', authenticationMiddleware);
      this.instance.fastifyInstance.decorate('dareMiddleware', dareMiddleware);

      // Register our routes
      this.instance.fastifyInstance.register(setupRoutes, { prefix: '/api/v1' });
    }

    return this.instance;
  }

  listen() {
    this.fastifyInstance.listen(this.PORT, '0.0.0.0')
      .catch((err) => {
        this.fastifyInstance.log.error(`starting server: ${err}`);
        process.exit(1);
      });
  }

  async stop() {
    await this.fastifyInstance.close();
  }
}
