import axiosClient from "../axiosClient";
export const groupCameraManagement = {
    add: (url,data)=>{
        return axiosClient.post(`${url}`,data)
    },
    delete:(id)=>{
        return axiosClient.delete(`/groupCamera/delete-remove-groupCamera/?group_camera_code=${id}`)
    },
    deleteCamera:(idCam,idGroup)=>{
        return axiosClient.delete(`/groupCam/delete-remove-groupCam/?camera_code=${idCam}&group_code=${idGroup}`)
    },
    update:(id,data)=>{
        return axiosClient.put(`/groupCamera/put-change-info-groupCamera/?group_camera_code=${id}`,data)
    }

}