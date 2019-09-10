import React, { Component} from 'react';
import {Grid, CssBaseline} from '@material-ui/core';
import WeatherList from './WeatherList';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import THEME from '../App_theme';
import FONT from '../App_font';


class Table extends Component {
  constructor()
  {
    super();

    this.state ={
      language: localStorage.getItem('uiLanguage')
    }
  }

  render() {
    let theme = createMuiTheme({palette: (THEME[localStorage.getItem('uiTheme')]).palette, typography: (FONT[localStorage.getItem('uiFont')]).typography});

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div >
            <Grid justify="center" container>
              <Grid item>
                <WeatherList theme={theme} language={this.state.language}/>  
              </Grid>
            </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles({withTheme: true})(Table);
