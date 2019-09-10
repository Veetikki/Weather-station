import React, { Component} from 'react';
import {Grid, CssBaseline, Switch} from '@material-ui/core';
import LiveWeather from './MainComponents/LiveWeather';
import Clock from './MainComponents/Clock';
import DigitalClock from './MainComponents/DigitalClock';
import Diary from './MainComponents/Diary';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import THEME from '../App_theme';
import FONT from '../App_font';


class Main extends Component {
  constructor()
  {
    super();
    var lang = localStorage.getItem('uiLanguage');

    var clock = localStorage.getItem('uiClock');
    
    if(clock === null)
    {
      clock = "digital"
      localStorage.setItem('uiClock', clock)
    }

    this.state ={
      language: lang,
      clock: clock,
    }
  }

  handleClockChange = (event) =>
  {
    if(event.target.value === "digital")
    {
      localStorage.setItem('uiClock', "analog");
      this.setState({
        clock: "analog"
      });
    }
    else
    {
      localStorage.setItem('uiClock', "digital");
      this.setState({
        clock: "digital"
      });
    }
    
  }

  render() {
    
    let theme = createMuiTheme({palette: (THEME[localStorage.getItem('uiTheme')]).palette, typography: (FONT[localStorage.getItem('uiFont')]).typography});
    
    let clock;
    if(localStorage.getItem('uiClock') === "analog")
    {
      clock = <Clock size={300} backgroundColor={(THEME[localStorage.getItem('uiTheme')]).palette.secondary.main}></Clock>;
    }
    else
    {
      clock = <DigitalClock></DigitalClock>;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div >
          <Grid justify="center" container>
            <Grid item>
              <LiveWeather theme={theme} language={this.state.language}/>  
            </Grid>
            <Grid item>
              {clock}
              <div>
                Digital <Switch checked={localStorage.getItem('uiClock') === "analog"} value={this.state.clock} onChange={(e) => this.handleClockChange(e)}></Switch> Analog
              </div>
            </Grid>
            <Grid item>
              <Diary theme={theme} language={this.state.language} />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles({withTheme: true})(Main);
