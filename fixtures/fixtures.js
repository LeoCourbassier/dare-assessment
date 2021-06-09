import Client from '../src/models/client';
import Policy from '../src/models/policy';
import clients from './clients.json';
import policies from './policies.json';

const getClients = (max = -1) => clients.map((c) => new Client(c))
  .slice(0, max >= 0 && max <= clients.length ? max : clients.length);

const getPolicies = (max = -1) => policies.map((c) => new Policy(c))
  .slice(0, max >= 0 && max <= policies.length ? max : policies.length);

const getPolicyByClientId = (id) => [policies.find((p) => p.clientId === id)];

const getPoliciesByClientId = (id) => policies.filter((p) => p.clientId === id);

const getPolicyById = (id) => policies.find((p) => p.id === id);

export {
  getClients, getPolicies, getPolicyById, getPolicyByClientId, getPoliciesByClientId,
};
