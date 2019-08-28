import React, {Component} from 'react';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell, Radio, RadioGroup, FormControlLabel, FormGroup} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../App_bundle';

const WEATHER = "/api/weather";
const styles = {
    root:{
        justify: "center",
        padding: "20px",
    },
    header: {
        background: "#2980B9",
        padding: "0px 20px",
    },
    headerText: {
        fontSize: 22,
    },
    body: {
        background: "#81D4FA",
        justify: "center",
        borderStyle: "solid",
        borderColor: "#2980B9",
        alignItems: "center"
    }
};


class WeatherList extends Component {
    constructor(){
        super();

        this.state = {
            field: "DATE",
            reverse: false,
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

    //sort by filed: name or size, reverse tells if ascending or descending order for Array().sort() function.
    sort_by(field, reverse)
    {
        var primer;

        //tarkistetaan mitä vertaillaan ja muokataan se vertailtavaan muotoon
        if(field === 'DATE')
        {
            primer = function(a){return new Date(a)};
        }
        else
        {
            primer = parseFloat;
        }
    
        //eli tehdään compare functio ja varmistetaan että saa oikean mallisen parametrin
        var key = primer ? 
            function(x) {return primer(x[field] + "T" + x["CLOCK"])} : 
            function(x) {return x[field]};
    
        //tarkistetaan onko asc vai desc
        reverse = !reverse ? 1 : -1;
    
        return function (a, b) 
        {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }
    
    handleChange = (event) => {
        var s = event.target.value.split("-");
        var isTrue = (s[1] === 'true');
        this.setState({
            field: s[0],
            reverse: isTrue
        });
    }

    render() { 
        const { classes } = this.props;

        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
        }

        return (
            <Paper>
                <h1 className={classes.header}>
                    {bundle.list}
                </h1>
                <RadioGroup
                        aria-label="Order"
                        name="order"
                        value={this.state.field + "-" + this.state.reverse}
                        onChange={(e) => this.handleChange(e)}
                    >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                {bundle.time}
                                <FormGroup>
                                    <FormControlLabel value="DATE-false" control={<Radio />} labelPlacement="end" label={bundle.asc} />
                                    <FormControlLabel value="DATE-true" control={<Radio />} labelPlacement="end" label={bundle.desc} />
                                </FormGroup>
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                                {bundle.temp}
                                <FormGroup>
                                    <FormControlLabel value="TEMP-false" control={<Radio />} />
                                    <FormControlLabel value="TEMP-true" control={<Radio />} />
                                </FormGroup>
                            </TableCell>
                            <TableCell>
                                {bundle.press}
                                <FormGroup>
                                    <FormControlLabel value="PRESS-false" control={<Radio />} />
                                    <FormControlLabel value="PRESS-true" control={<Radio />} />
                                </FormGroup>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {this.state.weatherList.sort(this.sort_by(this.state.field, this.state.reverse)).map((weatherData) => (
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
                </RadioGroup>
            </Paper>
        );
    }
}
 
export default withStyles(styles)(WeatherList);