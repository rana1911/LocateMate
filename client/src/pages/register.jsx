import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import RegisterForm from "../components/register.jsx";
import '../components/styles/register.css';

const RegisterPage = () => {
    return (
        <>
            <Navbar /> 
            <section className="register-container">
                <RegisterForm />
            </section>
            <Footer /> 
        </>
    );
};

export default RegisterPage;
