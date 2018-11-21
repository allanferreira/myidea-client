import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'http://142.93.158.20/api/',
  headers: {
    'Content-Type': 'application/json',
     Accept: 'application/json',
  }
})

export default {

  login({ email, password }) {
    return instance.post('login', { email, password })
  },

  register({ name, email, password }) {
    return instance.post('register', { name, email, password })
  },

  getPitches({ api_token }) {

    instance.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
    return instance
      .get('pitches')
      .then(res => res.data)

  },

  addPitch({ api_token, subject, text }) {

    instance.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
    return instance.post('pitches', { subject, text })

  },

  updatePitch({ api_token, id, subject, text }) {
    
    instance.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
    return instance.put(`pitches/${id}`, { subject, text })

  },

  getPitch({ api_token, pitch_id }) {

    instance.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
    return instance
      .get(`pitches/${pitch_id}`)
      .then(res => res.data)

  },

  destroyPitch({ api_token, pitch_id }) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
    return instance
      .delete(`pitches/${pitch_id}`)
      .then(res => res.data)

  },

}