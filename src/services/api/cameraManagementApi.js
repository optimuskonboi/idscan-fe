import axiosClient from "../axiosClient";
import streamingClient from "../streamingClient";

export const cameraManagement = {
    update: (url, data, code) => {
        return axiosClient.put(`${url}?camera_code=${code}`, data)
    },
    startStreaming: (url, data) => {
        return streamingClient.post(url, data)
    },
    stopStreaming: (url, data) => {
        return streamingClient.post(url, data)
    },
    add: (url, data) => {
        return axiosClient.post(`${url}`, data)
    },
    delete: (code) => {
        return axiosClient.delete(`/cameraManagement/delete-remove-camera/?camera_code=${code}`)
    }

}