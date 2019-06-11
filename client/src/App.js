import React, { Component } from 'react';
import {Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar} from '@material-ui/core';
import './App.css';

const LIVEWEATHER = "/api/liveWeather";
const WEATHER = "/api/weather";

class App extends Component {
  constructor()
  {
    super();

    this.state ={
      liveWeather: [],
    }
  }

  componentDidMount()
  {
    fetch('/api/liveWeather')
      .then(res => res.json())
      .then(liveWeather => this.setState({ liveWeather: liveWeather }, () => console.log(liveWeather)));
  }

  render() {
    return (
      <Paper>
        <AppBar position="static">
          <Toolbar>
          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            Live weather
          </TableHead>
          <TableBody>
            <TableRow>
                <TableCell>
                  {this.state.liveWeather.DATE}
                </TableCell>
                <TableCell>
                  {this.state.liveWeather.CLOCK}
                </TableCell>
                <TableCell>
                  {this.state.liveWeather.TEMP}
                </TableCell>
                <TableCell>
                  {this.state.liveWeather.PRESS}
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default App;
