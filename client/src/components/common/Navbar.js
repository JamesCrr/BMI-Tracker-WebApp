import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import M from "materialize-css/dist/js/materialize.min.js";

class NavBar extends Component {

    constructor(){
        super();
        this.navbarInstance = {};
    }

    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        this.navbarInstance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 200,
            preventScrolling: true
        });
    }

    mobileNavbarElementClicked = (event) => {
        this.navbarInstance.close();
    }

    logoutClicked = (event) => {
        event.preventDefault();
        this.navbarInstance.close();
        // Logout
        this.props.logoutUser();
    }

    render() {
        return(
            <div>
                <nav class="blue darken-3" style={{padding:"0px 10px"}}>
                <div class="nav-wrapper blue darken-3">
                    <Link to="/dashboard" class="brand-logo">
                        <i class="material-icons">track_changes</i>BMI-Track
                    </Link>

                    <a href="#" class="sidenav-trigger" data-target="mobile-nav">
                        <i class="material-icons">menu</i>
                    </a>

                    <ul class="right hide-on-med-and-down "  >
                        <li>
                            <Link to="/calculator" className="btn-flat waves-effect"
                            style={{fontSize:"1.3rem",color:"white",textTransform:"none"}}>
                                Calculator
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/graph" className="btn-flat waves-effect"
                            style={{fontSize:"1.3rem",color:"white",textTransform:"none"}}>
                                Tracker
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="btn-flat waves-effect"
                            onClick={this.logoutClicked}
                            style={{fontSize:"1.3rem",color:"white",textTransform:"none"}}>
                                Logout
                            </Link>
                        </li>
                     
                    </ul>
                </div>
                </nav>

                <ul class="sidenav " id="mobile-nav">
                    <li className="blue darken-3 center-align" style={{marginBottom:"5px",display:"block",height:"8vh"}}>
                        <i class="material-icons" style={{color:"white"}}>track_changes</i>
                    </li>
                    <li style={{display:"block"}}>
                        <Link to="/calculator" 
                        className="btn-flat"
                        style={{fontSize:"1.3rem",padding:"0",height:"100%",textTransform:"none"}}
                        onClick={this.mobileNavbarElementClicked}>
                            Calculator
                        </Link>
                    </li>
                    <li style={{display:"block"}}>
                        <Link to="/dashboard/graph" 
                        className="btn-flat"
                        style={{fontSize:"1.3rem",padding:"0",height:"100%",textTransform:"none"}}
                        onClick={this.mobileNavbarElementClicked}>
                            Tracker
                        </Link>
                    </li>
                    <li style={{display:"block"}}>
                        <Link to=""
                        className="btn-flat"
                        style={{fontSize:"1.3rem",padding:"0",height:"100%",textTransform:"none"}}
                        onClick={this.logoutClicked}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect(
    null,
    {logoutUser}
)(NavBar)