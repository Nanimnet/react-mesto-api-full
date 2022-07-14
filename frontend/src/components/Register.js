import { useState } from "react";
import {Link} from "react-router-dom";


function Register ({onSubmit}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handlePasswordChande(e) {
        setPassword(e.target.value);
    }

    const handleEmailChande = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password)
    }

    return (
      <div className="authorization authorization__registration">
        <form 
            className="form registration-form" 
            name="registration"
            onSubmit={handleSubmit}>
          <h1 className="form__heading">Регистрация</h1>
          <input
            onChange={handleEmailChande}
            minLength="2"
            required
            type="email"
            className="form__input registration-form__form-item registration-form__form-item_el_heading"
            id="registration-email"
            name="registration-email"
            placeholder="E-mail"
            value={email}
          />
          <span id="email-error" className="error"></span>
          <input
            onChange={handlePasswordChande}
            required
            type="password"
            className="form__input registration-form__form-item registration-form__form-item_el_subheading"
            id="registration-password"
            name="registration-password"
            placeholder="Пароль"
            value={password}
          />
          <span id="password-error" className="error"></span>
          <button

            className="form__button registration-form__btn-submit"
            type="submit">
            Зарегистрироваться
          </button>
        </form>

        <p className="registration__text">
          Уже зарегистрированы? 
          <Link to="/signin" className="registration__span-link">Войти</Link>
        </p>
      </div>
    );
}

export default Register;