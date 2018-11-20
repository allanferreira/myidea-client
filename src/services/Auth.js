import PubSub from 'pubsub-js'

export default class Auth {

    static login(user) {
        PubSub.publish('USER', user)
        localStorage.setItem('api_token', user.api_token)
    }

    static isLogged() {
        return localStorage.getItem('api_token')
    }

    static getUser() {
        return { api_token: localStorage.getItem('api_token') }
    }

    static logout() {
        PubSub.publish('USER', {})
        localStorage.removeItem('api_token')
    }

}