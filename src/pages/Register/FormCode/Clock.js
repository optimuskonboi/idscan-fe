import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './FormCode.module.css';
import PropTypes from "prop-types";


const cx = classNames.bind(styles);

function Clock({ minutes, isReFresh }) {
    const [minute, setMinute] = useState(minutes - 1)
    const [second, setSecond] = useState(59)
    useEffect(() => {
        setMinute(minutes - 1)
        setSecond(59)
    }, [isReFresh])
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (second > 0 ) {
                setSecond(second - 1);
            }
            if (second === 0) {
                if (minute === 0) {
                    clearInterval(myInterval)
                    // getTimeOut(true)
                } else {
                    setMinute(minute - 1);
                    setSecond(59);
                    // getTimeOut(false)
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    })
    return (
        <p className={cx('count-time')}>Hiệu lực trong <span className={cx('time')}>{minute}:{second < 10 ? `0${second}`:second}</span></p>
    )
}

Clock.propTypes = {
    minutes: PropTypes.number.isRequired,
    getTimeOut: PropTypes.func,
    isReFresh: PropTypes.bool,
}

export default Clock;