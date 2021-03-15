import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import Day from './Day';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EventIcon from '@material-ui/icons/Event';
import { connect } from 'react-redux';
import Loading from './Loading.jsx';
import { workoutService } from '../services/workoutService';
class _WeekSlider extends Component {
    state = {
        todayTimestamp: null,
        currWeekTimestamp: [],
        allClasses: []
    }
    componentDidMount() {
        this.getFirstSunday()
        this.setDayEventsOnState()
    }

    setDayEventsOnState = async () => {
        let allClasses = await workoutService.getAllClasses()
        allClasses.sort((a, b) => a.startDate - b.startDate)
        this.setState({ allClasses })
    }

    getFirstSunday = async () => {
        const nowTimestamp = new Date();
        const todayMidnightTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth(), nowTimestamp.getDate()).getTime()
        await this.setState({ todayTimestamp: todayMidnightTimestamp })
        this.setWeekTimestamp()

    }
    setWeekTimestamp = (todayTimestamp = this.state.todayTimestamp) => {
        let currWeekTimestamp = [todayTimestamp]
        for (let i = 0; i < 7; i++) {
            currWeekTimestamp.push(currWeekTimestamp[i] + 1000 * 60 * 60 * 24)
        }
        this.setState({ currWeekTimestamp })
    }

    toggleWeek = async (diff) => {
        const nextSevenDays = this.state.todayTimestamp + 1000 * 60 * 60 * 24 * 7
        const prevSevenDays = this.state.todayTimestamp - 1000 * 60 * 60 * 24 * 7
        if (diff === 'next') {
            await this.setState({ todayTimestamp: nextSevenDays })
            return this.setWeekTimestamp()
        }
        else if (diff === 'prev') {
            await this.setState({ todayTimestamp: prevSevenDays })
            return this.setWeekTimestamp()
        }
        else {
            await this.setState({ todayTimestamp: Date.now() })
            return this.setWeekTimestamp()
        }
    }

    render() {
        const { currWeekTimestamp, allClasses } = this.state
        const { isAdmin } = this.props // Relevant for control panel
        if (!allClasses.length) return <Loading />
        return (
            <section className="week-container">
                <div className="toggle-weeks-btns">
                    <Button variant="contained" onClick={() => this.toggleWeek('prev')} ><NavigateBeforeIcon /> Previous Week</Button>
                    <Button variant="contained" onClick={() => this.toggleWeek('today')} >Today <EventIcon /></Button>
                    <Button variant="contained" onClick={() => this.toggleWeek('next')} >Next Week <NavigateNextIcon /></Button>
                </div>
                <div className="days-container">
                    {currWeekTimestamp.map((day, idx) => <Day day={day} key={idx} isAdmin={isAdmin} allClasses={allClasses} />)}
                </div>

            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
    };
};


export const WeekSlider = connect(mapStateToProps)(_WeekSlider);
