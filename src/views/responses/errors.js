const BadRequestView = (msg) => ({
  code: 400,
  message: msg,
});

const UnauthorizedView = (msg = 'You don\'t have enough permissions') => ({
  code: 401,
  message: msg,
});

const NotFoundView = (msg = 'Username not found') => ({
  code: 404,
  message: msg,
});

export { BadRequestView, UnauthorizedView, NotFoundView };
