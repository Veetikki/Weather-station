import React, { Component} from 'react';
import {Paper, AppBar, Toolbar, Grid, Switch, Button} from '@material-ui/core';
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

class Statics extends Component {
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
          <AppBar className={classes.bar} position="static">
            <Toolbar >
                <div>
                    en <Switch checked={this.state.language !== "en"} onChange={(e) => this.handleLanguageChange(e)} value={this.state.language}></Switch> fi
                </div>
                <div style={{padding: "0px 10px"}}>
                    <Button href="http://localhost:3000" variant="contained"> Main </Button>
                </div>
                <div style={{padding: "0px 10px"}}>
                    <Button href="http://localhost:3000/table" variant="contained"> Table </Button>
                </div>
            </Toolbar>
          </AppBar>
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

export default withStyles(style)(Statics);
