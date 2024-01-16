import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './FormCode.module.css';
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function CodeVerify({  }) {
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [thirst, setThirst] = useState('')
    const [four, setFour] = useState('')
    const [five, setFive] = useState('')
    const [six, setSix] = useState('')

    const handeFirstChange = (e) => {
        setFirst(e.target.value)
    }
    const handeSecondChange = (e) => {
        setSecond(e.target.value)
    }
    const handeThirstChange = (e) => {
        setThirst(e.target.value)
    }
    const handeFourChange = (e) => {
        setFour(e.target.value)
    }
    const handeFiveChange = (e) => {
        setFive(e.target.value)
    }
    const handeSixChange = (e) => {
        setSix(e.target.value)
    }

    // useEffect(() => {
    //     onGetCode(first + second + thirst + four + five + six)
    // }, [first, second, thirst, four, five, six])
    return (
        <div className={cx('input-small-group')}>
            <input onChange={handeFirstChange} value={first} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeSecondChange} value={second} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeThirstChange} value={thirst} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeFourChange} value={four} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeFiveChange} value={five} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeSixChange} value={six} maxLength={1} placeholder={'-'} className={cx('input-small')} />
        </div>
    )
}

CodeVerify.propTypes = {
    onGetCode: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};
export default CodeVerify;