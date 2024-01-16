import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";
import Footer from "../components/Footer/Footer";

const cx = classNames.bind(styles);
export const StateContext = React.createContext();
const Layout = ({ children }) => {
  const [isSmall, setIsSmall] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      window.location.reload()
    }
    else if( Date.now()-Number(sessionStorage.getItem("time"))>3000000){
      sessionStorage.clear()
      navigate("/login")
      window.location.reload()

    }
    else{
      const timeOut = setTimeout(()=>{
        sessionStorage.clear()
        navigate("/login")
      window.location.reload()

      },3000000-Date.now()+Number(sessionStorage.getItem("time"))) 
      return ()=>clearTimeout(timeOut) 
    }
    
  }, [navigate]);
  return (
    <StateContext.Provider value={{ isSmall, setIsSmall }}>
      <div className={cx("main")}>
        <Header />
        <div className={cx("container")}>
          {sessionStorage.getItem("role") === "ROLE_superadmin" && <Sidebar />}
          <div className={cx("content")}>
            <div className={cx("children")}>{children}</div>
            <div className={cx("footer")}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <div id="__notification"></div>
    </StateContext.Provider>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
