import React, { useState, useContext } from "react";
import {useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { MessageIcon } from "../../../components/Icons";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import image from "../../../assets/images/LogoChatGPT.png";
import banner from "../../../assets/images/Baner.png";
import axiosClient from "../../../services/axiosClient";
import { nav } from "./nav";

import styles from "./Sidebar.module.css";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const Sidebar = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const handleLogout = (e)=>{
    localStorage.clear()
    navigate('/login')
    window.location.reload()
  }
  // useEffect(() => {
  //   async function getConversite() {
  //     try {
  //       const res = await axiosClient.get(
  //         `/conversation?username=${localStorage.getItem(
  //           "username"
  //         )}&limit=10000&page=1`
  //       );

  //       setData(res.data);
  //       console.log(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getConversite();
  // }, []);

  return (
    <div className={cx("content")}>
      <Menu>
        {nav.map((item, index) => {
          return (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              to={item.to}
              activeIcon={item.activeIcon}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default Sidebar;
