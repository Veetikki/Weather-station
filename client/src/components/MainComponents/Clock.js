import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
        var ctx = this.canvas.getContext('2d');
		this.redrawCanvas(ctx);
	}
	
	/**
	  * Draw the canvas graphics when the component first appears on screen.
	  */
	componentDidMount() {
        //checks every second
        //oltava määritelmä täällä muuten tulee erroria
        var ctx = this.canvas.getContext('2d');
		setInterval( () => {
            this.redrawCanvas(ctx);
            this.redrawTime(ctx);
            
		},1000)
    }
    
    /*
     *This draws hands
     *
     */
    redrawTime(ctx) {
		// This painting adjusts transform (scaling, translating) and therefore we must remember to reset it.
		ctx.resetTransform();	
		// reset also the composite operation to the default value
		ctx.globalCompositeOperation = "source-over";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        ctx.fillStyle = "black";
        ctx.translate(this.props.size/2, this.props.size/2);
        var currTime = new Date();
        var h = currTime.getHours();
        var m = currTime.getMinutes();
        var s = currTime.getSeconds();

        h=h%12;
        h=(h*Math.PI/6)+
        (m*Math.PI/(6*60))+
        (s*Math.PI/(360*60));
        this.drawHand(ctx, h, this.props.size/2*0.55, this.props.size*0.02);
        //minute
        m=(m*Math.PI/30)+(s*Math.PI/(30*60));
        this.drawHand(ctx, m, this.props.size/2*0.75, this.props.size*0.008);
        // second
        ctx.strokeStyle = "red";
        s=(s*Math.PI/30);
        this.drawHand(ctx, s, this.props.size/2*0.80, this.props.size*0.003);
    }

    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
	
	/**
	  * This method paints the Clock outline and numbers
	  * into the <canvas>.
	  */
	redrawCanvas(ctx) {
		ctx.resetTransform();	
		ctx.globalCompositeOperation = "source-over";
		ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.props.size, this.props.size);

        //outline
		ctx.lineWidth = 3.0; 
        ctx.strokeStyle = "Black";
        const ol = new Path2D();
		ol.arc(this.props.size/2, this.props.size/2, this.props.size/2-10, 0, Math.PI * 2);
		ctx.fillStyle = this.props.backgroundColor;
		ctx.fill(ol);
        ctx.stroke(ol);
        
        ctx.fillStyle = "black";
        ctx.setTransform(1, 0, 0, 1, 0, 0);	
        ctx.translate(this.props.size/2, this.props.size/2);
        //jos ei keskellä niin numerot menee vinoon
        ctx.font = this.props.size*0.07 + "px Lucida Console";
        ctx.textBaseline="middle";
        ctx.textAlign="center";

        for (var i = 1; i <= 60; i++) 
        {
            var angle = i*Math.PI / 30;
            ctx.rotate(angle);
            

            if(i%5 === 0)
            {
                ctx.translate(0,-this.props.size/2*0.83);
                ctx.rotate(-angle);
                let num = i/5;
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(angle);
                ctx.translate(0,this.props.size/2*0.83);
            }
            else
            {
                ctx.translate(0,-this.props.size/2*0.90);
                ctx.rotate(-angle);
                ctx.fillText("·", 0, 0);
                ctx.rotate(angle);
                ctx.translate(0,this.props.size/2*0.90);
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
                width={this.props.size}
                height={this.props.size}
                ref={(el) => {this.canvas = el;}} 
                />
			</div>
		);
	}
}

export default withStyles(styles)(Clock);
