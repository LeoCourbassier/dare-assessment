import { ADMIN_ROLE } from '../models/role';
import Dare from './dare';
import GetClientsView from '../views/responses/client';
import Paginate from '../pagination';
import { NotFoundView } from '../views/responses/errors';

export default class ClientController {
  static getByName(request, response) {
    if (request.user.role !== ADMIN_ROLE) {
      return this.getById(request, response);
    }

    let limit = 10;
    let name = false;
    let page = 1;
    if (request.query) {
      if (request.query.limit) limit = request.query.limit;
      if (request.query.name) name = request.query.name;
      if (request.query.page) page = request.query.page;
    }

    let { clients } = Dare.getInstance();
    const { policies } = Dare.getInstance();
    const pagination = Paginate(
      Math.floor(+clients.length / Math.min(clients.length, limit)), page,
    );

    if (name) {
      clients = clients.filter((c) => c.name === name);
    }

    if (limit) {
      const pageItems = (+pagination.page - 1) * +limit;
      clients = clients.slice(pageItems, +pageItems + +limit);
    }

    if (!clients) {
      return response
        .code(200)
        .send(clients);
    }

    const res = clients.map((c) => GetClientsView(c, policies));

    return response
      .code(200)
      .send({ clients: res, ...pagination });
  }

  static getById(request, response) {
    const id = request.params && request.params.id;
    let client;

    if (request.user.role !== ADMIN_ROLE) {
      client = Dare.getInstance().clients.find((c) => c.email === request.user.user);
    } else {
      client = Dare.getInstance().clients.find((c) => c.id === id);
    }

    if (!client) {
      return response
        .code(404)
        .send(NotFoundView(`Client with id:${id} not found`));
    }

    const { policies } = Dare.getInstance();

    const res = GetClientsView(client, policies);

    return response
      .code(200)
      .send(res);
  }

  static getPolicyByClientId(request, response) {
    const id = request.params && request.params.id;
    let policy;

    if (request.user.role !== ADMIN_ROLE) {
      const client = Dare.getInstance().clients.find((c) => c.email === request.user.user);
      if (!client) {
        return response
          .code(404)
          .send(NotFoundView(`Client with id:${id} not found`));
      }

      policy = Dare.getInstance().policies.find((p) => p.clientId === client.id);
    } else {
      policy = Dare.getInstance().policies.find((p) => p.clientId === id);
    }

    if (!policy) {
      return response
        .code(404)
        .send(NotFoundView(`Policy for client with id:${id} not found`));
    }

    return response
      .code(200)
      .send([policy]);
  }
}
