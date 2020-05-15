import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    
    onLogoutClick = (event) => {
        event.preventDefault();
        // Call action
        this.props.logoutUser();
    };

    onGraphClick = (event) => {
        event.preventDefault();
        this.props.history.push("/dashboard/graph");
    }

    render() {
        const {user} = this.props.auth
        
        return(
            <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align ">
                <h4>
                    <b>Hi there,</b> {user.name.split(" ")[0]}
                    <p className="flow-text grey-text text-darken-1">
                        How's your exercise today?
                    </p>
                </h4>
                {/* <button
                style={{borderRadius: "30px",marginTop: "1rem"}}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Logout
                </button>

                <button
                style={{borderRadius: "30px",marginTop: "1rem",marginLeft: "1rem"}}
                onClick={this.onGraphClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Graph
                </button> */}
            </div>
            </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard)