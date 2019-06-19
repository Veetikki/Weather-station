import React, { Component } from 'react';
import {Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar} from '@material-ui/core';
import LiveWeather from './components/LiveWeather';
import WeatherList from './components/WeatherList';
import './App.css';

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
    return (
      <Paper>
        <AppBar position="static">
          <Toolbar>
          </Toolbar>
        </AppBar>
        <LiveWeather/>
        <WeatherList/>
      </Paper>
    );
  }
}

export default App;
