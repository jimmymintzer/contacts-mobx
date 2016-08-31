// @flow
import { observable, computed, action } from 'mobx';
import { getMuiTheme } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {
  red500,
  pink500,
  purple500,
  deepPurple500,
  indigo500,
  blue500,
  lightBlue500,
  cyan500,
  teal500,
  green500,
  lightGreen500,
  lime500,
  yellow500,
  amber500,
  orange500,
  deepOrange500,
  brown500,
  blueGrey500,
  grey500,
} from 'material-ui/styles/colors';

const colors = [
  red500,
  indigo500,
  teal500,
  deepPurple500,
  yellow500,
  brown500,
  pink500,
  lime500,
  blue500,
  green500,
  amber500,
  blueGrey500,
  purple500,
  lightBlue500,
  cyan500,
  lightGreen500,
  orange500,
  deepOrange500,
  grey500,
];

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

  @action getColor(index: number): string {
    return colors[index % 19];
  }
}
