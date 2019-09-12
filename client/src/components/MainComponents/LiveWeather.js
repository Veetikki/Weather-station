import React, {Component} from 'react';
import {List, ListItem, ListItemText, Card, CardHeader, CardContent, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from "../../interface/App_bundle";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const LIVEWEATHER = "/api/liveWeather";
const WEATHERAPI = "http://api.openweathermap.org/data/2.5/weather?q=33100,fi&units=metric&APPID=518ac10bfba2319ed61c825a23ab5275";

const styles = {
    root:{
        justify: "center",
        padding: "20px",
    },
};

class LiveWeather extends Component {
    constructor(){
        super();

        this.state = {
            liveWeather: [],
            weather: [],
            humidity: 0,
        }
    }

    componentDidMount()
    {
        /*
        fetch(LIVEWEATHER)
        .then(res => res.json())
        .then(liveWeather => this.setState({ liveWeather: liveWeather }, () => console.log(liveWeather)))
        .catch((err) => {
            console.log(err)
        });
        */
        fetch(WEATHERAPI)
        .then(res => res.json())
        .then(weatherStatus => this.setState({liveWeather: {"TEMP":weatherStatus.main.temp, "PRESS": weatherStatus.main.pressure}, weather: weatherStatus.weather[0], humidity: weatherStatus.main.humidity }, () => console.log(weatherStatus.weather[0])))
        .catch((err) => {
            console.log(err)
        });
    }

    render() { 
        const { classes } = this.props;
        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
        }

        return (
            <MuiThemeProvider theme={this.props.theme}>
                <div className={classes.root}>
                    <Card raised>
                        <CardHeader className={classes.header} title={bundle.liveWeather + " Tampere"}>
                            
                        </CardHeader>
                        <CardContent>
                            <List>
                                <ListItem alignItems="center">
                                    <img width={60} src ={`http://openweathermap.org/img/wn/${this.state.weather.icon}.png`} alt="wthr img" />
                                </ListItem>
                                <ListItemText>
                                    {bundle.temp}: {this.state.liveWeather.TEMP} °C
                                </ListItemText>
                                <ListItemText>
                                    {bundle.press}: {this.state.liveWeather.PRESS} hPa
                                </ListItemText>
                                <ListItemText>
                                    {bundle.humidity}: {this.state.humidity}%
                                </ListItemText>
                                <ListItemText>
                                    {bundle.status}: {this.state.weather.description}
                                </ListItemText>
                            </List>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}
 
export default withStyles(styles, {withTheme: true})(LiveWeather);