import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterForm from "../components/RegisterForm";
import loginImage from "../assets/login_image.jpg";
import ProfilePicture from "../components/ProfilePicture";

function Register() {
  const navigate = useNavigate();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    const userInformations = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    if (!userInformations.firstname) {
      newErrors.firstname = "Le prénom est obligatoire";
    } else if (userInformations.firstname.length < 2) {
      newErrors.firstname = "Le prénom doit faire au moins 2 caractères";
    }
    if (!userInformations.lastname) {
      newErrors.lastname = "Le nom est obligatoire";
    } else if (userInformations.lastname.length < 2) {
      newErrors.lastname = "Le nom doit faire au moins 2 caractères";
    }
    if (!userInformations.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userInformations.password.length) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (userInformations.password.length < 8) {
      newErrors.password = "Le mot de passe doit faire au moins 8 caractères";
    }
    if (userInformations.password !== passwordConfirmRef.current.value) {
      newErrors.passwordConfirm = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Make a POST request to the server to register the user
      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);
      formData.append("firstname", firstnameRef.current.value);
      formData.append("lastname", lastnameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);

      await axios
        .post("http://localhost:5000/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center md:bg-blue-dianne md:py-0">
      <section className="h-max-full w-[80%] flex gap-2 md:gap-10 flex-col md:flex-row justify-center items-center">
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
          id="register"
          className="bg-white h-full md:w-1/3 flex flex-col md:gap-2 md:p-4 rounded-lg justify-evenly"
        >
          <h1 className="text-2xl font-bold text-center">Inscription</h1>
          <ProfilePicture
            avatar={avatar}
            setAvatar={setAvatar}
            avatarRef={avatarRef}
          />
          <RegisterForm
            firstnameRef={firstnameRef}
            lastnameRef={lastnameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            passwordConfirmRef={passwordConfirmRef}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </article>
      </section>
    </main>
  );
}

export default Register;
