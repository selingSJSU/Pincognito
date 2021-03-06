import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';

class CreatePin extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }

    createPin(e){
        e.preventDefault();

        if(this.refs.image.files[0] && this.refs.name.value && this.refs.description.value && this.refs.tags.value && this.refs.board.value !== "none"){
            if(this.refs.name.value.trim().length <= 18){
                var data = {
                    file: this.refs.image.files[0],
                    name: this.refs.name.value.trim(),
                    description: this.refs.description.value.trim(),
                    tags: this.refs.tags.value
                }

                this.props.createBoardPin(this.props.user.username, this.refs.board.value, data);
                this.props.closePopup();
            }else{
                this.setState({error: "Name cannot be more than 18 characters."});
            }
        }else{
            this.setState({error: "No fields can be empty."});
        }
    }

    render() {
        var newArray = [];
        for ( var i = 0; i < this.props.userBoards.length; i++) {
            if (this.props.userBoards[i].createdBy === this.props.user.username) {
                newArray = newArray.concat(this.props.userBoards[i]);
            }
        }
           
        return (
            <div>
                <h1>Create Pin</h1>
                <hr className="stylehr"/>
                {this.state.error ? (
                    <div className="alert alert-danger"><strong>Error! </strong>{this.state.error}</div>
                ):(
                    null
                )}
                <form className="createForm" onSubmit={this.createPin.bind(this)}>
                    <input type="file" accept="image/*" className="form-control-file" id="image" ref="image"/> <br />
                    <select className="form-control dropdown" ref="board" defaultValue="none">
                        <option value="none" disabled>--Select a Board--</option>
                        {newArray.map((board, index) => ( 
                            <option value={board.boardID} key={index}>{board.name}</option>
                        ))}
                    </select><br />
                    <input type="text" className="form-control" ref="name" placeholder="Pin name" /> <br />
                    <input type="text" className="form-control" ref="description" placeholder="Description"/> <br />
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)"/> <br />
                    <center><button type="submit" className="btn btn-danger">Create Pin</button></center>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userBoards: state.userBoards,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(CreatePin)