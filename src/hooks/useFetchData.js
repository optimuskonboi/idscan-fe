import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";
import { Toast } from "../components";

const useFetchData = (path, params = {},error="") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [count,setCount] = useState(0)
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const {isRefresh,...rest} = params 
        const res = await axiosClient.get(path, {
          params: {
            ...rest,
          },
        });
        if(res){
          setData(res)
        }
        setLoading(false);
        if (res.count && params.size && pages) {
          setPages(Math.ceil(res.count / params.size));
        }
      } catch (e) {
        if(e.response.status === 403 && count < 1 && error){
          Toast.open(`Bạn không có quyền ${error}`,"danger")
          setCount(count+1)
        }
      }
    }
    getData();
  }, [
    path,
    params?.page,
    params?.isRefresh,
    params?.subject_name_group_camera,
    params?.camera_name,
  ]);
  return { data, loading, pages };
};
export default useFetchData;
