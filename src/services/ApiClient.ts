import axios from 'axios'
import Match from '../types/Match'

//TODO Change to real URL when available
const ROUTES = {
  GET_MATCHES: 'https://api.mockaroo.com/api/ea593b70?count=23&key=98d3ce00'
}

class ApiClient {
  async getMatches() {
    return await axios.get<Match[]>(ROUTES.GET_MATCHES).then(res => res.data)
  }
}

export default new ApiClient()
