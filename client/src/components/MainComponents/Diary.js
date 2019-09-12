import React, {Component} from 'react';
import {TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, Card, CardHeader, CardContent, CardActions, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../interface/App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
import enLocale from 'date-fns/locale/en-US';

const DIARY = "/api/diary";

const localeMap = {
    en: enLocale,
    fi: fiLocale,
  }; 

const styles = {
    root:{
        padding: "20px",
        maxWidth: "500px",
        minWidth: "200px",
        textAlign: "center",
    },
    button:{
        justifyContent: 'center'
    },
};

class Diary extends Component {
    
    constructor()
    {
        super();

        var currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        this.state = {
            openDialogText: false,
            openDialogDate: false,
            past: [],
            future: [],
            newDiary: "",
            diaryList: [],
            diary: null,
            date: currentDate,
        }
    }

    componentDidMount()
    {
        fetch(DIARY)
        .then(res => res.json())
        .then(diaryList => this.setState({ diaryList: diaryList }, () => console.log(diaryList), this.setDiary(diaryList)))
        .catch((err) => {
            console.log(err)
        });
    }

    setDiary(List)
    {
        //let's check if api has diary for current day
        List.map((diaryData) => {
            if((this.state.date.getFullYear()  + "-" + this.addZero(this.state.date.getMonth() + 1) + "-" + this.state.date.getDate()) === diaryData.DATE)
            {
                this.setState({
                    diary: diaryData.DIARY,
                });
            }
        });

    }

    openDialogText = (event) =>
    {
        this.setState({
            newDiary: this.state.diary,
            openDialogText: true,
        });
    }

    closeDialogText = (event) =>
    {
        this.updateHistory(event);
        this.handleSubmit(event, this.state.diary, this.state.newDiary);
        this.setState({
            openDialogText: false,
            diary: this.state.newDiary,
            newDiary: "",
        });
    }

    addZero(i) 
    {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

    handleSubmit = async (event, oldData, newData) => {
        var thisType = "INSERT";

        if(oldData !== null && newData !== null)
            thisType = "UPDATE";
        //if we are doing undo so we can delete then 
        else if(oldData !== null && newData === null)
            thisType = "DELETE";

        event.preventDefault();
        try
        {
            const fetchResponse = await fetch(DIARY, {
                method: 'POST',
                headers: {
                    type: thisType,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify( {
                DATE : (this.state.date.getFullYear()  + "-" + this.addZero(this.state.date.getMonth() + 1) + "-" + this.state.date.getDate()),
                DIARY : newData,
            })
           });

           const data = await fetchResponse.json();
           console.log(data);
           return data;
        } catch (e) 
        {
            console.log(e);
            return e;
        }
   }

    cancelChange = (event) =>
    {
        this.setState({
            openDialog: false,
            newDiary: "",
        });
    }

    updateDiary = (event) => 
    {
        this.setState({
            newDiary: event.target.value,
        });
    }

    //updates history
    updateHistory = (event) =>
    {
        const copy = this.state.past;
        copy.push([this.state.diary, this.state.newDiary]);
        this.setState({
            past: copy,
            future: [],
        });
    }

    //handles undo
    handleUndo = (event) =>
    {
        if(this.state.past.length > 0)
        {
            const present = [
                this.state.diary,
                this.state.newDiary];

            const copy1 = this.state.future;
            const copy2 = this.state.past;

            const newPresent = copy2.pop();

            copy1.push(present);

            const res = this.handleSubmit(event, this.state.diary, newPresent[0]);

            if(res)
                this.setState({
                    diary: newPresent[0],
                    newDiary: newPresent[1],
                    past: copy2,
                    future: copy1,
                }
                );
        }
    }

    //handles redo
    handleRedo = (event) =>
    {
        if(this.state.future.length > 0)
        {
            const present = [
                this.state.diary,
                this.state.newDiary];

            const copy1 = this.state.future;
            const copy2 = this.state.past;

            const newPresent = copy1.pop();

            copy2.push(present);
            
            this.handleSubmit(event, this.state.diary, newPresent[0]);
            this.setState({
                diary: newPresent[0],
                newDiary: newPresent[1],
                past: copy2,
                future: copy1,
            });
        }
    }

    handleDelete = (event) =>
    {
        this.handleSubmit(event, this.state.diary, null);
        this.updateHistory(event);
        this.setState({
            diary: null,
            newDiary: this.state.diary,
        })
    }

    handleDateChange = (date) =>
	{
        this.setState({
            date: date,
        });
    }

    openDialogDate = (event) =>
    {
        this.setState({
            openDialogDate: true,
        })
    }

    closeDialogDate = (event) =>
    {
        this.setState({
            openDialogDate: false,
        })

        this.setDiary(this.state.diaryList);
    }

    render() { 
        const { classes } = this.props;
        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
		}

        return (
            <MuiThemeProvider theme={this.props.theme}>
                <MuiPickersUtilsProvider locale={localeMap[this.props.language]} utils={DateFnsUtils}>
                    <div className={classes.root}>
                        <Card raised>
                            <CardHeader className={classes.header} title={bundle.diary+ " " + (this.state.date.getDate()  + "." + this.addZero(this.state.date.getMonth() + 1) + "." + this.state.date.getFullYear())}>

                            </CardHeader>
                            <CardContent >
                                <Typography align="left" className={classes.text}>{this.state.diary }</Typography>
                            </CardContent>
                            <CardActions className={classes.button}>
                                <Button disabled={this.state.diary === null} color="secondary" variant="contained" onClick={(e) => this.handleDelete(e)}>{bundle.delete}</Button>
                                <Button color="secondary" variant="contained" onClick={(e) => this.openDialogText(e)}> {bundle.update} </Button>
                                <Button disabled={this.state.past.length <= 0} color="secondary" variant="contained" onClick={(e) => this.handleUndo(e)} >{bundle.undo}</Button>
                                <Button disabled={this.state.future.length <= 0} color="secondary" variant="contained" onClick={(e) => this.handleRedo(e)} >{bundle.redo}</Button>
                                <Button color="secondary" variant="contained" onClick={(e) => this.openDialogDate(e)}> {bundle.date} </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div>
                        <Dialog open={this.state.openDialogText}>
                            <DialogTitle>{bundle.edit}</DialogTitle>
                            <DialogContent>
                                <TextField multiline variant="outlined" value={this.state.newDiary} onChange={(e) => this.updateDiary(e)} />
                            </DialogContent>
                            <DialogActions>
                                <Button color="secondary" variant="contained" onClick={(e) => this.cancelChange(e)} > {bundle.cancel} </Button>
                                <Button color="secondary" variant="contained" onClick={(e) => this.closeDialogText(e)} > {bundle.confirm} </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog open={this.state.openDialogDate}>
                            <DialogTitle>{bundle.edit}</DialogTitle>
                            <DialogContent>
                                <DatePicker
                                format="do MMMM yyyy"
                                label={bundle.date}
                                value={this.state.date}
                                maxDate={new Date()}
                                onChange={this.handleDateChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button color="secondary" variant="contained" onClick={(e) => this.closeDialogDate(e)} > {bundle.close} </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}
 
export default withStyles(styles, {withTheme: true})(Diary);