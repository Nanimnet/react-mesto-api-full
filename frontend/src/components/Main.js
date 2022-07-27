import React, { useState, useEffect } from 'react';

import Card from './Card'
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";


function Main(props) {
    const currentUserContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUserContext.avatar}
            alt="Аватар пользователя"
          />
          <button
            type="button"
            className="profile__avatar-change"
            aria-label="Кнопка редактирования аватара"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{currentUserContext.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
            ></button>
          </div>

          <p className="profile__description">{currentUserContext.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="cards">
        {props.cards.length > 0
          ? props.cards.map(function (item, index) {
              return (
                <Card
                  onCardClick={props.onCardClick}
                  item={item}
                  index={index}
                  key={index}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}

export default Main;


