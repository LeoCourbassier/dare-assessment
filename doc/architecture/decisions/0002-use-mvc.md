# 2. Use MVC

Date: 2021-06-05

## Status

Accepted

## Context

To make the best out of the system, to make it flexible, easier to maintain, and a lot more.
It's good to use some kind of pattern.
We'll be considering some well-known patterns and which one would be the best suit for our application.

## Decision

We'll use MVC for our architecture.

## Details

### Assumptions

Our application is a wrapper for another API. We want the application to be as fast as possible, resilient, and flexible.

### Positions

We considered these architectures patterns:
* MVC
* Hexagonal

### Argument

Summary by pattern:
* MVC: well-known pattern; flexible; simple; easy to code.
* Hexagonal: well-known pattern; somewhat simple; easy to code; but the project would get too big. Also, we would have no use for some layers, and for that, we would be using just a small part of this pattern.

Analyzing these two patterns, for this project, we wouldn't need a more robust architecture. Just a well-known MVC will be enough.

## Consequences

If this project somewhere in the future needs some kind of database or any async processing, this architecture will become complex.