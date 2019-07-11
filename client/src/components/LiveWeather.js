import React, {Component} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const LIVEWEATHER = "/api/liveWeather";
const WEATHERAPI = "http://api.openweathermap.org/data/2.5/weather?q=33100,fi&units=metric&APPID=518ac10bfba2319ed61c825a23ab5275";

const styles = {
    root:{
        justify: "center",
        padding: "20px",
    },
    header: {
        background: "#2980B9",
    },
    headerText: {
        fontSize: 22,
    },
    body: {
        background: "#81D4FA",
        justify: "center",
        borderStyle: "solid",
        borderColor: "#2980B9",
    }
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
        fetch(LIVEWEATHER)
        .then(res => res.json())
        .then(liveWeather => this.setState({ liveWeather: liveWeather }, () => console.log(liveWeather)))
        .catch((err) => {
            console.log(err)
        });
        fetch(WEATHERAPI)
        .then(res => res.json())
        .then(weatherStatus => this.setState({ weather: weatherStatus.weather[0], humidity: weatherStatus.main.humidity }, () => console.log(weatherStatus.weather[0])))
        .catch((err) => {
            console.log(err)
        });
    }

    render() { 
        const { classes } = this.props;
        return (
            <div className={classes.root}> 
                <List padding="dense" className={classes.body}>
                    <ListItemText align="center" className={classes.header}>
                        <h1 className={classes.headerText}>Live Weather</h1>
                    </ListItemText>
                    <ListItem>
                        <List>
                            <ListItem alignItems="center">
                                <img width={60} src ={`http://openweathermap.org/img/wn/${this.state.weather.icon}.png`} alt="wthr img" />
                            </ListItem>
                            <ListItemText>
                                Temperature: {this.state.liveWeather.TEMP} °C
                            </ListItemText>
                            <ListItemText>
                                Pressure: {this.state.liveWeather.PRESS} hPa
                            </ListItemText>
                            <ListItemText>
                                Humidity: {this.state.humidity}%
                            </ListItemText>
                            <ListItemText>
                                Status: {this.state.weather.description}
                            </ListItemText>
                        </List> 
                    </ListItem>
                </List>
            </div>
        );
    }
}
 
export default withStyles(styles)(LiveWeather);