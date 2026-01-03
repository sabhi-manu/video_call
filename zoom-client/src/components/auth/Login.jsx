import { useForm } from "react-hook-form";
import "./auth.css";
import { Link } from "react-router";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>

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
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>

      <div className="auth-footer">
        Don’t have an account? <Link to="/auth/register">Register</Link>
      </div>
    </div>
  );
}
