import httpService from './httpService'
const gUsers = [
    {
        "_id": "u1",
        "username": "Tal",
        "password": "1234",
        "activeClubs": [
            {
                "id": "c101",
                "expiration": 1611111111111,
                "isAdmin": true
            },
            {
                "id": "c102",
                "expiration": 1611111111112,
                "isAdmin": false
            },
            
        ],
        "imgUrl": "https://cdn2.iconfinder.com/data/icons/winter-sport-vol-1/512/8-01-256.png",
        "allTimeClasses": [
        ]
    },

]
window.gUsers = gUsers


export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getImgById,
}
function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login({ username, password }) {
    const user = gUsers.find(user => user.username === username && user.password === password)
    if (!user) return console.log('Wrong Password / Username');
    const userToReturn = { ...user }
    delete userToReturn.password
    return _handleLogin(userToReturn)
}
async function signup({ username, password, imgUrl }) {
    const newUser = {
        id: _makeId(),
        username,
        password,
        activeClubs: [],
        imgUrl,
        allTimeClasses: []
    }
    gUsers.push(newUser)
    const userToReturn = { ...newUser }
    delete userToReturn.password
    return _handleLogin(userToReturn)
}
async function logout() {
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function getImgById(userId) {
    const user = gUsers.find(user => user._id === userId);
    if (user) return user.imgUrl;
    return 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-256.png'
}

function _makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}