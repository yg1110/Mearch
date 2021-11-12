import axios from 'axios'

const URL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
export default axios.create({
  baseURL: URL,
  headers: {
    'Content-type': 'application/json',
    accept: '*/*',
  },
})
