import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/AuthContext";

const Form = ({ isSignInUser }) => {
  const { signInWithEmail, signUpWithEmail } = useFirebaseAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const hadleSignup = (event) => {
    event.preventDefault();
    signUpWithEmail(formData);
  };

  const hadleSignIn = (event) => {
    event.preventDefault();
    signInWithEmail(formData);
  };

  return (
    <form onSubmit={isSignInUser ? hadleSignIn : hadleSignup} id="stripe-login">
      <div className="field padding-bottom--24">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      </div>
      <div className="field padding-bottom--24">
        <div className="grid--50-50">
          <label htmlFor="password">Password</label>
          {isSignInUser && (
            <div className="reset-pass">
              <a href="#">Forgot your password?</a>
            </div>
          )}
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
      </div>
      <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
        <label htmlFor="checkbox">
          <input type="checkbox" name="checkbox" /> Stay signed in for a week
        </label>
      </div>

      <div className="field padding-bottom--24">
        <input
          type="submit"
          value={isSignInUser ? "Login" : "Create Account"}
        />
      </div>
      <div className="field">
        <Link className="ssolink" to="/signupGoogle">
          Use single sign-on (Google) instead
        </Link>
      </div>
    </form>
  );
};

export default Form;
