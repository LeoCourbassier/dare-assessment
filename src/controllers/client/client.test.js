import {
  beforeEach,
  describe, expect, jest, test,
} from '@jest/globals';
import {
  getClients, getPolicies, getPoliciesByClientId, getPolicyByClientId,
} from '../../../fixtures/fixtures';
import { ADMIN_ROLE, USER_ROLE } from '../../models/role';
import Dare from '../dare/dare';
import ClientController from './client';

jest.mock('../dare/dare');

describe('getByName', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();

  const request = {
    user: {
      role: ADMIN_ROLE,
      user: 'someemail',
    },
  };

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('admin happy path with only one client', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(1),
      policies: getPolicyByClientId('a0ece5db-cd14-4f21-812f-966633e7be86'),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      clients: [{
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
        policies: [{
          id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
          amountInsured: '399.89',
          inceptionDate: '2015-07-06T06:55:49Z',
        }],
      }],
      next_page: null,
      page: 1,
      pages: 1,
    };

    ClientController.getByName(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('admin with pagination', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(1),
      policies: getPoliciesByClientId('a0ece5db-cd14-4f21-812f-966633e7be86'),
    }));
    Dare.getInstance = mockGetInstance;

    request.query = {
      page: 2,
    };

    const res = {
      clients: [],
      next_page: null,
      page: 2,
      pages: 1,
    };

    ClientController.getByName(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('admin happy path with pagination', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(2),
      policies: [getPoliciesByClientId('a0ece5db-cd14-4f21-812f-966633e7be86'), getPoliciesByClientId('e8fd159b-57c4-4d36-9bd7-a59ca13057bb')],
    }));
    Dare.getInstance = mockGetInstance;

    request.query = {
      limit: 1,
    };

    const res = {
      clients: [{
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
        policies: [],
      }],
      next_page: 2,
      page: 1,
      pages: 2,
    };

    ClientController.getByName(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('request for an user with "user" role', () => {
    request.user.role = USER_ROLE;
    const spy = jest.spyOn(ClientController, 'getById');

    ClientController.getByName(request, response);

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  test('request with name filtering', () => {
    request.query = {
      name: 'Ines',
    };
    request.user.role = ADMIN_ROLE;

    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      clients: [{
        id: '4a0573eb-56d0-45d5-ab36-bebf33c5eb36',
        name: 'Ines',
        email: 'inesblankenship@quotezart.com',
        role: 'admin',
        policies: [],
      }],
      next_page: null,
      page: 1,
      pages: 1,
    };

    ClientController.getByName(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('request with no clients matched', () => {
    request.query = {
      name: 'Name that will not be found',
    };
    request.user.role = ADMIN_ROLE;

    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(150),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'No clients matched the filter',
    };

    ClientController.getByName(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });
});

describe('getById', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();

  const request = {
    user: {
      role: ADMIN_ROLE,
      user: 'someemail',
    },
  };

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('admin role searching for a specific user', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicyByClientId('a0ece5db-cd14-4f21-812f-966633e7be86'),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
      name: 'Britney',
      email: 'britneyblankenship@quotezart.com',
      role: 'admin',
      policies: [{
        id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
        amountInsured: '399.89',
        inceptionDate: '2015-07-06T06:55:49Z',
      }],
    };

    request.params = {
      id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
    };

    ClientController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('admin role searching for a specific user that doesnt exist', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Client with id:not_a_real_id not found',
    };

    request.params = {
      id: 'not_a_real_id',
    };

    ClientController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('user role searching for a specific user', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      id: '4a0573eb-56d0-45d5-ab36-bebf33c5eb36',
      name: 'Ines',
      email: 'inesblankenship@quotezart.com',
      role: 'admin',
      policies: [],
    };

    request.params = {
      id: 'any_other_id',
    };
    request.user = {
      role: USER_ROLE,
      user: 'inesblankenship@quotezart.com',
    };

    ClientController.getById(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });
});

describe('getPolicyByClientId', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();

  const request = {
    user: {
      role: ADMIN_ROLE,
      user: 'someemail',
    },
  };

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('admin role searching for a specific user that doesnt have a policy', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Policy for client with id:4a0573eb-56d0-45d5-ab36-bebf33c5eb36 not found',
    };

    request.params = {
      id: '4a0573eb-56d0-45d5-ab36-bebf33c5eb36',
    };
    request.user = {
      role: ADMIN_ROLE,
      user: 'inesblankenship@quotezart.com',
    };

    ClientController.getPolicyByClientId(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('admin role searching for a specific user that has a policy', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = getPoliciesByClientId('a0ece5db-cd14-4f21-812f-966633e7be86');

    request.params = {
      id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
    };
    request.user = {
      role: ADMIN_ROLE,
      user: 'inesblankenship@quotezart.com',
    };

    ClientController.getPolicyByClientId(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('user role getting his non existent policies from an id thats not theirs', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Policy for client with id:will_return_ines_policies not found',
    };

    request.params = {
      id: 'will_return_ines_policies',
    };
    request.user = {
      role: USER_ROLE,
      user: 'inesblankenship@quotezart.com',
    };

    ClientController.getPolicyByClientId(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('user role getting his non existent policies from an id thats not theirs', () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
      policies: getPolicies(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Client with id:will_return_ines_policies not found',
    };

    request.params = {
      id: 'will_return_ines_policies',
    };
    request.user = {
      role: USER_ROLE,
      user: 'non_existent_email',
    };

    ClientController.getPolicyByClientId(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });
});
