import axios from 'axios'
const baseURL = 'https://everymundotechnical.herokuapp.com'
const service = axios.create({
    baseURL
})

const MUNDO_SERVICE = {
    popularRoutes() {
        return service.get('/popularRoutes/MC723567Da')
    },

    searchFlights(flightInfo) {
        // const infoToJson = JSON.stringify(flightInfo)
        // console.log(infoToJson)
        console.log(flightInfo)
        return service.post('/search/MC723567Da', {})
    }
}

export default MUNDO_SERVICE;