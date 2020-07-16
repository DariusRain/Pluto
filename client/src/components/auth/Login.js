// COMPONENT

// Modules
import React, { useState } from "react";
import { Link, Redirect}  from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/modules/auth";
// Component
const Login = ({ login, loading, isAuthenticated }) => {
  // State with useState hook.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Event Handlers
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  // JSX
  return !loading ? (
    <section className="container card">
      <h1 className="large text-primary">
        {" "}
        <i className="fas fa-frog"></i> Login
      </h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          email
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
          <button className="btn-success p1">Submit</button>
        </div>
      </form>
      <p className="my-1">
        Dont have an account?{" "}
        <Link to="/register">
          <span className="hover">Register</span>
        </Link>
      </p>
    </section>
  ) : (
    <i class="fas fa-spinner"></i>
  );
};
const mapStateToProps = ({ auth }) => ({ loading: auth.loading, isAuthenticated: auth.isAuthenticated });
export default connect(mapStateToProps, { login })(Login);