import React, { Component } from 'react';

export default class Modal extends Component {

    render() {
        return <div className="event">
            {this.props.children}
        </div>;
    }

}

export class Welcome extends Component  {
    state = {name: ''};

    render() {
        return <Modal>
            <h3>
                welcome to horse simulator
                what is your horse name
            </h3>
            <input type="text" onChange={e => {
                this.setState({name: e.target.value});
            }}/>
            <button onClick={() => {
                alert(this.state.name);
            }}>this is my name</button>
        </Modal>;
    }
};
