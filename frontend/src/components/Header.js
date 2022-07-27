import {Switch, Link, Route} from "react-router-dom";

function Header({email, onSignOut}) {
    return (
      <header className="header">
        <div className="header__logo"></div>
        <div className="header__container">
        <Switch>
          <Route exact path="/">
            <div className="header__links">
              <p className="header__email">{email}</p>
              <Link to="/signin" href="/" onClick={onSignOut} className="header__link_opacity">Выйти</Link>
            </div>
          </Route>
          <Route exact path="/signin">
            <Link to="/signup" className="header__link">Регистрация</Link>
          </Route>
          <Route exact path="/signup">
            <Link to="/signin" className="header__link">Войти</Link>
          </Route>
          </Switch>
        </div>
      </header>
    );
  }
  
  export default Header;