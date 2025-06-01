import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import './styles/register.css';  // Ensure your styles are being imported

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
            navigate('/');
            alert("Registration successful!");
            } else {
            alert(`Error: ${result.error}`);
            }
        } catch(e) {
            console.log("Request failed", error);
        }
      };

    return (
        <section className="register-container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-5 register-card mb-4">
                <h2 className="text-center text-white mb-4">Create Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-control form-control-lg" 
                            placeholder="Enter your full name" 
                            required
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="form-control form-control-lg" 
                            placeholder="Enter your username" 
                            required
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <span className="text-danger">{errors.username.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="form-control form-control-lg" 
                            placeholder="Enter your email" 
                            required
                            {...register("email", { 
                                required: "Email is required", 
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="form-control form-control-lg" 
                            placeholder="Create a password" 
                            required
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="d-grid">
                        <button disabled={isSubmitting} type="submit" className="btn btn-success btn-lg text-black">
                        {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
                <div className="text-center text-white mt-4">
                    <p>Already have an account? <Link to="/login" className="text-primary">Login here</Link></p>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
