import axios, { AxiosInstance } from 'axios'

const URL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

class RestService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: URL,
      timeout: 1000,
      headers: {
        'Content-type': 'application/json',
        accept: '*/*',
      },
    })
  }

  // getProductInfoList = async () => {
  //   const { data } = await this.api.get('/')
  //   console.log(data)
  //   return data
  // }

  getSearchProductInfoList = async (color:string[], type:string[]) => {
    const { data } = await this.api.post('/search', { color, type })
    console.log(data)
    return data
  }

  getClothset = async (top:string, bottom:string) => {
    const { data } = await this.api.post('/clothset', { top, bottom })
    console.log(data)
    return data
  }

  getColorset = async () => {
    const { data } = await this.api.get('/colorset')
    console.log(data)
    return data
  }

  setClothset = async (top:string, bottom:string) => {
    const { data } = await this.api.post('/setClothset', { top, bottom })
    console.log(data)
    return data
  }

  getTagSearch = async (tag:string, value:string) => {
    const { data } = await this.api.post('/tagSearch', { tag, value })
    console.log(data)
    return data
  }
}

export default new RestService()
