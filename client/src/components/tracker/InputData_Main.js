import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";
import {connect} from "react-redux";

import InputDataUS from "./InputData_US";
import InputDataMetric from "./InputData_Metric";

class InputData_Main extends Component {

    constructor(){
        super();

        this.state = {
            metric: true,
            customDate: new Date()
        }
    }

    onMeasurementPressed = () => {
        this.setState({
            metric: !this.state.metric
        })
    }

    onDatePickerChanged = (newDate) => {
        this.setState({
            customDate: newDate
        })
    }

    render() {
        return(
            <div className="col s12 blue lighten-5" style={{padding:"10px 0px",borderRadius:"10px",minHeight:"300px"}}>

                {/* DatePicker / Measurement Units */}
                <div className="switch col s12">
                    {/* DatePicker */}
                    <div className="col s6">
                        {
                            this.props.editingDate 
                            ? <div><label>New Date</label><DatePicker selected={this.state.customDate} onChange={this.onDatePickerChanged} maxDate={new Date()}/></div> 
                            : <div><label>Today's Date</label><DatePicker className="grey grey-text text-darken-4" selected={this.state.customDate} onChange={this.onDatePickerChanged} maxDate={new Date()} readOnly/></div> 
                        }
                    </div>
                    {/* Measurement Units */}
                    <div className="col s6 right-align">
                        <label>
                        US
                        <input type="checkbox" onChange={this.onMeasurementPressed} checked={this.state.metric} />
                        <span className="lever"></span>
                        Metric
                        </label>
                    </div>
                  
                </div>
                
                {/* Inputs */}
                <div className="section">
                    <div className="col s12">
                        {
                            // Toggle between the 2 measurements based on input
                            this.state.metric ? <InputDataMetric logDate={this.state.customDate} localEdit={false}/> : <InputDataUS logDate={this.state.customDate} localEdit={false}/>
                        }
                    </div>
                </div>
             
            </div>
        );
    }
}

InputData_Main.propTypes = {
    editingDate: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    editingDate: state.misc.editing
});


export default connect(
    mapStateToProps
)(InputData_Main);