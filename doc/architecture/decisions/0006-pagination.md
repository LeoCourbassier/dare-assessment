# 6. Pagination

Date: 2021-06-08

## Status

Accepted

## Context

Some endpoints have `limit` and ask for pagination.

## Decision

We're going to implement pagination that returns, along with the response body, the following attributes:
```json
  page: x,
  pages: y,
  next_page: x + 1 | null
```

## Consequences

These endpoints that have pagination will have the response body a little different. 
They will have an array with the typical response and the pagination fields.