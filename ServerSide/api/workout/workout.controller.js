const logger = require('../../services/logger.service')
const workoutService = require('./workout.service')

// TODO: needs error handling! try, catch

async function getWorkouts(req, res) {
    try {
        const workouts = await workoutService.query(req.query)
        res.send(workouts)
    } catch (err) {
        logger.error('Cannot get workouts', err);
        res.status(500).send({ error: 'cannot get workouts' })

    }
}
async function getWorkout(req, res) {
    const workout = await workoutService.getById(req.params.id)
    res.send(workout)
}

async function deleteWorkout(req, res) {
    try {
        await workoutService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete Workout', err);
        res.status(500).send({ error: 'cannot delete Workout' })
    }
}

async function addWorkout(req, res) {
    var workout = req.body;
    workout.byUserId = req.session.user._id;
    workout = await workoutService.add(workout)
    res.send(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    deleteWorkout,
    addWorkout,
}