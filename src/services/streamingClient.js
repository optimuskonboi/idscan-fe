import axios from 'axios'
const streamingClient = axios.create({
    baseURL: "http://42.96.40.237:10711/vinorsoft/streamingcamera/v1.0/",
    headers:{
        'content-type':'application/json',
        'authorization': `vinorsoft ${localStorage.getItem('token')}`
    },
})
streamingClient.interceptors.request.use(async (config) => {
    return config
})
streamingClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {

    throw error
})
export default streamingClient
