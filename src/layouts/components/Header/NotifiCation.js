import classNames from "classnames/bind";
import styles from './Header.module.css';
import { Close } from "../../../components/Icons/Icons";
// import imageEmty from '../../../assets/images/Emty.png';
import { formatTimeHHMMSS } from "../../../utils";
import axiosClient from "../../../services/axiosClient";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDnez4HOd90YHrW7RnVZ0o3bXHRC8fvUt4",
    authDomain: "camai-81e9c.firebaseapp.com",
    projectId: "camai-81e9c",
    storageBucket: "camai-81e9c.appspot.com",
    messagingSenderId: "251462328323",
    appId: "1:251462328323:web:7e2e2de0f5692490d02e36",
    measurementId: "G-99JGMERB54"
    // apiKey: "AIzaSyCFsIb21ShC8_83U228GXLnC6J_jxlQCmQ",
    // authDomain: "test-pwa-2b7d1.firebaseapp.com",
    // projectId: "test-pwa-2b7d1",
    // storageBucket: "test-pwa-2b7d1.appspot.com",
    // messagingSenderId: "821299593363",
    // appId: "1:821299593363:web:b956101be6dc42aee50d66"
};

export const app = initializeApp(firebaseConfig);
const cx = classNames.bind(styles);

function Notification({ show, setShow, getCount }) {
    const [notificationData, setNotificationData] = useState()
    useEffect(() => {
        const messaging = getMessaging(initializeApp(firebaseConfig));
        getToken(messaging, { vapidKey: 'BFoFCkhKyj6e2m5J7DyfirY3wcQTyz1YfnGutY1NJ98gtUu5-CKV8--b9D1IXtlatu3P1845Qwn2MYQ39jHoL6s' }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                console.warn('token===', currentToken);
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    },[])
    const handleClose = () => {
        setShow()
    }
    const handleCheckNotification = (code) => {
        setShow()
        const deleteNotificationItem = async (codeItem) => {
            const res = await axiosClient.delete(`/notification/delete-remove-notification/?notification_code=${codeItem}`)
            return res;
        }
        deleteNotificationItem(code)
    }
    return (
        <div className={cx('modal-notification', !show && 'hide')}>
            <div className={cx('header-notification')}>
                <div className={cx('text')}>Thông báo</div>
                <span className={cx('close-btn')} onClick={handleClose}><Close /></span>
            </div>
            {notificationData && notificationData.length === 0 ?
                <div className={cx('empty')}><img src={"imageEmty"} alt={'empty'} /><p>Không có thông báo mới</p></div> :
                <div className={cx('body-notification')}>
                    {notificationData?.map((item) => {
                        return (
                            <div className={cx('item-notification', 'item-new')} key={item.CODE} onClick={e => handleCheckNotification(item.CODE)}>
                                <span className={cx('tick')}></span>
                                <div className={cx('time-notification')}>{formatTimeHHMMSS(item.TIME)}</div>
                                <div className={cx('header-item')}>{item.NAME}</div>
                                <div className={cx('title-item')}>{item.DETAIL}</div>
                            </div>
                        )
                    })}
                </div >}
        </div >
    )
}

export default Notification;