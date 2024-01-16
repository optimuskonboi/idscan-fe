import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Menu.module.css";

const cx = classNames.bind(styles);
const MenuItem = ({  icon, to,title,activeIcon }) => {
  return (
    <NavLink
      className={(nav) => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      <span className={cx("active-icon")}>{activeIcon}</span>
      <span className={cx("icon")}>{icon}</span>
      <span className={cx("title")}>{title}</span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node.isRequired,

};
export default MenuItem;
