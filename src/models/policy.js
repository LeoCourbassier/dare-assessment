export default class Policy {
  constructor(obj) {
    this.id = obj.id;
    this.amountInsured = obj.amountInsured;
    this.email = obj.email;
    this.inceptionDate = obj.inceptionDate;
    this.installmentPayment = obj.installmentPayment;
    this.clientId = obj.clientId;
  }

  compare(anotherPolicy) {
    if (this.id < anotherPolicy.id) {
      return 1;
    }
    if (this.id === anotherPolicy.id) {
      return 0;
    }

    return -1;
  }
}
