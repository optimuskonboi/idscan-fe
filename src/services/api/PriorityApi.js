import axiosClient from "../axiosClient";

export const priority = {
    put:(url,data)=>{
        return axiosClient.put(`${url}?camera_code=${data.camera}&status_priority=${data.status_priority}`)
    }
}