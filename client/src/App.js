import React, { Component} from 'react';
import {Paper, AppBar, Toolbar, Grid, Switch} from '@material-ui/core';
import LiveWeather from './components/LiveWeather';
import Clock from './components/Clock';
import Diary from './components/Diary';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from './App_bundle.js';

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
      language: "en",
    }
  }

  handleLanguageChange = (event) =>
  {
    if(event.target.value !== "fi")
    {
      this.setState({
        language: "fi",
      });
    }
    else
    {
      this.setState({
        language: "en",
      });
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.body}>
          <AppBar className={classes.bar} position="static">
            <Toolbar >
              en <Switch checked={this.state.language !== "en"} onChange={(e) => this.handleLanguageChange(e)} value={this.state.language}></Switch> fi
            </Toolbar>
          </AppBar>
          <Grid justify="center" container>
            <Grid item>
              <LiveWeather language={this.state.language}/>  
            </Grid>
            <Grid>
              <Clock size={300} backgroundColor={"#82E0AA"}/>
            </Grid>
            <Grid>
              <Diary language={this.state.language} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(App);
