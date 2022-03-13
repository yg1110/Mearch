import axios, { AxiosInstance } from 'axios'

const URL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

class RestService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: URL,
      timeout: 100000,
      headers: {
        'Content-type': 'application/json',
        accept: '*/*',
      },
    })
  }

  getSearchProductInfoList = async (color:string[], type:string[]) => {
    const { data } = await this.api.post('/search', { color, type })
    console.log(data)
    return data
  }

  getCategorySearch = async (tag:string, value:string) => {
    const { data } = await this.api.post('/search/category', { tag, value })
    console.log(data)
    return data
  }

  getClothset = async () => {
    const { data } = await this.api.get('/clothset')
    console.log(data)
    return data
  }

  setClothset = async (top:string, bottom:string) => {
    const { data } = await this.api.post('/clothset', { top, bottom })
    console.log(data)
    return data
  }

  searchClothset = async (top:string, bottom:string) => {
    const { data } = await this.api.post('/clothset/search', { top, bottom })
    console.log(data)
    return data
  }
}

export default new RestService()
