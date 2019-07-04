import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, List, ListItem, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const LIVEWEATHER = "/api/liveWeather";

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
        const { classes } = this.props;
        return (
            <div className={classes.root}> 
                <List padding="dense" className={classes.body}>
                    <ListItemText align="center" className={classes.header}>
                        <h1 className={classes.headerText}>Live Weather</h1>
                    </ListItemText>
                    <ListItem>
                        <List>
                            <ListItemText>
                                Temperature: {this.state.liveWeather.TEMP}
                            </ListItemText>
                            <ListItemText>
                                Pressure: {this.state.liveWeather.PRESS}
                            </ListItemText>
                        </List> 
                    </ListItem>
                </List>
            </div>
        );
    }
}
 
export default withStyles(styles)(LiveWeather);