import React, {Component} from 'react';
import {Paper, Button, Dialog,  DialogTitle, 
    DialogContent, Stepper, Step, StepLabel, StepContent, Typography,} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
import enLocale from 'date-fns/locale/en-US';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import THEME from '../App_theme';
import FONT from '../App_font';
import Axis from './Axis';

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


class Statics extends Component {
    constructor(){
        super();

        var startTime = new Date();
        startTime.setHours(0);
        startTime.setMinutes(0);

        var endTime = new Date();

        this.state = {
            language: localStorage.getItem('uiLanguage'),
            field: "DATE",
            weatherList: [],
            boundedWeatherList: [],
            minTime: startTime,
            maxTime: endTime,
            openDialog: false,
            step: 0,
        }
    }

    componentDidMount()
    {
        fetch(WEATHER)
        .then(res => res.json())
        .then(weatherList => this.setState({ weatherList: weatherList, }, () => console.log(weatherList)))
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

    handleMinDateChange = (date) =>
	{
        this.setState({
            minTime: date,
            maxTime: date,
        });
    }

    handleMaxDateChange = (date) =>
	{
        this.setState({
            maxTime: date,
        });
    }

    openDialog = (event) =>
    {
        this.setState({
            openDialog: true,
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
            this.state.weatherList.sort(this.sort_by("DATE", false)).map((weatherData, index) => {
                let dataDate = new Date(weatherData.DATE)
                dataDate.setHours(0,0,0,0);

                if(dataDate >= this.state.minTime && dataDate <= this.state.maxTime)
                {
                    copyList.push(weatherData);
                }
            });
            
            this.setState({
                boundedWeatherList: copyList,
                step: this.state.step + 1,
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
		if (this.state.language in BUNDLE) {
            bundle = BUNDLE[this.state.language];
        }

        const steps =[
            createData(bundle.setEnd),
            createData(bundle.setStart),
        ];

        let theme = createMuiTheme({palette: (THEME[localStorage.getItem('uiTheme')]).palette, typography: (FONT[localStorage.getItem('uiFont')]).typography});

        return (
            <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider locale={localeMap[this.props.language]} utils={DateFnsUtils}>
            <Paper>
                <Typography variant="h4" className={classes.header}>
                    {bundle.data + " " + this.state.minTime.getDate() + "." + (this.state.minTime.getMonth() + 1) + "." + this.state.minTime.getFullYear()  
                    + " - " + this.state.maxTime.getDate() + "." + (this.state.maxTime.getMonth() + 1) + "." + this.state.maxTime.getFullYear()}
                </Typography>
                <div className={classes.button}>
                    <Button color="secondary" variant="contained" onClick={(e) => this.openDialog(e)}>
                        {bundle.filter}
                    </Button>
                </div>
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
                                                    label={bundle.endTime}
                                                    value={this.state.minTime}
                                                    maxDate={new Date()}
                                                    onChange={this.handleMinDateChange}
                                                    id="min"
                                                    />
                                                )}
                                                {step.id === 2 && (
                                                    <DatePicker
                                                    format="do MMMM yyyy"
                                                    label={bundle.endTime}
                                                    minDate={this.state.minTime}
                                                    maxDate={new Date()}
                                                    value={this.state.maxTime}
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
            <Axis list={this.state.boundedWeatherList} language={this.state.language}/>
            </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}
 
export default withStyles(styles, {withTheme: true})(Statics);