import fastify from 'fastify';
import request from 'superagent';
import CacheModule from 'cache-service-cache-module';
import superagentCachePlugin from 'superagent-cache-plugin';
import LoginRequestView from '../views/requests/dare';
import Client from '../models/client';
import Policy from '../models/policy';

const cache = new CacheModule({ storage: 'local' });
const superagentCache = superagentCachePlugin(cache);
const dareEndpoint = 'dare-nodejs-assessment.herokuapp.com/api';
const Fastify = fastify({ logger: true });

const convert = (res, Obj) => {
  if (res.statusCode === 401 && res.body.message === 'Authorization token expired') {
    return false;
  }

  const unsortedArr = res.body.map((o) => new Obj(o));
  return unsortedArr.sort((a, b) => a.compare(b));
};

export default class Dare {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Dare();
      // Get client id to use on Insurance API
      this.instance.CLIENT_ID = process.env.CLIENT_ID || 'dare';

      // Get client secret to also use on Insurance API
      this.instance.CLIENT_SECRET = process.env.CLIENT_SECRET || 's3cr3t';

      this.instance.clients = [];

      this.instance.policies = [];
    }

    return this.instance;
  }

  get bearerToken() {
    return `Bearer ${this.token}`;
  }

  async refresh() {
    if (!this.token) {
      await this.login();
    }

    await Promise.all([this.refreshClients(), this.refreshPolicies()]);
    if (!this.clients || !this.policies) {
      Fastify.log.warn('Token expired, getting new token');
      await this.login();
      await this.refresh();
    }
    return true;
  }

  async refreshClients() {
    this.clients = await request.get(`${dareEndpoint}/clients`)
      .set('Authorization', this.bearerToken)
      .use(superagentCache)
      .then((res) => convert(res, Client))
      .catch((err) => {
        Fastify.log.error(`An error occurred when trying to get clients: ${err}`);
      });
  }

  async refreshPolicies() {
    this.policies = await request.get(`${dareEndpoint}/policies`)
      .set('Authorization', this.bearerToken)
      .use(superagentCache)
      .then((res) => convert(res, Policy))
      .catch((err) => {
        Fastify.log.error(`An error occurred when trying to get policies: ${err}`);
      });
  }

  async login() {
    this.token = await request.post(`${dareEndpoint}/login`)
      .send(LoginRequestView(this.CLIENT_ID, this.CLIENT_SECRET))
      .then((res) => res.body && res.body.token)
      .catch((err) => {
        Fastify.log.error(`An error occurred when trying to login: ${err}`);
      });
  }
}
