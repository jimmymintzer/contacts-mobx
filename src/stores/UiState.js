// @flow
import { observable, computed, action } from 'mobx';
import { getMuiTheme } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default class UiState {
  @observable theme: Object = lightBaseTheme;

  @computed get themeObject(): Object {
    return getMuiTheme(this.theme);
  }

  @computed get isDarkMode(): boolean {
    return this.theme === darkBaseTheme;
  }

  @action toggleTheme() {
    this.theme = (this.theme === darkBaseTheme) ?
      lightBaseTheme :
      darkBaseTheme;
  }
}
