import React, { Component } from "react";

import Graph from "./Graph";

import InputDataMain from "./InputData_Main";
import Misc from "./Misc";

class Tracker extends Component {

    render() {
        return(
            <div className="container">
                <div className="section"></div>
                <div className="row"></div>
                <div className="row">
                    <Graph />
                </div>
                
                <div className="row ">
                    <div className="col m6 s12">
                        <InputDataMain />
                    </div>
                    <div className="hide-on-med-and-up">
                        <span style={{padding:"100px"}}></span>
                    </div>
                    <div className="col m6 s12">
                        <Misc />
                    </div>
                </div>

                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
            </div>
        );
    }
}

export default Tracker;