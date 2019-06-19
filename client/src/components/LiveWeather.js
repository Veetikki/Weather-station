import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import '../styles/liveWeather.css';

const LIVEWEATHER = "/api/liveWeather";

class LiveWeather extends Component {
    constructor(){
        super();

        this.state = {
            liveWeather: [],
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
    }

    render() { 
        return (
            <div> 
                <Table>
                    <TableHead>
                        Live weather
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                            {this.state.liveWeather.DATE}
                            </TableCell>
                            <TableCell>
                            {this.state.liveWeather.CLOCK}
                            </TableCell>
                            <TableCell>
                            {this.state.liveWeather.TEMP}
                            </TableCell>
                            <TableCell>
                            {this.state.liveWeather.PRESS}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}
 
export default LiveWeather;