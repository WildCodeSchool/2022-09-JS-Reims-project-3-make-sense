import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login_image.jpg";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-off.svg";

function Register() {
  const navigate = useNavigate();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const handleSubmit = () => {
    const userInformations = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users`, userInformations)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="w-screen  flex justify-center items-center h-screen md:bg-blue-dianne">
      <div className="w-[80%] h-[calc(100vh_-_64px)] rounded-lg flex justify-center items-center p-4">
        <section className="h-full w-full flex gap-10 flex-col md:flex-row">
          <article
            id="login_image"
            className="h-full md:w-1/2 pb-4 md:pb-0 hidden md:flex md:justify-center md:items-center"
          >
            <img
              src={loginImage}
              alt="Login"
              className="h-max-full w-auto rounded-2xl"
            />
          </article>
          <article
            id="login"
            className="bg-white h-full md:w-1/2 flex flex-col md:gap-2 md:p-4 rounded-lg justify-evenly"
          >
            <h1 className="text-2xl font-bold text-center">Inscription</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label htmlFor="fistname" className="font-bold">
                Prénom
              </label>
              <input
                type="fistname"
                name="fistname"
                id="fistname"
                className="border-2 border-black rounded-lg p-2"
                placeholder="John"
                ref={firstnameRef}
              />
              <label htmlFor="lastname" className="font-bold">
                Nom
              </label>
              <input
                type="lastname"
                name="lastname"
                id="lastname"
                className="border-2 border-black rounded-lg p-2"
                placeholder="Doe"
                ref={lastnameRef}
              />
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-black rounded-lg p-2"
                placeholder="johnDoe@email.com"
                ref={emailRef}
              />
              <label htmlFor="password" className="font-bold">
                Mot de passe
              </label>
              <div className="relative w-full">
                <input
                  type={isPasswordVisible.password ? "text" : "password"}
                  name="password"
                  id="password"
                  className="border-2 border-black rounded-lg p-2 w-full"
                  placeholder="********"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  className="absolute right-0 mr-2 focus:outline-none translate-y-1/2"
                  onClick={() =>
                    setIsPasswordVisible({
                      ...isPasswordVisible,
                      password: !isPasswordVisible.password,
                    })
                  }
                >
                  <img
                    src={isPasswordVisible.password ? eyeClosed : eyeOpen}
                    alt="eye"
                    className="w-6 h-6"
                  />
                </button>
              </div>
              <div className="relative w-full">
                <label htmlFor="passwordConfirm" className="font-bold">
                  Confirmer le mot de passe
                </label>
                <input
                  type={isPasswordVisible.passwordConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="border-2 border-black rounded-lg p-2 w-full"
                  placeholder="********"
                  ref={passwordConfirmRef}
                />
                <button
                  type="button"
                  className="absolute right-0 mr-2 focus:outline-none translate-y-1/2"
                  onClick={() =>
                    setIsPasswordVisible({
                      ...isPasswordVisible,
                      passwordConfirm: !isPasswordVisible.passwordConfirm,
                    })
                  }
                >
                  <img
                    src={
                      isPasswordVisible.passwordConfirm ? eyeClosed : eyeOpen
                    }
                    alt="eye"
                    className="w-6 h-6"
                  />
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-dianne text-white rounded-lg p-2"
              >
                S'inscrire
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Register;
