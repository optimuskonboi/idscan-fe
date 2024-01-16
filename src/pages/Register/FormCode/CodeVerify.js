import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './FormCode.module.css';
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function CodeVerify({  onGetCode}) {
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [thirst, setThirst] = useState('')
    const [four, setFour] = useState('')
    const [five, setFive] = useState('')
    const [six, setSix] = useState('')
    const handeFirstChange = (e) => {
        setFirst(e.target.value)
        if(e.target.value){
            document.getElementById("2").focus()

        }
        
    }
    const handeSecondChange = (e) => {
        setSecond(e.target.value)
        if(e.target.value){
            document.getElementById("3").focus()

        }
        else{
            document.getElementById("1").focus()
        }
    }
    const handeThirstChange = (e) => {
        setThirst(e.target.value)
        if(e.target.value){
            document.getElementById("4").focus()

        }
        else{
             document.getElementById("2").focus()
        }
    }
    const handeFourChange = (e) => {
        setFour(e.target.value)
        console.log(e);
        if(e.target.value){
            document.getElementById("5").focus()

        }
        else{
             document.getElementById("3").focus()
        }
    }
    const handeFiveChange = (e) => {
        setFive(e.target.value)
        if(e.target.value){
            document.getElementById("6").focus()

        }
        else{
             document.getElementById("4").focus()
        }
    }
    const handeSixChange = (e) => {
        setSix(e.target.value)
        if(!e.target.value){
            document.getElementById("5").focus()

        }
    }

    useEffect(() => {
        onGetCode(first + second + thirst + four + five + six)
    }, [first, second, thirst, four, five, six])
    return (
        <div className={cx('input-small-group')}>
            <input onChange={handeFirstChange} id="1" value={first} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeSecondChange} id="2" value={second} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeThirstChange} id="3" value={thirst} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeFourChange} id="4" value={four} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeFiveChange} id="5" value={five} maxLength={1} placeholder={'-'} className={cx('input-small')} />
            <input onChange={handeSixChange} id = "6" value={six} maxLength={1} placeholder={'-'} className={cx('input-small')} />
        </div>
    )
}

CodeVerify.propTypes = {
    // onGetCode: PropTypes.func.isRequired,
    // error: PropTypes.bool.isRequired,
};
export default CodeVerify;