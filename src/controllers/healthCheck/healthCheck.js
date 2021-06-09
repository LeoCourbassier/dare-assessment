import HealthCheckView from '../../views/responses/healthCheck';

export default class HealthCheckController {
  static get(_request, response) {
    response
      .code(200)
      .send(HealthCheckView());
  }
}
