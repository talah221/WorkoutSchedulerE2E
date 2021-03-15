import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewClass from '../cmps/NewClass';
import { WeekSlider } from '../cmps/WeekSlider';



class _ControlPanel extends Component {
    state = {
        something: false

    }

    reRender = () => {
        this.setState({ something: !this.state.something })
    }


    render() {
        return (
            <section className="main-container control-panel-container ">
                <NewClass reRenderFather={this.reRender}  />

                <div className="schedule-container">
                    <WeekSlider isAdmin={true} something={this.state.something} />
                </div>
            </section >
        );
    }
}



const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
    };
};
const mapDispatchToProps = {

};

export const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(_ControlPanel);
