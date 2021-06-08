import ROLES from '../models/role';
import { BadRequestView, UnauthorizedView } from '../views/responses/errors';

const authenticationMiddleware = async (request, response, done) => {
  if (!request.raw.headers.authorization) {
    response
      .code(400)
      .send(BadRequestView('Missing required token'));
  }

  try {
    await request.jwtVerify();
    if (!ROLES.includes(request.user.role)) {
      response
        .code(401)
        .send(UnauthorizedView());
    }
  } catch (err) {
    response
      .code(401)
      .send(UnauthorizedView('Token is not valid'));
  }

  done();
};

export default authenticationMiddleware;
