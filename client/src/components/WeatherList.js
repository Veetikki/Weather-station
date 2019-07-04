import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';

const WEATHER = "/api/weather";

class WeatherList extends Component {
    constructor(){
        super();

        this.state = {
            weatherList: [],
        }
    }

    componentDidMount()
    {
        fetch(WEATHER)
        .then(res => res.json())
        .then(weatherList => this.setState({ weatherList: weatherList }, () => console.log(weatherList)))
        .catch((err) => {
            console.log(err)
        });
    }

    render() { 
        return ( 
            <Table>
                <TableHead>
                    Weatherlist
                </TableHead>
                <TableBody>
                    {this.state.weatherList.map((weatherData) => (
                    <TableRow>
                        <TableCell>
                        {weatherData.DATE}
                        </TableCell>
                        <TableCell>
                        {weatherData.CLOCK}
                        </TableCell>
                        <TableCell>
                        {weatherData.TEMP}
                        </TableCell>
                        <TableCell>
                        {weatherData.PRESS}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}
 
export default WeatherList;