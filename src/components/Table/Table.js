import React from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.css";

const cx = classNames.bind(styles);
const Table = ({ colum = [], data = [], handleShow }) => {
  const handleClick = (id) => {
    if (handleShow) {
      handleShow(id);
    }
  };
  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          {colum.map((item, index) => {
            return <th key={index}>{item.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr onClick={()=>handleClick(item.id)} key={index}>
              {colum.map((cl, index) => {
                return <td key={index}>{item[cl.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
