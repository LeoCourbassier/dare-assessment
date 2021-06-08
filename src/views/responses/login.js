const TokenView = (token, expires = 3600) => ({
  token,
  type: 'Bearer',
  expires_in: expires,
});

export default TokenView;
