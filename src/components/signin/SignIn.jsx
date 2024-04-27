import { Link } from "react-router-dom";
import Form from "../Form";
import AnimationBg from "../AnimationBg";

const SignIn = () => {
  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <AnimationBg />
        <div
          className="box-root padding-top--24 flex-flex flex-direction--column"
          style={{ flexGrow: 1, zIndex: 9 }}
        >
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1>Firebase Auth App</h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">
                  Sign In to your account
                </span>
                <Form isSignInUser={true} />
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <span>
                Do not have an account? <Link to="/register">Sign Up</Link>
              </span>
              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                <span>
                  <a href="#">© MinKhant</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
