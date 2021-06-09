import {
  afterAll, beforeAll, describe, expect, test,
} from '@jest/globals';
import request from 'superagent';
import Server from '../../src/app';
import e2eAdminClients from '../../fixtures/e2e-clients.json';
import e2eAdminClientsById from '../../fixtures/e2e-clients-by-id.json';
import e2eAdminPoliciesByClient from '../../fixtures/e2e-policies-by-client.json';
import { getPoliciesByClientId, getPolicyById } from '../../fixtures/fixtures';
import { GetClientsPolicyView } from '../../src/views/responses/client';

describe('e2e tests', () => {
  beforeAll(() => {
    Server.getInstance().listen();
  });
  afterAll(async () => {
    await Server.getInstance().stop();
  });
  const appEndpoint = 'localhost:3000/api/v1';

  describe('admin routes', () => {
    const user = {
      id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
      name: 'Britney',
      email: 'britneyblankenship@quotezart.com',
      role: 'admin',
      policies: getPoliciesByClientId('a0ece5db-cd14-4f21-812f-966633e7be86').map((p) => GetClientsPolicyView(p)),
    };

    let token;
    let authorizationHeader;

    test('/login', async () => {
      token = await request.post(`${appEndpoint}/login`)
        .send({
          username: user.email,
          password: user.email,
        })
        .then((res) => res.body.token)
        .catch(() => null);
      authorizationHeader = `Bearer ${token}`;

      expect(token).not.toBeNull();
    });

    describe('clients endpoints', () => {
      let client;
      let clientById;

      test('/clients', async () => {
        client = await request.get(`${appEndpoint}/clients`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch(() => null);

        expect(client).not.toBeNull();
        expect(client).toEqual(e2eAdminClients);
      });

      test('/clients/:id', async () => {
        clientById = await request.get(`${appEndpoint}/clients/a0ece5db-cd14-4f21-812f-966633e7be86`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch(() => null);

        expect(clientById).not.toBeNull();
        expect(clientById).toEqual(e2eAdminClientsById);
      });

      test('/clients/:id/policies', async () => {
        const clientsPolicies = await request.get(`${appEndpoint}/clients/a0ece5db-cd14-4f21-812f-966633e7be86/policies`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        expect(clientsPolicies).not.toBeNull();
        expect(clientsPolicies).toEqual(e2eAdminPoliciesByClient);
      });
    });

    describe('policies endpoints', () => {
      let policy;
      let policyById;

      const policies = {
        next_page: 2,
        page: 1,
        pages: 193,
        policies: [{
          amountInsured: '2769.91',
          email: 'inesblankenship@quotezart.com',
          id: 'fd1e7944-56e2-42c9-896f-d9b4e4f4392c',
          inceptionDate: '2015-11-06T12:04:06Z',
          installmentPayment: false,
        }],
      };

      test('/policies', async () => {
        policy = await request.get(`${appEndpoint}/policies?limit=1`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        expect(policy).not.toBeNull();
        expect(policy).toEqual(policies);
      });

      test('/policies/:id', async () => {
        policyById = await request.get(`${appEndpoint}/policies/64cceef9-3a01-49ae-a23b-3761b604800b`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        const policyFixture = getPolicyById('64cceef9-3a01-49ae-a23b-3761b604800b');
        delete policyFixture.clientId;
        expect(policyById).not.toBeNull();
        expect(policyById).toEqual(policyFixture);
      });
    });
  });

  describe('user routes', () => {
    const user = {
      id: 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd',
      name: 'Barnett',
      email: 'barnettblankenship@quotezart.com',
      role: 'user',
      policies: [],
    };

    let token;
    let authorizationHeader;

    test('/login', async () => {
      token = await request.post(`${appEndpoint}/login`)
        .send({
          username: user.email,
          password: user.email,
        })
        .then((res) => res.body.token)
        .catch(() => null);
      authorizationHeader = `Bearer ${token}`;

      expect(token).not.toBeNull();
    });

    describe('clients endpoints', () => {
      let client;
      let clientById;

      const notFound = {
        code: 404,
        message: 'Policy for client with id:anyid not found',
      };

      test('/clients', async () => {
        client = await request.get(`${appEndpoint}/clients`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch(() => null);

        expect(client).not.toBeNull();
        expect(client).toEqual(user);
      });

      test('/clients/:id', async () => {
        clientById = await request.get(`${appEndpoint}/clients/anyid`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch(() => null);

        expect(clientById).not.toBeNull();
        expect(clientById).toEqual(user);
        expect(clientById).toEqual(client);
      });

      // There's no policy for an user.
      test('/clients/:id/policies', async () => {
        const clientsPolicies = await request.get(`${appEndpoint}/clients/anyid/policies`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        expect(clientsPolicies).not.toBeNull();
        expect(clientsPolicies).toEqual(notFound);
      });
    });

    describe('policies endpoints', () => {
      let policy;
      let policyById;
      const notFoundPolicyById = {
        code: 404,
        message: 'Policy with id:anyid not found',
      };
      const notFoundPolicy = {
        code: 404,
        message: 'Policy not found',
      };

      test('/policies', async () => {
        policy = await request.get(`${appEndpoint}/policies`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        expect(policy).not.toBeNull();
        expect(policy).toEqual(notFoundPolicy);
      });

      test('/policies/:id', async () => {
        policyById = await request.get(`${appEndpoint}/policies/anyid`)
          .set('Authorization', authorizationHeader)
          .then((res) => res.body)
          .catch((err) => JSON.parse(err.response.text));

        expect(policyById).not.toBeNull();
        expect(policyById).toEqual(notFoundPolicyById);
      });
    });
  });
});
