import React, {Component} from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import NavBar from "../common/Navbar"
import InputDataUS from "../tracker/InputData_US";
import InputDataMetric from "../tracker/InputData_Metric";

class Calculator extends Component {  

    constructor(props) {
        super(props);

        this.state = {
            metric: true,
            displayString: "",
            displayClass: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // When props changed
        if (this.props.localBMI !== prevProps.localBMI) {
            this.onLocalBMIChanged();
        }
    }

    onLocalBMIChanged = () => {
        var bmi = this.props.localBMI;
        var newString = "";
        var newClass = "col s7"
        if(bmi < 16){
            newString += "Severely Underweight";
            newClass += " red-text text-accent-4"
        }
        else if(bmi >= 16 && bmi < 18.5){
            newString += "Underweight";
            newClass += " orange-text text-darken-4"
        }
        else if(bmi >= 18.5 && bmi < 25){
            newString += "Healthy";
            newClass += " green-text text-accent-4"
        }
        else if(bmi >= 25 && bmi < 30){
            newString += "Overweight";
            newClass += " orange-text text-darken-4"
        }
        else if(bmi >= 30 && bmi <= 50){
            newString += "Severely Overweight";
            newClass += " red-text text-accent-4"
        }
        else {
            newString += "Nan"
        }
        this.setState({
            displayString: newString,
            displayClass: newClass
        })
    }

    onMeasurementPressed = () => {
        this.setState({
            metric: !this.state.metric
        })
    }

    render() {
        return(
            <div>
                {/* NavBar */}
                <div>
                    {
                        // Render navbar is logged in
                        this.props.auth.isAuthenticated ? <NavBar/> : null
                    }
                </div>
                
                <div className="container">
                    {/* Display BMI */}
                    <div className="row">
                        <h2 style={{fontSize:"2.7rem"}} >BMI Calculator</h2>
                    </div>
                    <div className="row"></div>
                    <div className="row"></div>
                    <div className="row pink lighten-5" style={{padding:"0px 0px 10px 0px",borderRadius:"30px"}}>
                        <div className="center align">
                            <div className="col s3 ">
                                <h4>{this.props.localBMI}</h4>
                            </div>
                            <div className="col s1">
                                <h4>:</h4>
                            </div>
                            <div className={this.state.displayClass}>
                                <h4>{this.state.displayString}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="row">
                    <div className="col s12 blue lighten-5" style={{padding:"30px 50px 0px 50px",borderRadius:"10px",minHeight:"300px"}}>
                        {/* Measurement Units */}
                        <div className="switch col s12 right-align">
                            <label>
                            US
                            <input type="checkbox" onChange={this.onMeasurementPressed} checked={this.state.metric} />
                            <span className="lever"></span>
                            Metric
                            </label>
                        </div>
                        {/* Inputs */}
                        <div className="section">
                            <div className="col s12">
                                {
                                    // Toggle between the 2 measurements based on input
                                    this.state.metric ? <InputDataMetric logDate={new Date()} localEdit={true}/> : <InputDataUS logDate={new Date()} localEdit={true}/>
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        );
    }
}

Calculator.propTypes = {
    localBMI: PropTypes.number.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    localBMI: state.calculator.localBMI,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
)(Calculator);