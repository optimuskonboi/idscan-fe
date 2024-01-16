import axiosClient from "../axiosClient";

export const role = {
    add:(data)=>{
        return axiosClient.post(`/permission/post-add-permission/`,data)
    },
    newRole:(data)=>{
        return axiosClient.post("/userType/post-add-userType/",data)
    },
    deleteRole:(id)=>{
        return axiosClient.delete( `/userType/delete-remove-userType/?user_type_code=${id}`)
    },
    addCameraUser :(data)=>{
        return axiosClient.post('/userCam/post-add-list-userCam/',data)
    }
}