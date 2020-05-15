import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleEditOrLog, deleleUserLogs } from "../../actions/miscActions";

class Misc extends Component {

    constructor(){
        super();

        this.state = {
            editDateBool: false,
        }
    }

    toggleEditDateBool = () =>{
        this.setState({
            editDateBool: !this.state.editDateBool
        });
    }

    clearBMIData = () => {
        const userObj = {
            id: this.props.userid
        }
        this.props.deleleUserLogs(userObj);
    }

    componentDidUpdate(prevProps, prevState){
        // Check when state updates
        if (this.state.editDateBool !== prevState.editDateBool) {
            // Inform Redux State to change bool
            this.props.toggleEditOrLog(this.state.editDateBool);
        }
    }

    render() {
        return(
            <div className="col s12 pink lighten-5 center-align" style={{padding:"10px 0px",borderRadius:"10px",minHeight:"300px"}}>  
                
                {/* Edit Other Date */}
                <form action="#">
                    <p>
                    <label>
                        <input id="editDate" type="checkbox" class="filled-in" onChange={this.toggleEditDateBool} checked={this.state.editDateBool} />
                        <span htmlFor="editDate">Edit Previous Dates?</span>
                    </label>
                    </p>
                </form>

                <div style={{marginTop:"220px"}} className="">
                    <button
                    style={{ borderRadius: "30px" }}
                    type="submit"
                    onClick={this.clearBMIData}
                    className="btn waves-effect hoverable red accent-3"
                    >
                    Clear All
                    </button>
                </div>
              
            </div>
        );
    }
}

Misc.propTypes = {
	toggleEditOrLog: PropTypes.func.isRequired,
    deleleUserLogs: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({
    userid: state.auth.user.id
});

export default connect(
    mapStateToProps,
    {toggleEditOrLog, deleleUserLogs}
)(Misc);