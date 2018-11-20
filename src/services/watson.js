import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://gateway.watsonplatform.net/',
  headers: {
    'Authorization': 'Basic YXBpa2V5OnU3VWZickJuSDI0ZGdEMTljQm5hXzZaeVZyUEFuTnVUUHFRUTFSUnFoU0xL',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export default {

  analyser({ text }) {
    return instance.post('tone-analyzer/api/v3/tone?version=2017-09-21', { text })
  },

}