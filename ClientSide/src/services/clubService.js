import { storageService } from './storageService.js'

export const clubService = {
    save,
    getById,
    removeUserFromClass,
    addUserToClass,
    deleteClassFromClub,
    saveClass
}
const gClubs = [
    {
        "_id": "c101",
        "title": "Crossfit Bat Yam",
        "subtitle": "Crossfit",
        "imageUrl": "https://cdn1.iconfinder.com/data/icons/sport-collection/100/Sport-002-256.png",
        "admins": [
            "u2"
        ],
        "allClasses": [
            {
                title: 'Metcon',
                startDate: new Date(2021, 11, 7, 13, 30),
                endDate: new Date(2021, 11, 7, 14, 0),
                id: 1,
                details: ['AMRAP 20 Minutes:', '15TTB', '10Pullups', '15Deadlift'],
                subscribedUsers: [{ id: 'u102', fullName: 'Mira' }, { id: 'u1', fullName: 'Tal' }],
                maxUsers: 3,
            }, {
                title: 'Personal Workout',
                startDate: new Date(2020, 11, 7, 14, 30),
                endDate: new Date(2020, 11, 7, 15, 0),
                id: 4,
                details: ['Personal Training With James Harta', '45Minutes Long', 'Calories burn'],
                subscribedUsers: [{ id: 'u104', fullName: 'Riki' }, { id: 'u105', fullName: 'Yamit' }, { id: 'u106', fullName: 'Tuvia' }],
                maxUsers: 3
            }, {
                title: 'Open GYM',
                startDate: new Date(2020, 11, 7, 12, 30),
                endDate: new Date(2020, 11, 7, 21, 0),
                id: 2,
                details: ['Open GYM', 'Workout alone'],
                subscribedUsers: [{ id: 'u102', fullName: 'Mira' }, { id: 'u103', fullName: 'Tal' }],
                maxUsers: 20

            },
            {
                title: 'Weightlifting',
                startDate: new Date(2020, 11, 7, 6, 0),
                endDate: new Date(2020, 11, 7, 7, 30),
                id: 3,
                details: ['Weightlifting'],
                subscribedUsers: [{ id: 'u102', fullName: 'Mira' }, { id: 'u103', fullName: 'Tal' }],
                maxUsers: 23


            }
        ]
    },
    {
        "_id": "c102",
        "title": "Fitness Studio Bat Yam",
        "subtitle": "Studio",
        "imageUrl": "https://cdn1.iconfinder.com/data/icons/sport-collection/100/Sport-002-256.png",
        "admins": [
            "u2"
        ],
        "allClasses": [{
            title: 'Yoga',
            startDate: new Date(2020, 11, 7, 8, 30),
            endDate: new Date(2020, 11, 7, 9, 30),
            id: 5,
            details: ['Yoga Session with Sigalit the trainer'],
            subscribedUsers: [{ id: 'u102', fullName: 'Mira' }, { id: 'u2', fullName: 'Miki Geva' }],
            maxUsers: 3

        },]
    }
]
const STORAGE_KEY = 'clubs'


function getById(id) {
    const club = gClubs.find(club => club._id === id)
    return Promise.resolve(club)
}
function save(clubToSave) {
    console.log("::",clubToSave)
    if (clubToSave._id) { /**Club already exist - find and replace. */
        const idx = gClubs.findIndex(club => club._id === clubToSave._id)
        gClubs.splice(idx, 1, clubToSave)

    } else {  /**club doesnt exist - make one and save. */
        clubToSave._id = _makeId()
        gClubs.push(clubToSave)
    }
    storageService.saveToStorage(STORAGE_KEY, gClubs)
    return Promise.resolve(clubToSave);
}
function removeUserFromClass(clubId, eventId, user) {
    const clubIdx = gClubs.findIndex(club => club._id === clubId)
    const classIdx = gClubs[clubIdx].allClasses.findIndex(currEvent => currEvent.id === eventId)
    const userIdx = gClubs[clubIdx].allClasses[classIdx].subscribedUsers.findIndex(currUser => currUser.id === user.id)
    gClubs[clubIdx].allClasses[classIdx].subscribedUsers.splice(userIdx, 1)
    const classTimestampIdx = user.allTimeClasses.findIndex(currClass => currClass === gClubs[clubIdx].allClasses[classIdx].startDate.getTime())
    user.allTimeClasses.splice(classTimestampIdx, 1)
    const currSession = gClubs[clubIdx].allClasses[classIdx]
    return { currSession, user };

}
function addUserToClass(clubId, eventId, user) {
    const clubIdx = gClubs.findIndex(club => club._id === clubId)
    const eventToChangeIdx = gClubs[clubIdx].allClasses.findIndex(currEvent => currEvent.id === eventId)
    gClubs[clubIdx].allClasses[eventToChangeIdx].subscribedUsers.push({ id: user._id, fullName: user.username });
    user.allTimeClasses.push(gClubs[clubIdx].allClasses[eventToChangeIdx].startDate.getTime())
    return user;

}
function deleteClassFromClub(clubId, classId) {
    const clubIdx = gClubs.findIndex(currClub => clubId === currClub._id)
    const classIdx = gClubs[clubIdx].allClasses.findIndex(currClass => currClass.id === classId)
    gClubs[clubIdx].allClasses.splice(classIdx, 1)
}

function saveClass(clubId, classToSave, classDetails) {
    const clubIdx = gClubs.findIndex(club => club._id === clubId)
    if (classToSave.id) {
        const classIdx = gClubs[clubIdx].allClasses.findIndex(currClass => currClass.id === classToSave.id)
        gClubs[clubIdx].allClasses.splice(classIdx, 1, classToSave)
    }
    else {
        classToSave.id = _makeId()
        classToSave.startDate = new Date(classToSave.startDate)
        classToSave.endDate = new Date(classToSave.endDate)
        classToSave.subscribedUsers = []
        classToSave.details = classDetails
        gClubs[clubIdx].allClasses.push(classToSave);

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

// function _findIndexes(clubId, classId) {
//     const clubIdx = gClubs.findIndex(club => club._id === clubId)
//     const classIdx = gClubs[clubIdx].allClasses.findIndex(currClass => currClass.id === classId)
//     return gClubs[clubIdx].allClasses[classIdx]
// }
