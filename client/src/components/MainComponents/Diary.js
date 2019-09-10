import React, {Component} from 'react';
import {TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, Card, CardHeader, CardContent, CardActions, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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