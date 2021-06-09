import {
  describe, expect, jest, test,
} from '@jest/globals';
import Dare from '../../src/controllers/dare/dare';

const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRhcmUiLCJpYXQiOjE2MjMxMzE4MDEsImV4cCI6MTYyMzEzMjQwMX0.iuLQfq-chTC49H5GXb3bXWYGyMPpQpZ1hTddF9FQNe4';

describe('dare integration', () => {
  test('happy path', async () => {
    await Dare.getInstance().refresh();

    expect(Dare.getInstance().clients).not.toBeNull();
    expect(Dare.getInstance().policies).not.toBeNull();
  });

  test('expired token', async () => {
    Dare.getInstance().token = EXPIRED_TOKEN;

    const spy = jest.spyOn(Dare.getInstance(), 'refresh');
    const spyLogin = jest.spyOn(Dare.getInstance(), 'login');

    await Dare.getInstance().refresh();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spyLogin).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('use wrong credentials to catch err', async () => {
    Dare.getInstance().CLIENT_ID = 'invalid_client_id';

    await Dare.getInstance().login();

    expect(Dare.getInstance().token).toBeFalsy();
  });
});
