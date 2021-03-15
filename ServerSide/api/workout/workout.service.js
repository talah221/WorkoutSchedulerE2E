
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    const criteria =  _buildCriteria(filterBy)
    const collection = await dbService.getCollection('workout')
    try {
        const workouts = await collection.find(criteria).toArray();
        return workouts
    } catch (err) {
        console.log('ERROR: cannot find workouts, Error:',err)
        throw err;
    }


}

async function remove(workoutId) {
    const collection = await dbService.getCollection('workout')
    try {
        await collection.deleteOne({ "_id": ObjectId(workoutId) })
    } catch (err) {
        console.log(`ERROR: cannot remove workout ${workoutId}`)
        throw err;
    }
}


async function add(workout) {
    workout.byUserId = ObjectId(workout.byUserId);

    const collection = await dbService.getCollection('workout')
    try {
        await collection.insertOne(workout);
        return workout;
    } catch (err) {
        console.log(`ERROR: cannot insert workout, err is: ${err}`)
        throw err;
    }
}



async function getById(workoutId) {
    const collection = await dbService.getCollection('workout')
    try {
        const workout = await collection.findOne({ "_id": ObjectId(workoutId) })
        return workout
    } catch (err) {
        console.log(`ERROR: while finding user ${workoutId}, err is: ${err}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}




module.exports = {
    query,
    remove,
    add,
    getById
}


