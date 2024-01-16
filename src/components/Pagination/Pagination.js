import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Previous, Next } from "../Icons/Icons";
import styles from "./Pagination.module.css";

const cx = classNames.bind(styles);
const Pagination = ({
  currentPage = 1,
  pages = 10,
  onClick,
  onNext,
  onPrevious,
  bgColor,
}) => {
  const [page, setPage] = useState();
  const handleClick = (value) => {
    onClick(value);
  };
  const handleNext = () => {
    if (currentPage < pages) {
      onNext();
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPrevious();
    }
  };
  useEffect(() => {
    const getPage = () => {
      let arr = [];
      for (let i = 1; i <= pages; i++) {
        if(i===1 || i ===pages){
          arr.push(i);
        }
        else if(currentPage<=3 && i<=4){
            arr.push(i)
        }
        else if(currentPage>pages-3 && i>pages-4){
          arr.push(i)
        }
        else if(i>=currentPage-1 && i<=currentPage+1){

          arr.push(i)
        }
      }
      setPage(arr);
    };
    getPage();
  }, [pages, currentPage]);
  return (
    <div className={cx("content")}>
      <span onClick={handlePrevious} className={cx("icon")}>
        {/* <Previous /> */}
      </span>
      {page &&
        page.map((item,index) => {
          if (item === 1) {
            return (
              <React.Fragment key={index}>
                <span
                  key={index}
                  onClick={(e) => handleClick(item)}
                  className={cx("page", item === currentPage ? "active" : "")}
                  style={{ background: bgColor, borderRadius: "50%" }}
                >
                  {item}
                </span>
                {currentPage>3 && <span>...</span>}
              </React.Fragment>
            );
          } else if (item === pages) {
            return (
              <React.Fragment key={index}>
                {currentPage<=pages-3 && <span>...</span>}
                <span
                  key={index}
                  onClick={(e) => handleClick(item)}
                  className={cx("page", item === currentPage ? "active" : "")}
                  style={{ background: bgColor, borderRadius: "50%" }}
                >
                  {item}
                </span>
              </React.Fragment>
            );
          } else {
            return (
              <span
                key={index}
                onClick={(e) => handleClick(item)}
                className={cx("page", item === currentPage ? "active" : "")}
                style={{ background: bgColor, borderRadius: "50%" }}
              >
                {item}
              </span>
            );
          }
        })}

      <span onClick={handleNext} className={cx("icon")}>
        {/* <Next /> */}
      </span>
    </div>
  );
};
Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  bgColor: PropTypes.any,
};
export default Pagination;
