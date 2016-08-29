// @flow
import { observable, action, toJS } from 'mobx';
import Contact from '../models/Contact';

export default class Contacts {
  @observable contacts = [];
  @observable phoneNumberErrorMessage = '';

  @action addContact(firstName: string, lastName: string, phoneType: string, phoneNumber: string) {
    this.contacts = [
      ...this.contacts,
      new Contact(firstName, lastName, phoneType, phoneNumber),
    ];
  }

  @action removeContact(id: string) {
    const index = this.contacts.map(contact => contact.id).indexOf(id);
    if (index > -1) {
      this.contacts = [
        ...this.contacts.slice(0, index),
        ...this.contacts.slice(index + 1),
      ];
    }
  }

  @action getContact(id: string) {
    return toJS(this.contacts.find((contact) => contact.id === id));
  }

  @action updateContact(id: string, firstName: string, lastName: string, phoneType: string, phoneNumber: string) { //eslint-disable-line
    const currentContact = this.contacts.find(contact => contact.id === id);
    currentContact.firstName = firstName;
    currentContact.lastName = lastName;
    currentContact.phoneType = phoneType;
    currentContact.phoneNumber = phoneNumber;
  }

}
