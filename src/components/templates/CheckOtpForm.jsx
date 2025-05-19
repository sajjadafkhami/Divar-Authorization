import PropTypes from "prop-types";
import { checkOtp } from "../../services/auth";

function CheckOtpForm({code, setCode, mobile, setStep}) {
   const submitHandler = async (event) => {
    event.preventDefault();
    
    if(code.length !== 5) return;

    const {response, error} = await checkOtp(mobile, code);
    if(response) console.log(mobile, code);
    if(error) console.log(error.response.data.message);
   }



  CheckOtpForm.propTypes = {
          setStep: PropTypes.func.isRequired,
          mobile: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          setCode: PropTypes.func.isRequired,
      };
  return (
    <form onSubmit={submitHandler}>
        <p>تایید کد پیامک شده</p>
        <span>
           کد پیامک شده به شماره{mobile}را وارد نمایید.
        </span>
        <br />
        <label htmlFor="input">کد پیامک شده را وارد کنید</label>
        <input
        type="text"
        id="input"
        placeholder=" کد پیامک شده"
        value={code}
        onChange={(event) => setCode(event.target.value)} />
        <button type="submit">ورود</button>
        <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  )
}

export default CheckOtpForm