import {observable} from 'mobx';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export default class UiState {
  @observable theme;
  @observable drawerOpen: boolean;

  constructor(theme, drawerOpen) {
    this.theme = theme;
    this.drawerOpen = drawerOpen || false;
  }

  toggleTheme = () => {
    if (this.theme === darkBaseTheme) {
      this.theme = lightBaseTheme;
    } else {
      this.theme = darkBaseTheme;
    }
    return this.theme;
  }

  isDarkMode = () => {
    return this.theme === darkBaseTheme;
  }

  toggleDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen;
    return this.drawerOpen;
  }

  closeDrawer = () => {
    this.drawerOpen = false;
    return this.drawerOpen;
  }
}
