// @flow
import { observable, action } from 'mobx';
import Contact from '../models/Contact';

export default class Contacts {
  @observable contacts = [];

  @action addContact(firstName: string, lastName: string, phoneType: string, phoneNumber: string) {
    this.contacts = [
      ...this.contacts,
      new Contact(firstName, lastName, phoneType, phoneNumber),
    ];
  }

}
