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
      liveWeather: null,
    }
  }

  componentDidMount()
  {
    fetch('/api/liveWeather')
      .then(res => res.json())
      .then(liveWeather => this.setState({ liveWeather }, () => console.log(liveWeather)));
  }

  render() {
    return (
      <Paper>
        <AppBar>
          <Toolbar>

          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default App;
