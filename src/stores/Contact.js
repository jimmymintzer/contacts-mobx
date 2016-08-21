import { observable } from 'mobx';

export default class Contact {
  @observable firstName;
  @observable lastName;
  @observable phoneType;
  @observable phoneNumber;

  constructor(firstName, lastName, phoneType, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneType = phoneType;
    this.phoneNumber = phoneNumber;
  }
}
