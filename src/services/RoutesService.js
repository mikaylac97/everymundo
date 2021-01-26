import axios from 'axios'
const baseURL = 'https://everymundotechnical.herokuapp.com'
const service = axios.create({
    baseURL
})

const MUNDO_SERVICE = {
    popularRoutes() {
        return service.get('/popularRoutes/MC723567Da')
    }
}

export default MUNDO_SERVICE;