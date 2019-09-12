import React, {Component} from 'react';
import {Paper, Table, TableHead, TableBody, TableRow, 
    TableCell, Radio, RadioGroup, FormControlLabel, 
    FormGroup, Button, Dialog,  DialogTitle, 
    DialogContent, Stepper, Step, StepLabel, StepContent, Typography,} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
import enLocale from 'date-fns/locale/en-US';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../interface/App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ExportCSV from './ExportCSV';

const localeMap = {
    en: enLocale,
    fi: fiLocale,
  }; 

const WEATHER = "/api/weather";

const styles = {
    root:{
        justify: "center",
        padding: "20px",
    },
    header: {
        padding: "20px 20px",
    },
    body: {
        justify: "center",
        borderStyle: "solid",
        alignItems: "center"
    },
    button:{
        padding: "10px 10px",
    }
};


class WeatherList extends Component {
    constructor(){
        super();

        var startTime = new Date();
        startTime.setHours(0,0,0,0);

        var endTime = new Date();

        this.state = {
            field: "DATE",
            reverse: false,
            weatherList: [],
            boundedWeatherData: [],
            minTime: startTime,
            maxTime: endTime,
            newMinTime: startTime,
            newMaxTime: startTime,
            openDialog: false,
            step: 0,
        }
    }

    componentDidMount()
    {
        var copyList = [];
        fetch(WEATHER)
        .then(res => res.json())
        .then(weatherList => 
            (weatherList.sort(this.sort_by(this.state.field, this.state.reverse)).map((weatherData, index) => {
                let dataDate = new Date(weatherData.DATE)
                dataDate.setHours(0,0,0,0);

                if(dataDate >= this.state.minTime && dataDate <= this.state.maxTime)
                {
                    copyList.push(weatherData);
                }
            }), this.setState({ weatherList: weatherList, boundedWeatherData: copyList }, () => console.log(weatherList),
        )))
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
    
    handleSortChange = (event) => {
        var s = event.target.value.split("-");
        var isTrue = (s[1] === 'true');
        this.setState({
            field: s[0],
            reverse: isTrue
        });
    }

    handleMinDateChange = (date) =>
	{
        this.setState({
            newMinTime: date,
            newMaxTime: date,
        });
    }

    handleMaxDateChange = (date) =>
	{
        this.setState({
            newMaxTime: date,
        });
    }

    openDialog = (event) =>
    {
        this.setState({
            openDialog: true,
            newMinTime: this.state.minTime,
            newMaxTime: this.state.maxTime,
            step: 0,
        });
    }

    cancelChange = (event) =>
    {
        this.setState({
            openDialog: false,
            step: 0,
        });
    }

    handleBack = (event) =>
    {
        this.setState({
            step: this.state.step -1
        })
    }

    handleNext = (event, index) => 
    {
        if(index < 2)
        {
            this.setState({
                step: this.state.step + 1,
            })
        }
        else
        {
            var copyList = [];
            this.state.weatherList.sort(this.sort_by(this.state.field, this.state.reverse)).map((weatherData, index) => {
                let dataDate = new Date(weatherData.DATE)
                dataDate.setHours(0,0,0,0);

                if(dataDate >= this.state.newMinTime && dataDate <= this.state.newMaxTime)
                {
                    copyList.push(weatherData);
                }
            });

            this.setState({
                boundedWeatherData: copyList,
                step: this.state.step + 1,
                minTime: this.state.newMinTime,
                maxTime: this.state.newMaxTime,
                openDialog: false,
            })
        }
    }

    render() { 
        const { classes } = this.props;

        let id = 0;
        function createData(name) {
        id += 1;
        return { id, name};
        }

        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
        }

        const steps =[
            createData(bundle.setStart),
            createData(bundle.setEnd),
        ];

        return (
            <MuiThemeProvider theme={this.props.theme}>
            <MuiPickersUtilsProvider locale={localeMap[this.props.language]} utils={DateFnsUtils}>
            <Paper>
                <Typography variant="h4" className={classes.header}>
                    {bundle.list + " " + this.state.minTime.getDate() + "." + (this.state.minTime.getMonth() + 1) + "." + this.state.minTime.getFullYear()  
                    + " - " + this.state.maxTime.getDate() + "." + (this.state.maxTime.getMonth() + 1) + "." + this.state.maxTime.getFullYear()}
                </Typography>
                <div className={classes.button}>
                    <Button color="secondary" variant="contained" onClick={(e) => this.openDialog(e)}>
                        {bundle.filter}
                    </Button>
                    <ExportCSV theme={this.props.theme} disabled={this.state.boundedWeatherData.length === 0} csvData={this.state.boundedWeatherData} fileName={this.state.minTime.getDate() + "." + (this.state.minTime.getMonth() + 1) + "." + this.state.minTime.getFullYear()  
                    + "-" + this.state.maxTime.getDate() + "." + (this.state.maxTime.getMonth() + 1) + "." + this.state.maxTime.getFullYear() + ".csv"}/>
                </div>
                <RadioGroup
                        aria-label="Order"
                        name="order"
                        value={this.state.field + "-" + this.state.reverse}
                        onChange={(e) => this.handleSortChange(e)}
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
                            {this.state.weatherList.sort(this.sort_by(this.state.field, this.state.reverse)).map((weatherData, index) => {
                                let dataDate = new Date(weatherData.DATE)
                                dataDate.setHours(0,0,0,0);
                                if(dataDate >= this.state.minTime && dataDate <= this.state.maxTime)
                                {
                                    return  <TableRow key={index}>
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
                                }
                            })}
                        </TableBody>
                </Table>
                </RadioGroup>
                <div>
                    <Dialog open={this.state.openDialog}>
                        <DialogTitle>{bundle.edit}</DialogTitle>
                        <DialogContent>
                                <Stepper activeStep={this.state.step} orientation="vertical">
                                    {steps.map(step => (
                                        <Step key={step.name}>
                                            <StepLabel>{step.name}</StepLabel>
                                            <StepContent>
                                                {step.id === 1 && (
                                                    <DatePicker
                                                    format="do MMMM yyyy"
                                                    label={bundle.startTime}
                                                    value={this.state.newMinTime}
                                                    maxDate={new Date()}
                                                    onChange={this.handleMinDateChange}
                                                    id="min"
                                                    />
                                                )}
                                                {step.id === 2 && (
                                                    <DatePicker
                                                    format="do MMMM yyyy"
                                                    label={bundle.endTime}
                                                    minDate={this.state.newMinTime}
                                                    maxDate={new Date()}
                                                    value={this.state.newMaxTime}
                                                    onChange={this.handleMaxDateChange}
                                                    id="max"
                                                    />
                                                )}
                                                <div>
                                                    <Button variant="contained" color="secondary" onClick={(e) => this.cancelChange(e)}>
                                                        {bundle.cancel}
                                                    </Button>
                                                    <Button variant="contained" color="secondary" onClick={(e) => this.handleBack(e)} disabled={step.id === 1}>
                                                        {bundle.back}
                                                    </Button>
                                                    <Button variant="contained" color="primary" onClick={(e) => this.handleNext(e, step.id)}>
                                                        {step.id === 2 ? bundle.confirm : bundle.next}
                                                    </Button>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                        </DialogContent>
                    </Dialog>
                </div>
            </Paper>
            </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}
 
export default withStyles(styles, {withTheme: true})(WeatherList);