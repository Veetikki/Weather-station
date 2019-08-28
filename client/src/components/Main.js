import React, { Component} from 'react';
import {Paper, Grid, } from '@material-ui/core';
import LiveWeather from './MainComponents/LiveWeather';
import Clock from './MainComponents/Clock';
import Diary from './MainComponents/Diary';
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

class Main extends Component {
  constructor()
  {
    super();
    var lang = localStorage.getItem('uiLanguage');

    this.state ={
      language: lang
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
          <Grid justify="center" container>
            <Grid item>
              <LiveWeather language={this.state.language}/>  
            </Grid>
            <Grid item>
              <Clock size={300} backgroundColor={"#82E0AA"}></Clock>
            </Grid>
            <Grid item>
              <Diary language={this.state.language} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Main);
