const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addWorkout,deleteWorkout,getWorkouts, getWorkout} = require('./workout.controller')
const router = express.Router()

router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/',  requireAuth, addWorkout)
router.delete('/:id',  requireAuth, deleteWorkout)

module.exports = router