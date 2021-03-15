import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'; import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar, Button, TextField } from '@material-ui/core';
import userService from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { workoutService } from '../services/workoutService';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Day({ day, isAdmin, allClasses }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [isModalOpen, toggleModal] = useState(false)
    const [currEvent, setCurrEvent] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [currLine, setCurrLine] = useState('')
    const [lines, setLines] = useState(null)
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) => state.user.loggedInUser)


    const classes = useStyles();
    function getFormatedDate() {
        const date = new Date(day).toLocaleDateString()
        return date.substr(0, date.length - 5)
    }
    function getHoursStr(timestamp) {
        const str = new Date(timestamp).toLocaleTimeString();
        return str.substr(0, str.length - 3);
    }
    function checkIfToday() {
        const currDay = new Date(day)
        const today = new Date(Date.now())
        if (today.getDate() === currDay.getDate() && today.getMonth() === currDay.getMonth() && today.getFullYear() === currDay.getFullYear()) {
            return 'active-day';
        }
        return 'not-active-day'
    }
    function isEventOnCurrDay(startDate) {
        const currDay = new Date(day)
        const dates = [new Date(startDate).getDate(), currDay.getDate()]
        const months = [new Date(startDate).getMonth(), currDay.getMonth()]
        const years = [new Date(startDate).getFullYear(), currDay.getFullYear()]

        if (dates[0] === dates[1] && months[0] === months[1] && years[0] === years[1]) return true
        return false;
    }

    function openEventDetails(currEvent) {
        setCurrEvent(currEvent);
        setLines([...currEvent.details])
        toggleModal(true)
    }

    function getUserImgUrl(userId) {
        const imgUrl = userService.getImgById(userId)
        return imgUrl;
    }

    function joinCurrEvent() {
        setClicked(!clicked)
        const currTimestamp = new Date(Date.now()).getTime()
        const currEventTimestamp = new Date(currEvent.startDate).getTime()
        if (currEventTimestamp < currTimestamp) return;
        const user = workoutService.addUserToClass(currEvent._id, loggedInUser);
        dispatch({ type: 'SET_USER', user });

    }
    function exitCurrEvent(currEvent) {
        setClicked(!clicked)
        const { currSession, user } = workoutService.removeUserFromClass(currEvent._id, loggedInUser)
        dispatch({ type: 'SET_USER', user });
        setCurrEvent(currSession)
        setLines(null)

    }
    function isAlreadyOnSession() {
        if (currEvent.subscribedUsers.find(user => user._id === loggedInUser._id)) return true;
        return false;
    }
    function isSessionFull() {
        if (isAlreadyOnSession()) return false;
        if (currEvent.subscribedUsers.length === currEvent.maxUsers) return true;
        return false;

    }

    function isSessionOver() {
        const currTimestamp = new Date(Date.now()).getTime()
        const currEvTimestamp = new Date(currEvent.startDate).getTime()
        if(currTimestamp>currEvTimestamp) return true
        return false;

    }
    function addLine(ev) {
        ev.preventDefault()
        if (currLine.length < 1) return;
        setLines([...lines, currLine])
        setCurrLine('')

    }
    function handleNewLine(ev) {
        setCurrLine(ev.target.value)
    }
    function deleteCurrLine(lineIdx) {
        const newLines = [...lines]
        newLines.splice(lineIdx, 1)
        setLines([...newLines])
    }
    async function onSaveClass() {
        const updatedEvent = { ...currEvent }
        const eventToSave = await workoutService.saveClass(updatedEvent, loggedInUser, lines)
        setCurrEvent(eventToSave)
        toggleModal(false)

    }
    function handleChange(ev) {
        const { name, value } = ev.target
        const updatedEvent = { ...currEvent, [name]: value }
        setCurrEvent(updatedEvent)
    }
    function onDeleteClass() {
        workoutService.deleteClass(currEvent._id)
        toggleModal(false)

    }
    return (
        <div className="single-day">
            <div className={checkIfToday()}>
                <h4>{days[new Date(day).getDay()]}</h4>
                <h4>{getFormatedDate()}</h4>
            </div>

            <ul className="events-list">


                {allClasses.map(currClass => {
                    if (isEventOnCurrDay(currClass.startDate)) {
                        return <div key={currClass._id} className="single-event">
                            <h4 className="event-hours">

                                {getHoursStr(new Date(currClass.startDate).getTime())} - {getHoursStr(new Date(currClass.endDate).getTime())}
                            </h4>
                            <h5 onClick={() => openEventDetails(currClass)} className="event-title">
                                {currClass.title}
                                <span> {currClass.subscribedUsers.length} / {currClass.maxUsers}</span></h5>
                        </div>
                    } else return null

                })}
            </ul>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={() => toggleModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div className={`${classes.paper} modal-container`}>
                        {currEvent && <div className="curr-event-details">
                            {!isAdmin && <h2 className="event-title">{currEvent.title}</h2>}
                            {isAdmin &&
                                <TextField label="Title" placeholder="Enter New Title" defaultValue={currEvent.title} name="title" onChange={handleChange} />
                            }
                            <h5 className="event-hours">
                                {getHoursStr(new Date(currEvent.startDate).getTime())}-{getHoursStr(new Date(currEvent.endDate).getTime())}
                            </h5>
                            <h4>Session Details</h4>
                            {!isAdmin && <p className="location-subtitle">{currEvent.location}</p>}

                            {isAdmin && Boolean(lines) && lines.map((line, idx) => <div className="event-details-admin" key={idx}>
                                <div>{line}</div>
                                {lines && <Button onClick={() => deleteCurrLine(idx)} ><DeleteOutlineIcon /> </Button>}


                            </div>)}
                            {isAdmin &&
                                <TextField label="Location" className="w100" placeholder="Workout Location" defaultValue={currEvent.location} name="location" onChange={handleChange} />
                            }

                            {!isAdmin && currEvent.details.map((line, idx) => <p className="event-details" key={idx}>{line}</p>)}
                            {isAdmin && <div className="lines-control" >
                                <form onSubmit={(ev) => addLine(ev)}>
                                    <TextField value={currLine} label="Workout Details" placeholder="Enter new line" onChange={(txt) => handleNewLine(txt)} />
                                    <Button type="submit" onSubmit={(ev) => addLine(ev)} >Add  </Button>

                                </form>
                            </div>}
                            <div className="users-list">
                                {currEvent.subscribedUsers.map((user, idx) => <div key={idx} className="users-info">

                                    <Avatar key={user._id} alt={user.fullName} src={getUserImgUrl(user.id)}
                                        title={user.fullName} />
                                    <p>{user.fullName}</p>
                                </div>)}

                            </div>


                            {!isAdmin && <div className="join-class-btns">

                                {isAlreadyOnSession() && <Button onClick={() => exitCurrEvent(currEvent)} variant="contained" color="secondary">Exit Session</Button>}
                                {isSessionFull() && <Button variant="contained" color="primary" disabled>Session is Full</Button>}
                                {isSessionOver() && <Button variant="contained" color="primary" disabled>Session is Over</Button>}
                                {!isAlreadyOnSession() && !isSessionFull() && !isSessionOver() &&
                                    <Button onClick={() => joinCurrEvent()} variant="contained" color="primary">Join Now</Button>
                                }
                            </div >}
                            {isAdmin && <div className="admin-btns">
                                <Button onClick={() => onSaveClass()} variant="contained" >Save {'&'} Publish Class</Button>
                                <Button onClick={() => onDeleteClass()} variant="contained" color="secondary">
                                    Delete Class</Button>

                            </div>}

                        </div>}

                    </div>
                </Fade>
            </Modal>

        </div>
    )
}



