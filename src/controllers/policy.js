import { ADMIN_ROLE } from '../models/role';
import Dare from './dare';
import Paginate from '../pagination';
import { NotFoundView, UnauthorizedView } from '../views/responses/errors';
import GetPoliciesView from '../views/responses/policy';

export default class PolicyController {
  static get(request, response) {
    if (request.user.role !== ADMIN_ROLE) {
      return this.getById(request, response);
    }

    let limit = 10;
    let page = 1;
    if (request.query) {
      if (request.query.limit) limit = request.query.limit;
      if (request.query.page) page = request.query.page;
    }

    let { policies } = Dare.getInstance();
    const pagination = Paginate(
      Math.floor(+policies.length / Math.min(policies.length, limit)), page,
    );

    if (limit) {
      const pageItems = (+pagination.page - 1) * +limit;
      policies = policies.slice(pageItems, +pageItems + +limit);
    }

    if (!policies) {
      return response
        .code(200)
        .send(policies);
    }

    policies = policies.map((p) => GetPoliciesView(p));

    return response
      .code(200)
      .send({ policies, ...pagination });
  }

  static getById(request, response) {
    const id = request.params && request.params.id;
    let policy;

    if (request.user.role !== ADMIN_ROLE) {
      const client = Dare.getInstance().clients.find((c) => c.email === request.user.user);
      if (!client) {
        return response
          .code(401)
          .send(UnauthorizedView());
      }

      policy = Dare.getInstance().policies.find((p) => p.clientId === client.id);
    } else {
      policy = Dare.getInstance().policies.find((p) => p.id === id);
    }

    if (!policy) {
      return response
        .code(404)
        .send(NotFoundView(id ? `Policy with id:${id} not found` : 'Policy not found'));
    }

    const res = GetPoliciesView(policy);

    return response
      .code(200)
      .send(res);
  }
}
