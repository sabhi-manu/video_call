import { useForm } from "react-hook-form";
import "./auth.css";
import { Link } from "react-router";
import { useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext"



export default function Register() {
 const {RegisterHandler} = useContext(AuthContext)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    RegisterHandler(data)
    
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register("userName", { required: "Username is required" })}
            placeholder="Username"
            className={errors.userName ? "input-error" : ""}
          />
          {errors.userName && (
            <p className="error-text">{errors.userName.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && (
            <p className="error-text">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            
            })}
            placeholder="Password"
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/auth">Login</Link>
      </div>
    </div>
  );
}
