import React, {Component} from 'react';
import {List, ListItemText, TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../App_bundle';

const styles = {
    root:{
        padding: "20px",
        maxWidth: "500px"
    },
    header: {
        background: "#2980B9",
    },
    headerText: {
        fontSize: 22,
    },
    body: {
        background: "#81D4FA",
        borderStyle: "solid",
        borderColor: "#2980B9",
    },
    diary: {
        wordWrap: "breakWord",
        width: "90%",
    },
    text: {
        borderStyle: "solid", 
        padding:20,
    },
};

class LiveWeather extends Component {
    constructor(){
        super();

        this.state = {
            openDialog: false,
            newDiary: "",
            diary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        }
    }

    componentDidMount()
    {
        
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
        this.setState({
            openDialog: false,
            diary: this.state.newDiary,
            newDiary: "",
        });
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

    render() { 
        const { classes } = this.props;
        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
		}

        return (
            <div>
                <div className={classes.root}> 
                    <List padding="dense" className={classes.body}>
                        <ListItemText align="center" className={classes.header}>
                            <h1 className={classes.headerText}>{bundle.diary}</h1>
                        </ListItemText>
                        <ListItemText align="center">
                            <div className={classes.diary}>
                                <Typography align="left" className={classes.text}>{this.state.diary}</Typography>
                            </div>
                        </ListItemText>
                        <ListItemText align="center" >
                            <Button variant="contained" onClick={(e) => this.openDialog(e)}> {bundle.update} </Button>
                        </ListItemText>
                    </List>
                </div>
                <div>
                    <Dialog open={this.state.openDialog}>
                        <DialogTitle>{bundle.edit}</DialogTitle>
                        <DialogContent>
                            <TextField multiline variant="outlined" value={this.state.newDiary} onChange={(e) => this.updateDiary(e)} />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={(e) => this.cancelChange(e)} > {bundle.cancel} </Button>
                            <Button variant="contained" onClick={(e) => this.closeDialog(e)} > {bundle.confirm} </Button>
                        </DialogActions>
                    </Dialog>
                    
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(LiveWeather);