import React, { Component } from 'react'
import { connect } from 'react-redux';

class _MyClasses extends Component {
    state = {
        weekClasses: null,
        monthClasses: null,
        futureClasses: null
    }
    componentDidMount() {
        this.setClassesOnState()
    }
    setClassesOnState = () => {
        const { allTimeClasses } = this.props.loggedInUser
        allTimeClasses.sort((a, b) => a - b)
        const weekFromNow = new Date(Date.now()).getTime() + 1000 * 60 * 60 * 24 * 7
        const weekClasses = allTimeClasses.map(timestamp => timestamp < weekFromNow)
    }


    render() {
        return (
            <section className="main-container my-classes-container">
                <h1>This Week:</h1>
                <h1>This Month:</h1>
                <h1>Any Future Workouts:</h1>
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
    };
};
export const MyClasses = connect(mapStateToProps)(_MyClasses);
