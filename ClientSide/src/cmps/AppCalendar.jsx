


import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    DayView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../services/dayEventsService.js'
const messages = {
    moreInformationLabel: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia adipisci id vel minima exercitationem, nobis dolor, reprehenderit iste dolore, distinctio quia? Perspiciatis laudantium facilis dolorum praesentium eius tempore in repellendus.',
};

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};


export default class AppCalendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: appointments,
            currentDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}`
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.commitChanges = this.commitChanges.bind(this);


    }
    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }
    render() {
        const { data, currentDate } = this.state;


        return (
            <Paper>
                <Scheduler data={data}>
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange} />
                    <EditingState onCommitChanges={this.commitChanges} />
                    <IntegratedEditing />
                    <DayView startDayHour={7} endDayHour={21} />
                    <Appointments  />
                    <AppointmentTooltip  />
                    <ConfirmationDialog />
                    <AppointmentForm  textEditorComponent={TextEditor} messages={messages} messages={messages}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                </Scheduler>
            </Paper>
        );
    }
}
