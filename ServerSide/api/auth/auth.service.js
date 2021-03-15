const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {
    if (!username || !password) return Promise.reject('username and password are required!')
    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('NO MATCH - Invalid email or password')
    delete user.password;
    return user;
}

async function signup(username, password) {
    logger.debug(`auth.service - signup username: ${username}`)
    if (!password || !username) return Promise.reject('username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ password: hash, username })
}

module.exports = {
    signup,
    login,
}