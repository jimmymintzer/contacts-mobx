// @flow
import { observable, computed } from 'mobx';
import { v1 } from 'node-uuid';
import PhoneNumber from 'awesome-phonenumber';

export default class Contact {
  id: string;
  @observable firstName: string;
  @observable lastName: string;
  @observable phoneType: string;
  @observable phoneNumber: string;

  constructor(firstName: string, lastName: string, phoneType: string, phoneNumber: string) {
    const pn = new PhoneNumber(phoneNumber, 'US');

    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneType = phoneType;
    this.phoneNumber = pn.getNumber('international');
    this.id = v1();
  }

  @computed get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

}
