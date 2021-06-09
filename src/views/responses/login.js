const TokenView = (token, expires) => ({
  token,
  type: 'Bearer',
  expires_in: expires,
});

export default TokenView;
