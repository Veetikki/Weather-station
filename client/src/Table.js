import React, { Component} from 'react';
import {Paper, Grid,} from '@material-ui/core';
import WeatherList from './components/WeatherList';
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

class Table extends Component {
  constructor()
  {
    super();

    this.state ={
      language: localStorage.getItem('uiLanguage')
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
              <WeatherList/>  
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Table);
