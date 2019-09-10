import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = {
    root:{
        padding: "20px",
        
    },
}

class DigitalClock extends Component {
	constructor() {
        super();
        
        this.state ={
            time: new Date()
        }

        this._isMounted = false;
    }

	componentDidMount() {
        //checks every second
        //need is mounted otherwise memoryleak
        this._isMounted = true;
		setInterval( () => {
            if(this._isMounted === true)
                this.setState({
                    time: new Date()
                })
            
		},1000)
    }

    componentWillUnmount() {
        //need to unmount that it doesnt cause memoryleak
        this._isMounted = false;
     }

    addZero(i) 
    {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }
	
	render() {
        const {classes} = this.props;
        
		return (
			<div 
            className={classes.root}
			>
                <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'></link>
                <Typography align="center" style={{fontFamily:"Orbitron",border: "solid", width: 350, height:100, padding:10}} variant="h2">
                    {this.addZero(this.state.time.getHours()) + "." + this.addZero(this.state.time.getMinutes()) + "." + this.addZero(this.state.time.getSeconds())}
                </Typography>
			</div>
		);
	}
}

export default withStyles(styles)(DigitalClock);
