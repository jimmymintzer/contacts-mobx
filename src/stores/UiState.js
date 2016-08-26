// @flow
import { observable, computed, action } from 'mobx';
import { getMuiTheme } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default class UiState {
  @observable theme: Object = lightBaseTheme;
  @observable drawerOpen: boolean = false;
  @observable firstName: string = '';
  @observable lastName: string = '';
  @observable phoneType: string = 'Mobile';
  @observable phoneNumber: string = '';
  @observable dialogOpen: boolean = false;
  dialogId: string = '';

  @computed get themeObject(): Object {
    return getMuiTheme(this.theme);
  }

  @computed get isDarkMode(): boolean {
    return this.theme === darkBaseTheme;
  }

  @computed get phoneNumberErrorMessage(): string {
    if (this.phoneNumber.length === 0) {
      return '';
    }
    if (/[a-z]/.test(this.phoneNumber.toLowerCase())) {
      return 'Not a valid phone number.';
    }
    return '';
  }

  @action toggleTheme() {
    this.theme = (this.theme === darkBaseTheme) ?
      lightBaseTheme :
      darkBaseTheme;
  }

  @action toggleDrawerOpen() {
    this.drawerOpen = !this.drawerOpen;
  }

  @action closeDrawer() {
    this.drawerOpen = false;
  }

  @action setPhoneType(val: string): void {
    this.phoneType = val;
  }

  @action setPhoneNumber(val: string): void {
    this.phoneNumber = val;
  }

  @action setFirstname(val: string): void {
    this.firstName = val;
  }

  @action setLastName(val: string): void {
    this.lastName = val;
  }

  @action resetAllFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.phoneType = 'Mobile';
    this.phoneNumber = '';
  }

  @action openDialog(id: string): void {
    this.dialogId = id;
    this.dialogOpen = true;
  }

  @action closeDialog(): void {
    this.dialogId = '';
    this.dialogOpen = false;
  }
}
