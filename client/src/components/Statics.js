import React, { Component} from 'react';
import {Paper, Grid, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VictoryBar, VictoryChart, VictoryLine, VictoryZoomContainer, VictoryAxis } from 'victory';
import BUNDLE from '../App_bundle';

const WEATHER = "/api/weather";

const style = {
  root:{
  },
  bar: {
    background: "#82E0AA"
  },
  body:{
    background: "#CFD8DC",
  },
  chart:{
    border:"solid",
    background: "white"
  }
}

class Statics extends Component {
  constructor()
  {
    super();

    this.state ={
      language: localStorage.getItem('uiLanguage'),
      weatherData: [],
    }
  }

  componentDidMount()
    {
        fetch(WEATHER)
        .then(res => res.json())
        .then(weatherData => this.setState({ weatherData: weatherData }, () => console.log(weatherData)))
        .catch((err) => {
            console.log(err)
        });
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

    let bundle = BUNDLE.default;
    if (this.state.language in BUNDLE) {
        bundle = BUNDLE[this.state.language];
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.body}>
          <Grid justify="center" container>
            <Grid item>
              <div className={classes.chart}>
                <VictoryChart padding={100} containerComponent={<VictoryZoomContainer />} width={1000} height={750}>
                  <VictoryAxis fixLabelOverlap label={bundle.time + " - h : min"} style={{axisLabel: {padding: 50}}}/>
                  <VictoryAxis dependentAxis label={bundle.temp + " - °C"} style={{axisLabel: {padding: 60, angle:-90 }}} />
                  <VictoryLine data={this.state.weatherData} x="CLOCK" y="TEMP" style={{data:{stroke: "red", strokeWidth:3}}} />
                </VictoryChart>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Statics);
