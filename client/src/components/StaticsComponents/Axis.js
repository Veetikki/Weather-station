import React, { Component} from 'react';
import {Grid, CssBaseline, Radio, FormGroup, FormControlLabel, RadioGroup,} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VictoryChart, VictoryLine, VictoryZoomContainer, VictoryAxis } from 'victory';
import BUNDLE from '../../interface/App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import THEME from '../../interface/App_theme';
import FONT from '../../interface/App_font';

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

class Axis extends Component {
  constructor()
  {
    super();

    var data = localStorage.getItem('uiDataShown')
    if(data === null)
    {
      data = "TEMP";
      localStorage.setItem('uiDataShown', data);
    }

    this.state ={
      data: data,
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

  handleDataShow = (event) =>
  {
    this.setState({
      data: event.target.value,
    });

    localStorage.setItem('uiDataShown', event.target.value)
  }

  renderAxis(bundle, list)
  {
    if(this.state.data === "TEMP")
    {
      return(
        <VictoryChart minDomain={{x:this.state.minTime}} maxDomain={{x:this.state.maxTime}} padding={100} containerComponent={<VictoryZoomContainer />} width={1000} height={750}>
          <VictoryAxis fixLabelOverlap label={bundle.time + " - h : min"} style={{axisLabel: {padding: 50}}}/>
            <VictoryAxis dependentAxis label={bundle.temp + " - °C"} style={{axisLabel: {padding: 60, angle:-90 }}} />
            <VictoryLine data={list} x="CLOCK" y="TEMP" style={{data:{stroke: "red", strokeWidth:3}}} />
        </VictoryChart>
      );
    }
    else if(this.state.data === "PRESS")
    {
      return(
        <VictoryChart padding={100} containerComponent={<VictoryZoomContainer />} width={1000} height={750}>
          <VictoryAxis fixLabelOverlap label={bundle.time + " - h : min"} style={{axisLabel: {padding: 50}}}/>
          <VictoryAxis dependentAxis label={bundle.press + " - HPa"} style={{axisLabel: {padding: 60, angle:-90 }}} />
          <VictoryLine data={list} x="CLOCK" y="PRESS" style={{data:{stroke: "blue", strokeWidth:3}}} />
        </VictoryChart>
      );
    }
    else
    {
      return(
        <Grid container>
          <Grid item>
          <VictoryChart padding={100} containerComponent={<VictoryZoomContainer />} width={800} height={700}>
            <VictoryAxis fixLabelOverlap label={bundle.time + " - h : min"} style={{axisLabel: {padding: 50}}}/>
            <VictoryAxis dependentAxis label={bundle.temp + " - °C"} style={{axisLabel: {padding: 60, angle:-90 }}} />
            <VictoryLine data={list} x="CLOCK" y="TEMP" style={{data:{stroke: "red", strokeWidth:3}}} />
          </VictoryChart>
          </Grid>
          <Grid item>
          <VictoryChart padding={100} containerComponent={<VictoryZoomContainer />} width={800} height={700}>
            <VictoryAxis fixLabelOverlap label={bundle.time + " - h : min"} style={{axisLabel: {padding: 50}}}/>
            <VictoryAxis dependentAxis label={bundle.press + " - HPa"} style={{axisLabel: {padding: 60, angle:-90 }}} />
            <VictoryLine data={list} x="CLOCK" y="PRESS" style={{data:{stroke: "blue", strokeWidth:3}}} />
          </VictoryChart>
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const {classes} = this.props;
    const weatherData = this.props.list;

    let bundle = BUNDLE.default;
    if (this.props.language in BUNDLE) {
        bundle = BUNDLE[this.props.language];
    }
    let theme = createMuiTheme({palette: (THEME[localStorage.getItem('uiTheme')]).palette, typography: (FONT[localStorage.getItem('uiFont')]).typography});

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
            <Grid justify="center" container>
              <Grid item>
                <div className={classes.chart}>
                  {this.renderAxis(bundle, weatherData)}
                </div>
                <div>
                  <RadioGroup value={this.state.data} onChange={(e) => this.handleDataShow(e)}>
                    <FormGroup row>
                      <FormControlLabel value="TEMP" control={<Radio />} labelPlacement="end" label={bundle.temp} />
                      <FormControlLabel value="PRESS" control={<Radio />} labelPlacement="end" label={bundle.press} />
                      <FormControlLabel value="both" control={<Radio />} labelPlacement="end" label={bundle.both} />
                    </FormGroup>
                  </RadioGroup>
                </div>
              </Grid>
            </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(style, {withTheme: true})(Axis);
