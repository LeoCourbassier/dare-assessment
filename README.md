# Dare Assessment
[![Node.js CI](https://github.com/LeoCourbassier/dare-assessment/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/LeoCourbassier/dare-assessment/actions/workflows/node.js.yml)
![NPM-v6.3.0](https://img.shields.io/badge/npm-v6.3.0-blue)
![NodeLTS](https://img.shields.io/badge/node--lts%40latest-%3E%3D%2014.17.0-brightgreen)
![eslint](https://img.shields.io/badge/eslint--config--airbnb--base-%5E14.2.1-blue)


![coverage-lines](./coverage/badge-lines.svg)
![coverage-branches](./coverage/badge-branches.svg)
![coverage-functions](./coverage/badge-functions.svg)
![coverage-statements](./coverage/badge-statements.svg)

This project has the objective of showing how it'd be like working with me and my skills.

You can see the document describing the challenge [here](./doc/challenge/assessment.md). 

Please refer to [Architecture Decision](#decisions) section to understand the project architecture and more.

This project is a wrapper to Insurance API, done in NodeJS and Javascript ES6.

## Installation
This project uses the latest Node LTS and uses NVM for version manager.
If you'd like, install [nvm](https://github.com/nvm-sh/nvm).
After the installation, use nvm to install Node and use the correct version.

```bash
nvm install
nvm use
```

Then, you should install all dependencies
```bash
npm install
```

---
## Usage
### Postman collection
Please refer to this [folder](./doc/api/postman).

You can import the workspace into your Postman.
There you will have two environments, one it's called `Dev` which to use you must have the server up and running in your machine.

The other one is the `Prod` environment, which is up to date with the main branch and it's hosted on Heroku.

---

### Running locally
<details>
  <summary>With Docker</summary>
  
  First, build the image:
  ```bash
  docker build . -t dare
  ```

  Then run it.
  ```bash
  docker run -p 3000:3000 dare
  ```

  If you want, you can change the listen port using the environment var `PORT`.
</details>

<details>
  <summary>Without Docker</summary>
  
  You can use only:
  ```bash
  npm start
  ```
</details>

---

### Environment variables
There are a few customizable variables.

* `JWT_SECRET`: the secret that will be used to generate JWT
* `PORT`: the port that the application will run
* `CLIENT_ID`: the client_id that will be used to the Insurance API
* `CLIENT_SECRET`: the client_secret that will be used to the Insurance API

---

## Tests

To run tests, you can:

<details>
  <summary>Without Docker</summary>
  
  Run all tests with:
  ```bash
  npm test
  ```

  Run unit tests:
  ```bash
  npm run test:unit
  ```

  Run integration tests:
  ```bash
  npm run test:integration
  ```

  Run end-to-end tests:
  ```bash
  npm run test:e2e
  ```

  Run test coverage:
  ```bash
  npm run test:coverage
  ```
</details>

<details>
  <summary>With Docker</summary>
  There's only the option to run all the tests with coverage.

  ```bash
  docker build . -f Dockerfile.test -t dare-test
  ```

  ```bash
  docker run dare-test
  ```

</details>


---
## Deploy
Every push to main makes a new deployment on Heroku.
The link to the endpoint is: https://dare-assessment.herokuapp.com

---
## <a name="decisions" style="text-decoration: inherit;color: inherit; cursor: auto;">Architecture Decision</a>
To see why some decisions were made, refer to [this folder](./doc/architecture/decisions/).

The used tool to create adr was this [one](https://github.com/npryce/adr-tools).
