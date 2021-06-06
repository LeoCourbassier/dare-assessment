# 4. Middlewares

Date: 2021-06-06

## Status

Accepted

## Context

Since every request will have an authentication token (and each token will have a user role), we need a unique code to check permissions.

## Decision

We'll be using two middleware to accomplish this.
One for the bearer token and another for the user role.

## Consequences

This change will save us from writing a permission checker code for each endpoint and make the system more flexible.