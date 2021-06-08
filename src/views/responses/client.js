const GetClientsPolicyView = (policy) => ({
  id: policy.id,
  amountInsured: policy.amountInsured,
  inceptionDate: policy.inceptionDate,
});

const GetClientsView = (client, policies) => ({
  id: client.id,
  name: client.name,
  email: client.email,
  role: client.role,
  policies: policies.filter((p) => p.clientId === client.id).map((p) => GetClientsPolicyView(p)),
});

export default GetClientsView;
