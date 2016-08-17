import { extendObservable, computed, action } from 'mobx';
import { getMuiTheme } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export default class UiState {
  // @observable theme;
  // @observable drawerOpen: boolean;

  constructor(theme, drawerOpen) {
    extendObservable(this, {
      theme: lightBaseTheme,
      drawerOpen: false,
    });
  }

  @computed get themeObject() {
    return getMuiTheme(this.theme);
  }

  @computed get isDarkMode() {
    return this.theme === darkBaseTheme;
  }

  @action toggleTheme() {
    this.theme = (this.theme === darkBaseTheme) ?
      lightBaseTheme :
      darkBaseTheme;
    return this.theme;
  }

  @action toggleDrawerOpen() {
    this.drawerOpen = !this.drawerOpen;
  }

  @action closeDrawer() {
    this.drawerOpen = false;
  }
}
