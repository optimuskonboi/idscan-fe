import React from "react";
import classNames from "classnames/bind";
import styles from "./Popup.module.css";
import { HeaderModal, Toast } from "../../../components";
import { isValidatorCCCD } from "../../../utils";
import { useState } from "react";

const cx = classNames.bind(styles);
const FormEnterCCCD = ({ onClose, handleSetId, onGetInfo }) => {
  const [text, setText] = useState("");
  const [retype, setRetype] = useState("");
  const ref = React.useRef();
  const inputRef = React.useRef();
  const [error, setError] = useState();
  const onChanges = (e) => {
    if (error) {
      setError("");
    }
    setText(e.target.value);
  };
  const handleAdd = () => {
    if (isValidatorCCCD(text) && text.trim() === retype.trim()) {
      onGetInfo(text);
    } else {
      setError("Vui lòng kiểm tra lại số căn cước công dân");
      inputRef.current.focus();
    }
  };
  React.useEffect(() => {
    const handleClickOutSide = (e) => {
      if (e.target === ref.current) {
        onClose();
      }
      console.log("a");
    };
    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.addEventListener("click", handleClickOutSide);
    };
  }, []);
  const preventCopyPaste = (e) => {
    e.preventDefault();
    Toast.open("Vui lòng nhập số căn cước công dân từ bàn phím");
  };
  return (
    <div ref={ref} className={cx("container")}>
      <div className={cx("content-form")}>
        <HeaderModal
          title={"Vui lòng nhập số căn cước công dân"}
          onClose={onClose}
        />
        <div className={cx("form-input")}>
          <label className={cx("label")}>Nhập số căn cước công dân</label>
          <input
            ref={inputRef}
            onChange={onChanges}
            onCopy={(e) => preventCopyPaste(e)}
            onPaste={(e) => preventCopyPaste(e)}
            onCut={(e) => preventCopyPaste(e)}
            className={cx(
              "form-control",
              text && !isValidatorCCCD(text) ? "input-error" : ""
            )}
            placeholder="Nhập số căn cước công dân"
          />
          {text && !isValidatorCCCD(text) ? (
            <span className={cx("error")}>
              {error ? error : " Vui lòng nhập đúng số căn cước công dân"}
            </span>
          ) : (
            <span className={cx("error")}> {error ? error : " "}</span>
          )}

          <label className={cx("label")}>Nhập lại số căn cước công dân</label>
          <input
            onChange={(e) => {
              if (error) {
                setError("");
              }
              setRetype(e.target.value);
            }}
            onCopy={(e) => preventCopyPaste(e)}
            onPaste={(e) => preventCopyPaste(e)}
            onCut={(e) => preventCopyPaste(e)}
            className={cx(
              "form-control",
              retype && !isValidatorCCCD(retype) ? "input-error" : ""
            )}
            placeholder="Nhập số căn cước công dân"
          />
          {retype && !isValidatorCCCD(retype) ? (
            <span className={cx("error")}>
              Vui lòng nhập đúng số căn cước công dân
            </span>
          ) : (
            <span className={cx("error")}>{error ? error : " "}</span>
          )}
        </div>

        <div className={cx("action")}>
          <button onClick={handleAdd} className={cx("btn", "clear")}>
            Quét
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEnterCCCD;
