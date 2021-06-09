import {
  beforeEach, describe, expect, jest, test,
} from '@jest/globals';
import { getClients } from '../../../fixtures/fixtures';
import Dare from '../dare/dare';
import LoginController from './login';

jest.mock('../dare/dare');

describe('login', () => {
  let mockGetInstance = jest.fn();
  const response = jest.fn();
  response.code = jest.fn(() => response);
  response.send = jest.fn();
  response.jwtSign = jest.fn(() => 'token goes here');

  beforeEach(() => {
    Dare.mockClear();
    mockGetInstance.mockClear();
    response.code.mockClear();
    response.send.mockClear();
  });

  test('with invalid username', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 404,
      message: 'Username not found',
    };

    const request = {
      body: {
        username: 'a',
        password: 'a',
      },
    };

    await LoginController.post(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with missing required fields', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 400,
      message: 'Missing required fields',
    };

    const request = {
    };

    await LoginController.post(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with valid username but mismatch with password', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      code: 401,
      message: 'Username and password mismatch',
    };

    const request = {
      body: {
        username: 'inesblankenship@quotezart.com',
        password: 'a',
      },
    };

    await LoginController.post(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });

  test('with valid username and password', async () => {
    mockGetInstance = jest.fn(() => ({
      clients: getClients(),
    }));
    Dare.getInstance = mockGetInstance;

    const res = {
      expires_in: 3600,
      token: 'token goes here',
      type: 'Bearer',
    };

    const request = {
      body: {
        username: 'inesblankenship@quotezart.com',
        password: 'inesblankenship@quotezart.com',
      },
    };

    await LoginController.post(request, response);

    expect(response.send).toHaveBeenCalledWith(res);
  });
});
