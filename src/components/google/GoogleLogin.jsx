import GoogleLogo from "../../assets/google-logo.png";
import { Link } from "react-router-dom";
import AnimationBg from "../AnimationBg";
import { useContext } from "react";
import { AuthContext } from "../../App";

const GoogleLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <>
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
                    Sign In with Your Google Account
                  </span>
                  {/* ----------- Google Provider Button --------------- */}
                  <button
                    onClick={() => signInWithGoogle()}
                    className="social-btn"
                  >
                    <img src={GoogleLogo} alt="Google Logo" />
                    <span>Sign In with Google</span>
                  </button>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Already have an account? <Link to="/login">Sign in</Link>
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
    </>
  );
};

export default GoogleLogin;
