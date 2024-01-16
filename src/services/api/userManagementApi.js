import axiosClient from "../axiosClient";
export const userManagement = {
  add: () => { },
  update: () => { },
  delete: (id) => {
    return axiosClient.delete(
      `/userManagement/delete-remove-user/?user_code=${id}`
    )
  },
  unverify: (user) => {
    return axiosClient.delete(
      `/userManagement/delete-cancel-verify-user/?username=${user}`
    );
  },
  verify: (user) => {
    return axiosClient.put(`/userManagement/put-verify-user/?username=${user}`);
  },
};
