const GetPoliciesView = (policy) => ({
  id: policy.id,
  amountInsured: policy.amountInsured,
  email: policy.email,
  inceptionDate: policy.inceptionDate,
  installmentPayment: policy.installmentPayment,
});

export default GetPoliciesView;
