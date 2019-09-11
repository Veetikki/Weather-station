import React, {Component} from 'react';
import {TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, Card, CardHeader, CardContent, CardActions, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const DIARY = "/api/diary";

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
            openDialog: false,
            past: [],
            future: [],
            newDiary: "",
            diaryList: [],
            diary: "",
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
        List.map((diaryData, index) => {
            if((this.state.date.getMonth() + 1) + "." + this.state.date.getDate() + "." +  this.state.date.getFullYear() === diaryData.DATE)
            {
                console.log("jasjdklfjk")
                this.setState({
                    diary: diaryData.DIARY,
                })
            }
        });

    }

    openDialog = (event) =>
    {
        this.setState({
            newDiary: this.state.diary,
            openDialog: true,
        });
    }

    closeDialog = (event) =>
    {
        this.updateHistory(event);
        this.handleSubmit(event);
        this.setState({
            openDialog: false,
            diary: this.state.newDiary,
            newDiary: "",
        });
    }

    handleSubmit(event) {
        //alert('A list was submitted: ' + this.state.formvalue);
        console.log(this.state.date + this.state.newDiary)
        var thisType = "INSERT";

        if(this.state.diary !== "")
            thisType = "UPDATE";

        event.preventDefault();
        fetch(DIARY, {
            method: 'POST',
            headers: {
                type: thisType,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
           body: JSON.stringify( {
            DATE : (this.state.date.getMonth() + 1) + "." + this.state.date.getDate() + "." +  this.state.date.getFullYear(),
            DIARY : this.state.newDiary,
        })
       }).then(res => res.json())
       .then(data => console.log(data))
       .catch(err => console.log(err));
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
            
            this.setState({
                diary: newPresent[0],
                newDiary: newPresent[1],
                past: copy2,
                future: copy1,
            });
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

            const newPast = copy2.push(present);
            
            this.setState({
                diary: newPresent[0],
                newDiary: newPresent[1],
                past: copy2,
                future: copy1,
            });
        }
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
                        <CardHeader className={classes.header} title={bundle.diary}>

                        </CardHeader>
                        <CardContent >
                            <Typography align="left" className={classes.text}>{this.state.diary}</Typography>
                        </CardContent>
                        <CardActions className={classes.button}>
                            <Button color="secondary" variant="contained" onClick={(e) => this.openDialog(e)}> {bundle.update} </Button>
                            <Button disabled={this.state.past.length <= 0} color="secondary" variant="contained" onClick={(e) => this.handleUndo(e)} >{bundle.undo}</Button>
                            <Button disabled={this.state.future.length <= 0} color="secondary" variant="contained" onClick={(e) => this.handleRedo(e)} >{bundle.redo}</Button>
                        </CardActions>
                    </Card>
                </div>
                <div>
                    <Dialog open={this.state.openDialog}>
                        <DialogTitle>{bundle.edit}</DialogTitle>
                        <DialogContent>
                            <TextField multiline variant="outlined" value={this.state.newDiary} onChange={(e) => this.updateDiary(e)} />
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" variant="contained" onClick={(e) => this.cancelChange(e)} > {bundle.cancel} </Button>
                            <Button color="secondary" variant="contained" onClick={(e) => this.closeDialog(e)} > {bundle.confirm} </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}
 
export default withStyles(styles, {withTheme: true})(Diary);