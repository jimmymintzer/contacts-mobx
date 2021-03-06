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
  _id: string;

  constructor(contact: Object) {
    const { firstName, lastName, phoneType, phoneNumber, id } = contact;

    this.id = id || v1();
    this._id = this.id; // eslint-disable-line no-underscore-dangle
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneType = phoneType;
    this.phoneNumber = (phoneNumber) ?
      new PhoneNumber(phoneNumber, 'US').getNumber('international') :
      '';
  }

  @computed get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed get firstInitial(): string {
    if (this.firstName.length > 0) {
      return this.firstName[0];
    }
    if (this.lastName.length > 0) {
      return this.lastName[0];
    }
    return '';
  }

}
