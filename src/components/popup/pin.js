import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Popup from '../popup/modal.js';

class Pin extends Component{
    constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
    }

    openPopup(type){
        this.setState({poppedUp: true});
        this.setState({type: type});
    }

    closePopup(){
        this.setState({poppedUp: false});
        this.props.closePopup();
    }

    unpinFromBoard(){
        this.props.unpinFromBoard(this.props.user.username, this.props.pin.pinID);
        this.closePopup();
    }

    render() {
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                if(that.state.type ==="editPin"){
                    return(
                        <Popup type="editPin" pin={that.props.pin} closePopup={that.closePopup.bind(that)}/>
                    )
                }
                else{
                    return(
                        <Popup type="repin" pin={that.props.pin} closePopup={that.closePopup.bind(that)}/>
                    )
                }
            }
        }

        function checkIfPinned(){
            for(var i = 0; i < that.props.userPins.length; i++){
                if ( that.props.userPins[i].pinID === that.props.pin.pinID){
                    return true; 
                }
            }
            return false; 
        }

        return (
            <div>
            <div className="hoverContainer">
                <h1>{this.props.pin.name}</h1>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>

                <div className="overlay">
                    {this.props.pin.createdBy === this.props.user.username ? (
                        <div>
                            <button className="btn btn-default buttonHover" onClick={this.openPopup.bind(null, "editPin")}><span className="glyphicon glyphicon-pencil"></span></button>
                        </div>) 
                    :   <div>
                            {checkIfPinned() ? (
                                <button className="btn btn-danger" onClick={this.unpinFromBoard.bind(this)}>Unpin</button>)
                            : 
                                <button className="btn btn-danger"onClick={this.openPopup.bind(null, "repin")}>Pin</button>
                            }
                        </div>
                    }
                </div>

                <hr className="stylehr"/>
                <p className="pinDescription">{this.props.pin.description}</p>
                {getPopup()}
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        userPins: state.userPins
    }
}

export default connect(mapStateToProps, actions)(Pin);