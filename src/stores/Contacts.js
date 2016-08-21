import { observable, action } from 'mobx';
import Contact from './Contact';

export default class Contacts {
  @observable contacts = [];

  @action addContact(firstName: string, lastName: string, phoneType: number, phoneNumber: string) {
    const contact = new Contact({
      firstName,
      lastName,
      phoneType,
      phoneNumber,
    });

    this.contacts = [...this.contacts, contact];
  }

}
