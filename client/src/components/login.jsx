import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // React Router navigation

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include", // Include cookies (important for sessions!)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful!");
                navigate("/"); // Redirect manually
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Login request failed", error);
        }
    const onSubmit = (data) => {
        console.log("Form SubmiWtted:", data);
    };
}

    return (
        <div className="login-page">
            <section className="d-flex justify-content-center align-items-center vh-100">
                <div className="login-card card shadow-lg p-5 mb-4">
                    <h2 className="text-center text-white mb-4">Login to LocateMate</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control form-control-lg"
                                placeholder="Enter your username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="text-danger">{errors.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control form-control-lg"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-success btn-lg">Login</button>
                        </div>
                    </form>
                    <div className="text-center text-white mt-4">
                        <p>Don't have an account? <Link to="/register" className="text-primary">Register here</Link></p>
                        <p>Forgot Password? <Link to="/forgot-password" className="text-primary">Click Here</Link></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
