import React, {Component} from "react";
import { Link } from "react-router-dom";

class Landing extends Component {  
    render() {
        return(
        <div className="container center-align">
            <div className="row" style={{marginTop:"10%",marginBottom:"15%"}}>
                <div className="col s12">
                    <h4 style={{ fontSize:"2.5rem" }}>
                        <b>BMI</b> Tracker
                    </h4>
                    <br />
                    <p className="flow-text grey-text text-darken-1">
                    A small MERN full-stack app <br /> with User Authentication to track BMI
                    </p>
                </div>
            </div>

            <div className="row"></div>
            <div className="row"></div>
            <div className="row">
                <div className="col s6">
                    <Link
                        to="/register"
                        style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Register
                    </Link>
                </div>
                <div className="col s6">
                    <Link
                        to="/login"
                        style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                        className="btn btn-large waves-effect hoverable blue accent-3">
                    Log In
                    </Link>
                </div>
            </div>
            
        </div>
        );
    }
}

export default Landing;