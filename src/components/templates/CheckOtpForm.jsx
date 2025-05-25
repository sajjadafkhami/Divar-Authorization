import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "../../services/auth";
import { getProfile } from "../../services/user";
import { setCookie } from "../../utils/cookie";

import styles from "./CheckOtpForm.module.css";



function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);
  

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);
    console.log({response, error})

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    } 

    if (error) console.log(error.response?.data?.message);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>
        کد پیامک شده به شماره {mobile} را وارد نمایید.
      </span>
      <br />
      <label htmlFor="otp-input">کد پیامک شده را وارد کنید</label>
      <input
        type="text"
        id="otp-input"
        placeholder="کد پیامک شده"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <button type="submit">ورود</button>
      <button type="button" onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

CheckOtpForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

export default CheckOtpForm;
