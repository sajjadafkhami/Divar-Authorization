import PropTypes from "prop-types";
import {sendOtp} from "../../services/auth";

import styles from "./CheckOtpForm.module.css";

function SendOtpForm({setStep, mobile, setMobile}) {
    const submitHandler = async(event) => {
        event.preventDefault();
        if(mobile.length !== 11) return;//validation

        const {response, error} = await sendOtp(mobile);
        if(response) setStep(2);
        if(error) console.log(error.response.data.message);
        console.log(response, error)
    }

    
  return (
    <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>
            برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید.کد تایید به این شماره پیامک خواهد شد.
        </span>
        <br />
        <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
        <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)} />
        <button type="submit">ارسال کد تایید</button>
    </form>
  )
}
SendOtpForm.propTypes = {
        setStep: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        setMobile: PropTypes.func.isRequired,
    };

export default SendOtpForm