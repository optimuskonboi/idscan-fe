import styles from "./Toast.module.css";
import classNames from "classnames/bind";
import { SizeOfElement } from "../../utils";


const cx = classNames.bind(styles)
const Toast = {
  async open(element,type) {
    //Tạo element chứa các notification
    let ele = document.getElementById("__notification");
    //Màu styles
    //Tạo một thẻ div
    let div = document.createElement("div");
    //Kiểm tra nếu đã có một thẻ div khác tồn tại
    if (ele.childNodes.length === 1) {
      if (!ele.childNodes[0].getAttribute("data-close"))
        //Thay đổi style của thẻ div cũ
        ele.childNodes[0].className = cx(
          "container", "open-notification", "open-notification-two"
        );
    }
    //Kiểm tra nếu đã có một thẻ div khác tồn tại
    if (ele.childNodes.length === 2) {
      if (!ele.childNodes[0].getAttribute("data-close")) {
        //Thay đổi style của thẻ div cũ
        ele.childNodes[0].className = cx(
          "container", "open-notification", "open-notification-three"
        );
      }
      if (!ele.childNodes[1].getAttribute("data-close")) {
        //Thay đổi style của thẻ div cũ
        ele.childNodes[1].className = cx(
          "container", "open-notification", "open-notification-two"
        );
      }
    }
    //Thêm style vào thẻ div mới
    div.className = cx(
      "container", "open-notification", "open-notification-one"
    );
    if(type==="success"){
      div.style.background = "green";
      div.style.color = "#ffffff";
    }
    if(type === "danger"){
      div.style.background = "#FF3300";
      div.style.color = "#ffffff";
    }
    //Zindex để nổi lên trên bề mặt
    div.style.zIndex = 100000000;
    //Thêm tring element vào thẻ div
    div.innerHTML = element;
    //Add sự kiện khi người dùng hover vào thẻ div
    div.onmouseenter = () => {
      //Delay remove thẻ div
      div.setAttribute("data-delay", "true");
    };
    div.onmouseleave = () => {
      //Tạo lại sự kiện xóa thẻ div
      div.setAttribute("data-delay", "false");
      div.setAttribute("data-close", "true");
      setTimeout(() => {
        if (div.getAttribute("data-delay") === "false") {
          let { elementBottom } = SizeOfElement(div);
          if (elementBottom === 160) {
            div.className = cx(
              "container", "close-notification", "close-notification-three"
            );
          } else if (elementBottom === 95) {
            div.className = cx(
              "container", "close-notification", "close-notification-two"
            );
          } else {
            div.className = cx(
              "container", "close-notification", "close-notification-one"
            );
          }
          div.setAttribute("data-close", "true");
        }
      }, 2000);

      setTimeout(() => {
        if (
          !div.getAttribute("data-delay") ||
          (div.getAttribute("data-delay") === "false" && ele.contains(div))
        )
          ele.removeChild(div);
      }, 3000);
    };
    //Thêm thẻ div vào element notification
    ele.appendChild(div);
    //Settimeout ẩn thẻ div đi dần
    setTimeout(() => {
      if (
        !div.getAttribute("data-delay") ||
        div.getAttribute("data-delay") === "false"
      ) {
        let { elementBottom } = SizeOfElement(div);
        if (elementBottom === 160) {
          div.className = cx(
            "container", "close-notification", "close-notification-three"
          );
        } else if (elementBottom === 95) {
          div.className = cx(
            "container", "close-notification", "close-notification-two"
          );
        } else {
          div.className = cx(
            "container", "close-notification", "close-notification-one"
          );
        }
        div.setAttribute("data-close", "true");
      }
    }, 3000);
    //Xóa thẻ div khỏi element notification
    setTimeout(() => {
      if (
        (!div.getAttribute("data-delay") ||
          div.getAttribute("data-delay") === "false") &&
        div.getAttribute("data-close") &&
        ele.contains(div)
      )
        ele.removeChild(div);
    }, 4000);
  },
  async tooltip() {},
};

export default Toast;
