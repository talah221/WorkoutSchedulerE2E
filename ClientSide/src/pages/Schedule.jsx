import React, { Component } from 'react';
import { WeekSlider } from '../cmps/WeekSlider';

class Schedule extends Component {

    render() {

        return (
            <section>
                <div className="main-container schedule-container">
                    <WeekSlider isAdmin={false}  />
                </div>
            </section>
        );
    }
}

export default Schedule;