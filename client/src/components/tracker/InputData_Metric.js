import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { submitBMIData } from "../../actions/trackerActions";

class InputData_Metric extends Component {

    constructor(props){
        super(props);

        this.state = {
            height_cm: "",
            weight_kg: "",
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const convertedHeight = parseFloat(this.state.height_cm) * 0.01;
        const heightSquared = convertedHeight * convertedHeight;
        const final_bmi = (parseFloat(this.state.weight_kg) / heightSquared);
        const newBMI =  {
            owner: this.props.userid,
            bmi: +final_bmi.toFixed(2),
            date: new Date(this.props.logDate.getFullYear(),this.props.logDate.getMonth() , this.props.logDate.getDate())
        };
        // console.log("New Data Logged! ", newBMI);
        this.props.submitBMIData(newBMI);
        // reset inputs
        this.setState({
            height_cm: "",
            weight_kg: ""
        })
    };

    render() {
        return(
            <form class="col s12" onSubmit={this.onSubmit}>
            <div class="">
                <div class="input-field col s12">
                    <input onChange={this.onChange} value={this.state.height_cm} id="height_cm" type="number" min="0" max="500"/>
                    <label htmlFor="height_cm">Cm</label>
                </div>

                <div class="input-field col s12">
                    <input onChange={this.onChange} value={this.state.weight_kg} id="weight_kg" type="number" min="0" max="500"/>
                    <label htmlFor="weight_kg">Kg</label>
                </div>
                <div className="right-align">
                    <button
                    style={{
                        borderRadius: "30px",
                        zIndex: "0"
                    }}
                    type="submit"
                    className="btn waves-effect hoverable blue accent-3"
                    >
                    Log
                    </button>
                </div>
             
            </div>
           
            </form>
        );
    }
}


InputData_Metric.propTypes = {
    submitBMIData: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({
    userid: state.auth.user.id
});

export default connect(
    mapStateToProps,
    {submitBMIData}
)(InputData_Metric);