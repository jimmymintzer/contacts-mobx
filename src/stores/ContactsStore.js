// @flow
import { observable, action, toJS, runInAction } from 'mobx';
import PouchDB from 'pouchdb';
import Contact from '../models/Contact';

let db = new PouchDB('contacts');

export default class Contacts {
  @observable contacts = [];
  @observable phoneNumberErrorMessage: string = '';
  @observable loading: boolean = false;

  constructor() {
    this.loading = true;
    this.getContacts();
  }

  @action addContact = async (contactObj: Object) => {
    const { firstName, lastName, phoneType, phoneNumber } = contactObj;

    const contact = new Contact({
      firstName,
      lastName,
      phoneType,
      phoneNumber,
    });

    try {
      await db.put(toJS(contact));
      runInAction('update contacts in state', () => {
        this.contacts = [
          ...this.contacts,
          contact,
        ];
      });
    } catch (err) {
      console.log('there was an error saving the contact'); // eslint-disable-line no-console
    }
  }

  @action removeContact = async (id: string) => {
    const index = this.contacts.map(contact => contact.id).indexOf(id);

    try {
      const doc = await db.get(id);
      await db.remove(doc._id, doc._rev); // eslint-disable-line no-underscore-dangle
      runInAction('remove contacts in state', () => {
        if (index > -1) {
          this.contacts = [
            ...this.contacts.slice(0, index),
            ...this.contacts.slice(index + 1),
          ];
        }
      });
    } catch (err) {
      console.log('there was an error removing the contact'); // eslint-disable-line no-console
    }
  }

  @action getContact = async (id: string): Object => {
    try {
      const contact = await db.get(id);
      return toJS(contact);
    } catch (err) {
      console.log('contact not found'); // eslint-disable-line no-console
      return toJS({ errorMsg: err });
    }
  }

  @action updateContact = async (contactObj: Object) => {
    const { contactId, firstName, lastName, phoneType, phoneNumber } = contactObj;

    try {
      const doc = await db.get(contactId);
      Object.assign(doc, {
        firstName,
        lastName,
        phoneType,
        phoneNumber,
      });
      await db.put(doc);
      runInAction('update contact in state', () => {
        const currentContact = this.contacts.find(contact => contact.id === contactId);
        currentContact.firstName = firstName;
        currentContact.lastName = lastName;
        currentContact.phoneType = phoneType;
        currentContact.phoneNumber = phoneNumber;
      });
    } catch (err) {
      console.log('there was an error updating contact'); // eslint-disable-line no-console
    }
  }

  @action getContacts = async () => {
    try {
      const doc = await db.allDocs({ include_docs: true });
      runInAction('set contacts in state from db', () => {
        this.setContacts(doc.rows.map(row => row.doc));
      });
    } catch (err) {
      console.log('there was an error fetching contacts', err); // eslint-disable-line no-console
    } finally {
      runInAction('reset loading sate', () => {
        this.loading = false;
      });
    }
  }

  @action setContacts(contacts: Object): void {
    contacts.forEach(i => {
      const { firstName, lastName, phoneType, phoneNumber, id } = i;

      this.contacts = [
        ...this.contacts,
        new Contact({
          firstName,
          lastName,
          phoneType,
          phoneNumber,
          id,
        }),
      ];
    });
  }

  @action resetContacts = async () => {
    try {
      await db.destroy();
      db = new PouchDB('contacts');
      runInAction('reset contacts array', () => {
        this.contacts = [];
      });
    } catch (err) {
      console.log(err);
    }
  }

}
