import {
  beforeEach, describe, expect, jest, test,
} from '@jest/globals';
import { getClients, getPolicies } from '../../../fixtures/fixtures';
import { ADMIN_ROLE, USER_ROLE } from '../../models/role';
import Dare from '../dare/dare';
import PolicyController from './policy';

jest.mock('../dare/dare');

describe('get', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('with admin role', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      next_page: 2,
      page: 1,
      pages: 193,
      policies: [{
        amountInsured: '1825.89',
        email: 'inesblankenship@quotezart.com',
        id: '64cceef9-3a01-49ae-a23b-3761b604800b',
        inceptionDate: '2016-06-01T03:33:32Z',
        installmentPayment: true,
      }],
    };

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
      query: {
        limit: 1,
      },
    };

    PolicyController.get(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with admin role but no policies', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: [],
    }));
    Dare.getInstance = mockGetInstance;

    const res = [];

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
      query: {
        limit: 1,
      },
    };

    PolicyController.get(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with admin role but no query params passed', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: [],
    }));
    Dare.getInstance = mockGetInstance;

    const res = [];

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
    };

    PolicyController.get(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with admin role but with limit negative', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: [],
    }));
    Dare.getInstance = mockGetInstance;

    const res = [];

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
      query: {
        limit: -10,
        page: 1,
      },
    };

    PolicyController.get(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('without the admin role', () => {
    const request = {
      user: {
        role: USER_ROLE,
      },
      query: {
        limit: 1,
      },
    };

    const spy = jest.spyOn(PolicyController, 'getById');

    PolicyController.get(request, response);

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});

describe('getById', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('with admin role', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      id: '64cceef9-3a01-49ae-a23b-3761b604800b',
      amountInsured: '1825.89',
      email: 'inesblankenship@quotezart.com',
      inceptionDate: '2016-06-01T03:33:32Z',
      installmentPayment: true,
    };

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
      params: {
        id: '64cceef9-3a01-49ae-a23b-3761b604800b',
      },
    };

    PolicyController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with admin role but policy not found', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: [],
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Policy with id:64cceef9-3a01-49ae-a23b-3761b604800b not found',
    };

    const request = {
      user: {
        role: ADMIN_ROLE,
      },
      params: {
        id: '64cceef9-3a01-49ae-a23b-3761b604800b',
      },
    };

    PolicyController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with user role but not found', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: [],
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 401,
      message: "You don't have enough permissions",
    };

    const request = {
      user: {
        role: USER_ROLE,
        user: 'some non existent user',
      },
      params: {
        id: '64cceef9-3a01-49ae-a23b-3761b604800b',
      },
    };

    PolicyController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with user role', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      amountInsured: '399.89',
      email: 'inesblankenship@quotezart.com',
      id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
      inceptionDate: '2015-07-06T06:55:49Z',
      installmentPayment: true,
    };

    const request = {
      user: {
        role: USER_ROLE,
        user: 'britneyblankenship@quotezart.com',
      },
      params: {
        id: 'some_id_that_doesnt_matter',
      },
    };

    PolicyController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with user role but without policies', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Policy not found',
    };

    const request = {
      user: {
        role: USER_ROLE,
        user: 'inesblankenship@quotezart.com',
      },
    };

    PolicyController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });
});
