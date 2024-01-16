import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { ResetIcon } from "../../components/Icons";
import BotAnswer from "./BotAnswer/BotAnswer";
import FormQuestion from "./FormQuestions/FormQuestion";
import styles from "./Chat.module.css";
import axiosClient from "../../services/axiosClient";
import { useParams } from "react-router-dom";
import Loader from "./BotAnswer/Loader";

const cx = classNames.bind(styles);
const Chat = () => {
  const params = useParams();
  const ref = React.useRef();
  const [chat, setChat] = useState();
  const [isSend, setIsSend] = useState(false);
  const [chats, setChats] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [id,setId] = useState()
  const onChangeChat = (data) => {
    setChat(data);
    setData(data);
  };
  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSendQuestion();
    }
  };
  const onSendQuestion = () => {
    setChats([
      ...chats,
      {
        content: chat,
        type: "user",
      },
    ]);
    setChat("");
    setIsSend(true);
  };
  useEffect(() => {
    async function getMessage() {
      try {
        const res = await axiosClient.get(
          `/message?id=${params.id}&page=1&limit=10000`
        );
        setChats(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (params.id) {
      getMessage();
    }
    else{
      setChats([])
    }
  }, [params.id]);
  useEffect(() => {
    async function getAnswer() {
      try {
        setLoading(true);
        let datas;
        if(!params.id && !id){
          const resConversation = await axiosClient.post("/conversation", {
            username: localStorage.getItem("username"),
            title: data,
          });
          datas = resConversation.data
          setId(resConversation.data)
        }
        const res = await axiosClient.post("/message", {
          content: data,
          conversationId: params.id ? params.id : id ? id : datas,
          type: 1,
        });
        setChats([
          ...chats,
          {
            type: 0,
            content: res.content,
          },
        ]);
        setLoading(false);
        setIsSend(false);
      } catch (error) {
        setChats([
          ...chats,
          {
            type: 0,
            content: "Not connect",
          },
        ]);
        setIsSend(false);
        setLoading(false);
      }
    }
    if (isSend) {
      getAnswer();
    }
  }, [isSend]);
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [chats, loading]);
  return (
    <div className={cx("main")}>
      <div className={cx("background")}></div>
      <div className={cx("container")}>
        <div className={cx("answer")}>
          {chats &&
            chats.length > 0 &&
            chats.map((item, index) => (
              <BotAnswer
                key={index}
                type={item.type === 0 ? "bot" : "user"}
                loading={item.type === 1 ? false : loading}
                content={item.content}
              />
            ))}
          {loading && <BotAnswer keyup type="bot" content={<Loader />} />}
          <div ref={ref} />
        </div>

        <div className={cx("question")}>
          <div className={cx("reset-text")}>
            <div className={cx("actions")}>
              <span className={cx("icon")}>
                <ResetIcon />
              </span>
              <button className={cx("btn")}>Tạo lại phản hồi</button>
            </div>
          </div>
          <FormQuestion
            send={onSendQuestion}
            value={chat}
            onChange={onChangeChat}
            keyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
