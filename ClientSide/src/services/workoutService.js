import httpService from './httpService'

const BASE_URL = 'workout'
export const workoutService = {
    getById,
    removeUserFromClass,
    addUserToClass,
    saveClass,
    deleteClass,
    getAllClasses

}
const gClasses = [
    {
        "title": 'Metcon',
        "startDate": '2021-01-20T12:30:00.000Z',
        "endDate": '2021-01-20T14:30:00.000Z',
        "id": 1,
        "details": ['AMRAP 20 Minutes:', '15TTB', '10Pullups', '15Deadlift'],
        "subscribedUsers": [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        "maxUsers": 3,
        "location": 'Rishon LeZiyon'
    }, {
        'title': 'Personal Workout',
        "startDate": '2021-01-21T12:30:00.000Z',
        "endDate": '2021-01-21T14:30:00.000Z',
        'id': 4,
        'details': ['Personal Training With James ', '45Minutes Long', 'Calories burn'],
        'subscribedUsers': [{ id: 'u106', fullName: 'Tuvia', isAdmin: true }],
        'maxUsers': 3,
        'location': 'Rishon LeZiyon'
    }, {
        "title": 'Open GYM',
        "startDate": '2021-01-22T12:30:00.000Z',
        "endDate": '2021-01-22T18:30:00.000Z',
        "id": 2,
        "details": ['Open GYM', 'Workout alone'],
        "subscribedUsers": [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        "maxUsers": 20,
        "location": 'Zoom'

    }, {
        title: 'In 1 Week',
        "startDate": '2021-01-28T12:30:00.000Z',
        "endDate": '2021-01-28T16:30:00.000Z',
        id: _makeId(),
        details: ['Weightlifting'],
        subscribedUsers: [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        maxUsers: 23,
        location: 'Petah Tikwa'


    }, {
        title: 'In 1 Month',
        "startDate": '2021-02-25T12:30:00.000Z',
        "endDate": '2021-02-25T14:30:00.000Z',
        id: _makeId(),
        details: ['Weightlifting'],
        subscribedUsers: [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        maxUsers: 23,
        location: 'Petah Tikwa'


    }, {
        title: 'Weightlifting',
        "startDate": '2021-01-25T08:30:00.000Z',
        "endDate": '2021-01-25T09:30:00.000Z',
        id: _makeId(),
        details: ['Weightlifting'],
        subscribedUsers: [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        maxUsers: 23,
        location: 'Petah Tikwa'


    },
    {
        title: 'Past Workout',
        "startDate": '2021-01-16T12:30:00.000Z',
        "endDate": '2021-01-16T14:30:00.000Z',
        id: _makeId(),
        details: ['Weightlifting'],
        subscribedUsers: [{ id: 'u102', fullName: 'Mira', isAdmin: false }],
        maxUsers: 23,
        location: 'Petah Tikwa'


    },

]
window.gClasses = gClasses

async function getAllClasses() {
    try {
        // var workouts = await httpService.get(BASE_URL)
        return Promise.resolve(gClasses)
    }
    catch (err) {
        console.log(`Error getting classes from server: ${err}`)
    }
    return gClasses
}

async function getById(id) {
    try {
        // var workout = await httpService.get(`${BASE_URL}/${id}`);
        const workout = gClasses.find(currClass=>currClass.id===id)
        console.log('workout', workout);
        return workout
    } catch (err) {
        console.log(err);
    }

}





function removeUserFromClass(classId, user) {
    const classIdx = gClasses.findIndex(currClass => currClass.id === classId)
    const userIdx = gClasses[classIdx].subscribedUsers.findIndex(currUser => currUser.id === user.id)
    gClasses[classIdx].subscribedUsers.splice(userIdx, 1)
    const classTimestampIdx = user.allTimeClasses.findIndex(currClass => currClass === gClasses[classIdx].startDate.getTime())
    user.allTimeClasses.splice(classTimestampIdx, 1)
    const currSession = gClasses[classIdx]
    return { currSession, user };

}
function addUserToClass(eventId, user) {
    const eventToChangeIdx = gClasses.findIndex(currEvent => currEvent.id === eventId)
    gClasses[eventToChangeIdx].subscribedUsers.push({ id: user._id, fullName: user.username, isAdmin: false });
    user.allTimeClasses.push(gClasses[eventToChangeIdx].startDate.getTime())
    return user;

}
function deleteClass(classId) {
    const classIdx = gClasses.findIndex(currClass => currClass.id === classId)
    gClasses.splice(classIdx, 1)
}

function saveClass(classToSave, u, classDetails = []) {
    if (classToSave.id) { // Updating Existing Class
        classToSave.details = classDetails
        const classIdx = gClasses.findIndex(currClass => currClass.id === classToSave.id)
        gClasses.splice(classIdx, 1, classToSave)

    }
    else { // Creating new class
        
        classToSave.id = _makeId()
        classToSave.startDate = new Date(classToSave.startDate)
        classToSave.endDate = new Date(classToSave.endDate)
        classToSave.subscribedUsers = [{ fullName: u.username, id: u._id, isAdmin: true }]
        classToSave.details = classDetails
        gClasses.push(classToSave);

    }

    return classToSave;
}
function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


