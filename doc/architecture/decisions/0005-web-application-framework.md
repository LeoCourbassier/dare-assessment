# 5. Web application framework

Date: 2021-06-06

## Status

Accepted

## Context

To serve the webserver it's nice to have a framework. It will do a lot of abstraction that will help to save a lot of code.

## Decision

We'll use Fastify because we want this project to have the best performance possible.

## Details

### Assumptions

Our application is a wrapper for another API. We want the application to be as fast as possible, resilient, and flexible.

### Positions

We considered these frameworks:
* Express
* Fastify

### Argument

Summary by pattern:
* Express: so popular, used in a lot of projects independently of its size. Well consolidated in the Node community.
* Fastify: faster performance[<sup>1</sup>](https://www.fastify.io/benchmarks/), cleaner syntax.

Both choices would be great, but for this project, Fastify seems to be the right choice.

## Consequences

The project will be dependent on Fastify knowledge and performance.