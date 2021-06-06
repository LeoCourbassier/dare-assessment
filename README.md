# Dare Assessment
[![Node.js CI](https://github.com/LeoCourbassier/dare-assessment/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/LeoCourbassier/dare-assessment/actions/workflows/node.js.yml)
![NPM-v6.3.0](https://img.shields.io/badge/npm-v6.3.0-blue)
![NodeLTS](https://img.shields.io/badge/node--lts%40latest-%3E%3D%2014.17.0-brightgreen)
![eslint](https://img.shields.io/badge/eslint--config--airbnb--base-%5E14.2.1-blue)


![coverage](./coverage/badge-lines.svg)
![coverage2](./coverage/badge-branches.svg)
![coverage3](./coverage/badge-functions.svg)
![coverage](./coverage/badge-statements.svg)

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

### Running locally
<details>
  <summary>With Docker</summary>
  
</details>

<details>
  <summary>Without Docker</summary>
  
</details>

---

## Tests
To run tests, you can:
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

---
## <a name="decisions" style="text-decoration: inherit;color: inherit; cursor: auto;">Architecture Decision</a>
To see why some decisions were made, refer to [this folder](./doc/architecture/decisions/).

The used tool to create adr was this [one](https://github.com/npryce/adr-tools).
