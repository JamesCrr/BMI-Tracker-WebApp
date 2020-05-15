import React, { Component } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import CanvasJSReact from '../../graph/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {

    constructor(){
        super();

		this.state = {
			rerender: false,
		}
        this.options = {
			animationEnabled: true,
            exportEnabled: false,
            zoomEnabled:true,
			theme: "light2", // "light1", "dark1", "dark2"
            
            title:{
				text: "BMI Graph"
			},
			axisY: {
				title: "BMI",
				includeZero: false,
				viewportMinimum: 0,
				viewportMaximum: 50,
                
                stripLines:[
					{
                        startValue:0,
                        endValue:16,                
                        color:"rgba(204, 0, 0, .4)",
                        label:"Severely Underweight",
                        labelFontColor:"black",
                    },
					{
                        startValue:16,
                        endValue:18.5,                
                        color:"rgba(255, 204, 102, .4)",
                        label:"Underweight",
                        labelFontColor:"black",
                    },
                    {
                        startValue:18.5,
                        endValue:25,                
                        color:"rgba(102, 255, 102, .5)",
                        label:"Healthy",
                        labelFontColor:"black",
					},
					{
                        startValue:25,
                        endValue:30,                
                        color:"rgba(255, 204, 102, .4)",
                        label:"Overweight",
                        labelFontColor:"black",
					},
					{
                        startValue:30,
                        endValue:50,                
                        color:"rgba(204, 0, 0, .4)",
                        label:"Severely Overweight",
                        labelFontColor:"black",
                    }
                ]
			},
			axisX: {
				title: "Days",
				intervalType: "day"
			},
			data: [{
				type: "line",
				markerColor:"rgb(50, 68, 168)",
				toolTipContent: "{x}: {y} BMI",
				dataPoints: []
			}]
		};
    }

	componentDidMount() {
		this.fetchFromDatabase();
	}

	componentDidUpdate(prevProps, prevState) {
		// update graph when user submitted
		if (this.props.submitCount !== prevProps.submitCount) {
			this.fetchFromDatabase();
		}
	  }

	fetchFromDatabase = () => {
		const myUserId = {
			id: this.props.userid
		}
		axios.post("/api/bmi/getbmi", myUserId)
		.then(res => {
			// Create new Data Points
			var newDataPoints = [];
			for (var i = 0; i < res.data.length; i++) {
				// console.log(index + ": " + BMILog.bmi + " / " + BMILog.date)
				newDataPoints.push({
					x: new Date(res.data[i].date),
					y: res.data[i].bmi
				});
			}
			// Sort new Data according to date
			newDataPoints.sort((a,b) => a.x - b.x);
			// Assign new Points to graph
			this.options.data[0].dataPoints = newDataPoints
			// Prompt react to rerender graph
			this.setState({
				rerender: !this.state.rerender
			})
		}) 
		.catch(err => {
		  console.log(err);
		});
	}

    render() {
		return (
		<div>
			<CanvasJSChart key={this.state.rerender} options = {this.options} 
			onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

Graph.propTypes = {
	userid: PropTypes.string.isRequired,
	submitCount: PropTypes.number.isRequired
}
const mapStateToProps = (state) => ({
	userid: state.auth.user.id,
	submitCount: state.tracker.submitCount
});

export default connect(
	mapStateToProps
)(Graph);