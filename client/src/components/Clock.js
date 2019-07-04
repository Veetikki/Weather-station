import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const styles = {
    root:{
        padding: "20px"
    },
    canvas:{
        border: "solid"
    }
}

class Clock extends Component {
	constructor() {
		super();
		this.canvas = null; // updated via ref
	}
	
	/**
	  * Draw the canvas graphics when some prop or state changed.
	  */
	componentDidUpdate(prevProps, prevState) {
		this.redrawCanvas();
	}
	
	/**
	  * Draw the canvas graphics when the component first appears on screen.
	  */
	componentDidMount() {
		this.redrawCanvas();
	}
	
	/**
	  * This method paints the venndiagram
	  * into the <canvas>.
	  */
	redrawCanvas() {
		let ctx = this.canvas.getContext('2d');
		// This painting adjusts transform (scaling, translating) and therefore we must remember to reset it.
		ctx.resetTransform();	
		// reset also the composite operation to the default value
		ctx.globalCompositeOperation = "source-over";
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this.props.size, this.props.size);
        
        //outline
		ctx.lineWidth = 2.0; 
        ctx.strokeStyle = "Black";
        const ol = new Path2D();
		ol.arc(this.props.size/2, this.props.size/2, this.props.size/2-10, 0, Math.PI * 2);
		ctx.fillStyle = "#82E0AA";
		ctx.fill(ol);
        ctx.stroke(ol);
        
        ctx.fillStyle = "black";
        ctx.setTransform(1, 0, 0, 1, 0, 0);	
        ctx.translate(this.props.size/2, this.props.size/2);
        //jos ei keskellä niin numerot menee vinoon
        ctx.font = 14 + "px Lucida Console";
        ctx.textBaseline="middle";
        ctx.textAlign="center";

		for (var i = 1; i <= 60; i++) {
            // thanks to our optimized coordinate system, this is simple
            var angle = i*Math.PI / 30;
            ctx.rotate(angle);
            

            if(i%5 === 0)
            {
                ctx.translate(0,-this.props.size/2+25);
                ctx.rotate(-angle);
                let num = i/5;
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(angle);
                ctx.translate(0,this.props.size/2-25);
            }
            else
            {
                ctx.translate(0,-this.props.size/2+19);
                ctx.rotate(-angle);
                ctx.fillText("·", 0, 0);
                ctx.rotate(angle);
                ctx.translate(0,this.props.size/2-19);
            }
                
            
            ctx.rotate(-angle);
        }
	}
	
	render() {
        const {classes} = this.props;
		return (
			<div 
            className={classes.root}
			>
                <canvas
                className={classes.canvas}
                size={this.props.size} 
                width={this.props.size}
                height={this.props.size}
                ref={(el) => {this.canvas = el;}} 
                />
			</div>
		);
	}
}

export default withStyles(styles)(Clock);
