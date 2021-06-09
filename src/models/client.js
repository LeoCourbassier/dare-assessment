export default class Client {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.role = obj.role;
  }

  compare(anotherClient) {
    if (this.id < anotherClient.id) {
      return 1;
    }
    if (this.id === anotherClient.id) {
      return 0;
    }

    return -1;
  }
}
