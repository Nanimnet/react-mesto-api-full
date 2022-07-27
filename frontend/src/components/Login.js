import { useState } from "react";

function Login({onSubmit}) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(email, password)
    }

    function handleEmailChande(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChande(e) {
        setPassword(e.target.value);
    }

    return (
      <div className="authorization authorization__sign-in">
        <form 
            className="form registration-form" 
            name="registration" 
            onSubmit={handleSubmit}>
          <h1 className="form__heading">Вход</h1>
          <input
            autoComplete="on"
            onChange={handleEmailChande}
            minLength="2"
            maxLength="40"
            required
            type="email"
            className="form__input registration-form__form-item registration-form__form-item_el_heading"
            id="login-email"
            name="login-email"
            placeholder="E-mail"
            value={email}
          />
          <span id="email-error" className="error"></span>
          <input
            onChange={handlePasswordChande}
            required
            type="password"
            className="form__input registration-form__form-item registration-form__form-item_el_subheading"
            id="login-password"
            name="login-password"
            placeholder="Пароль"
            value={password}
          />
          <span id="password-error" className="error"></span>
          <button
            className="form__button registration-form__btn-submit"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    );
}

export default Login;