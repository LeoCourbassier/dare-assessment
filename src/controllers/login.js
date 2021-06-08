import { BadRequestView, NotFoundView, UnauthorizedView } from '../views/responses/errors';
import TokenView from '../views/responses/login';
import Dare from './dare';

const DEFAULT_TOKEN_TTL = 3600;

export default class LoginController {
  static async post(request, response) {
    if (!request.body || !request.body.username || !request.body.password) {
      return response
        .code(400)
        .send(BadRequestView('Missing required fields'));
    }

    const client = Dare.getInstance().clients.find((c) => c.email === request.body.username);
    if (!client) {
      return response
        .code(404)
        .send(NotFoundView());
    }
    // At this moment, we'd check this information in some kind of db or endpoint
    // We'll be using for this project username == password
    if (request.body.username === request.body.password) {
      const user = {
        user: request.body.username,
        role: client.role,
      };
      const token = await response.jwtSign(user, { expiresIn: `${DEFAULT_TOKEN_TTL}s` });
      return response
        .code(200)
        .send(TokenView(token, DEFAULT_TOKEN_TTL));
    }

    return response
      .code(401)
      .send(UnauthorizedView('Username and password mismatch'));
  }
}
