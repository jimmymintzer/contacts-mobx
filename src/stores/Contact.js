import { observable, computed } from 'mobx';

export default class Contact {
  @observable firstName;
  @observable lastName;

  @computed fullName = () => {
    return `${this.firstname}   ${this.lastName}`;
  }
}
