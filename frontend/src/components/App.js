import React, { useState, useEffect } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register"
import InfoTooltip from "./InfoTooltip"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import { api } from "../utils/api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";
import * as auth from"../utils/auth"

function App() {
  const history = useHistory();
  const [email, setEmail] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isLoggedIn, setLoggedIn ] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    about: "Loading...",
    avatar: "",
    currentUserId: "",
  });
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = React.useState({});

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt"); 
    const email = localStorage.getItem("email");
    if (email && jwt) {
      setEmail(email);
    }
  }, []);
  
  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/");
  //   }
  // }, [history, isLoggedIn]);

  // React.useEffect(() => {
  //   const jwt = localStorage.getItem('jwt'); // Берем токен из хранилища. Он самый актуальный
  //   Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)]) // Передаем в каждый метод
  //     .then(([user, cardsData]) => {
  //       setCurrentUser({
  //         name: user.name,
  //         about: user.about,
  //         avatar: user.avatar,
  //         currentUserId: user._id,
  //       });
  //       console.log(cardsData);
  //       setCards(cardsData.cards);
  //       handleTokenCheck();
  //     })
  //     .catch((err) => console.log(err));
  // }, []);


  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn){
      Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
      .then(([user, cardsData]) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          currentUserId: user._id,
        });

        setCards(cardsData);
      })
      .catch((err) => console.log(err));
    }    
  }, [isLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");    

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          email(res.data.email);

          setLoggedIn(true);
          history.push("/");
        })
        .catch((errorStatus) => {
          // handleTooltipPopup(true, "Недействительный токен JWT", true);

          localStorage.removeItem("token");
          setLoggedIn(false);

          history.push("/signin");
        });
    }
  }, []);




  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //лайк карточек
  function handleLikeCard(card) {
    const isLiked = card.likes.some(
      (liker) => liker._id === currentUser.currentUserId
    );
    api
      .toggleLike({ cardId: card._id, isSetLike: !isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточек
  function handleCardDelete(cardToDelete) {
    setCardToDelete(cardToDelete);

    api
      .deleteCard({ cardId: cardToDelete._id })
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardToDelete._id));
        setCardToDelete({});
      })
      .catch((err) => console.log(err));
  }

  //добавление места
  function handleAddPlaceSubmit({ description, url }) {
    api
      .addNewCard({ cardName: description, cardLink: url })
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoPopupOpen(false);
    setRegSuccess(false)
    setSelectedCard(null);
  }

  //обновление информации о пользователе
  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({
        newName: name,
        newAbout: about,
      })
      .then((user) => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // обновление аватара
  function handleUpdateAvatar({ url }) {
    api
      .changeAvatar({
        newAvatarLink: url,
      })
      .then((user) => {
        setCurrentUser({ ...currentUser, avatar: user.avatar });

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //проверка токена 
  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          localStorage.setItem("email", res.data.email)
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log(err);
        });
    }
  }

  //регистрация и открытие и закрытие инфо попапов
  const handleRegSubmit = (email, password) => {  
    auth
      .register(email, password)
      .then((res) => {
        setInfoPopupOpen(false);
        setRegSuccess(true);
        history.push('/');
      })
    .catch(err=>{
      seterrorMessage(err);
      setInfoPopupOpen(true);
      setRegSuccess(false);
      console.log(err)
  })
  }



  //вход и открытие закрытие попапов
  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("email", email);
        setLoggedIn(true);
        setEmail(email);
        history.push("/")
      })
      .catch((err)=>{
        if(err.status === 400) {
            console.log("400 - не передано одно из полей")
        }
        else if(err.status === 401) {
            console.log("401 - пользователь с email не найден ")
        }
        console.log("Error: 500")
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem("email");
    setLoggedIn(false);
    history.push("/signin")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <div className="root">
        <Header email={email} onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleLikeCard}
            onCardDelete={handleCardDelete}>
          </ProtectedRoute>
          <Route path="/signin">
            <Login onSubmit={handleLoginSubmit} />
          </Route>
          <Route path="/signup">
            <Register onSubmit={handleRegSubmit}/>
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
        
        <InfoTooltip
          isRegSuccess={isRegSuccess}
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          message={errorMessage}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          button="Да"
          popups="popup"
          idForm="askDeleteCard"
          name="delete"
          title="Вы уверены?"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
