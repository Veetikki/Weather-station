import React, { Component} from 'react';
import {Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, Grid} from '@material-ui/core';
import LiveWeather from './components/LiveWeather';
import WeatherList from './components/WeatherList';
import Clock from './components/Clock';
import { withStyles } from '@material-ui/core/styles';

const style = {
  root:{
  },
  bar: {
    background: "#82E0AA"
  },
  body:{
    background: "#CFD8DC",
  }
}

class App extends Component {
  constructor()
  {
    super();

    this.state ={
      liveWeather: [],
      weatherList: [],
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.body}>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
            </Toolbar>
          </AppBar>
          <Grid justify="center" container>
            <Grid item>
              <LiveWeather/>  
            </Grid>
            <Grid>
              <Clock size={400}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(App);
