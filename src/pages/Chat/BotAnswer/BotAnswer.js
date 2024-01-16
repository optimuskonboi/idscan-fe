import React from "react";
import classNames from "classnames/bind";
import avatar from "../../../assets/images/AvatarBot.png";
import avatar2 from "../../../assets/images/Avatar2.png";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  EditIcon,
  VolumeIcon,
  LikeIcon,
  CopyTextIcon,
} from "../../../components/Icons";
import styles from "./Answer.module.css";

const cx = classNames.bind(styles);


const BotAnswer = ({ type = "bot", content, keyup }) => {
  const {speak} = useSpeechSynthesis()
  return (
    <div className={cx("content", type)}>
      <div className={cx("avatar")}>
        <img src={type === "bot" ? avatar : avatar2} alt="Avatar" />
      </div>
      <div
        style={{ background: type === "bot" ? "#ECF4FD" : "#F3F3F3" }}
        className={cx("answer")}
      >
        <div className={cx("answer-content")}>{ content}</div>
        {!keyup && (
          <div
            style={{
              justifyContent: type === "user" ? "flex-end" : "flex-start",
            }}
            className={cx("like")}
          >
            <span className={cx("list-icon")}>
              <LikeIcon />
              <span style={{cursor:"pointer"}} onClick={() => speak({ text: content })}>
                <VolumeIcon />
              </span>

              <CopyTextIcon />
            </span>
            {type === "bot" && <span className={cx("time")}>16:30 PM</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotAnswer;
