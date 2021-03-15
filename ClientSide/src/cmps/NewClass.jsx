import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import Fade from '@material-ui/core/Fade';
import { workoutService } from '../services/workoutService';
import { useDispatch, useSelector } from 'react-redux';
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
export default function NewClass({ reRenderFather }) {
    const classes = useStyles();
    const [isModalOpen, toggleModal] = useState(false)
    const [currClass, setCurrClass] = useState({ title: '', startDate: null, endDate: null, maxUsers: 20, location: '' })
    const [lines, setLines] = useState([])
    const [currLine, setCurrLine] = useState('')
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const dispatch = useDispatch()


    function createNewClass(ev) {
        ev.preventDefault();
        console.log("EV",ev)
        if (!currClass.title || !currClass.startDate || !currClass.endDate || !currClass.maxUsers) return;
        workoutService.saveClass(currClass, loggedInUser, lines)
        const user = {...loggedInUser,}
        user.allTimeClasses.push(currClass.startDate.getTime())
        dispatch({ type: 'SET_USER', user });
        setCurrClass({ title: '', startDate: null, endDate: null, maxUsers: 20 })
        setLines([])
        setCurrLine('')
        toggleModal(false)
        reRenderFather()
    }
    function handleChange(ev) {
        const { name, value } = ev.target
        setCurrClass({ ...currClass, [name]: value })
    }

    function deleteLine(idx) {
        const currLines = [...lines]
        currLines.splice(idx, 1)
        setLines(currLines)
    }
    function addLine(ev) {
        ev.preventDefault()
        if (!currLine) return;
        setLines([...lines, currLine])
        setCurrLine('')
    }

    return (
        <div className="modal-container">
            <div className="create-btn">

                <Button variant="outlined" color="primary" onClick={() => toggleModal(!isModalOpen)}>
                    Create New Class
            </Button>
            </div>
            <div>
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
                            {<div className="curr-event-details">
                                <form onSubmit={(ev) => createNewClass(ev)}>
                                    <h2 className="event-title">
                                        <TextField autoComplete="off" label="Title" variant="outlined" placeholder="Enter Class Title" name="title" onChange={handleChange} />

                                    </h2>
                                    <h5 className="event-hours flex">
                                        <label htmlFor="startDate">Starts At: </label>
                                        <input type="datetime-local" name="startDate" id="startDate" onChange={handleChange} />
                                        <label htmlFor="endDate">Ends At: </label>
                                        <input type="datetime-local" name="endDate" id="endDate" onChange={handleChange} />
                                    </h5>
                                    <div className="max-users">

                                        <TextField label="Max Users"  min={1} defaultValue={20} type="number" name="maxUsers" id="maxUsers" onChange={handleChange}/>
                                    </div>
                                    <div className="location">
                                        <TextField label="Location" placeholder="Enter Workout Location" onChange={handleChange} name="location" type="text"/> 
                                    </div>
                                    <div>
                                        <h4>Class Details: </h4>
                                        {lines.map((line, idx) => 
                                        <div className="event-details-admin" key={idx}>
                                            <p>{line}</p>
                                             <DeleteIcon onClick={() => deleteLine(idx)} />
                                        </div>)}
                                    </div>
                                    <input type="submit" id="create-class" hidden />

                                </form>
                                <form onSubmit={(ev) => addLine(ev)}>
                                    <label htmlFor="currLine">New Line: </label>
                                    <input autoComplete="off" value={currLine} placeholder="Press ENTER To Add" type="text" id="currLine"
                                        onChange={ev => setCurrLine(ev.target.value)} />
                                    <Button type="submit">Add</Button>
                                </form>


                                <Button variant="contained" color="primary" className="pointer">
                                    <label className="pointer" htmlFor="create-class" tabIndex="1">
                                        Submit
                                    </label>

                                </Button>

                            </div>}

                        </div>
                    </Fade>
                </Modal>

            </div>
        </div>
    )

}

