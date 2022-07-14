import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const [name, setName] = React.useState("");
    const [description, setDescription ] = React.useState("");


    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, props.isOpen])


    function handleFormClose() {
        props.onClose();   
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        })
    }

    return (
        <PopupWithForm
          button="Сохранить"
          popups="popup"
          onClose={handleFormClose}
          isOpen={props.isOpen}
          onSubmit={handleSubmit}
          idForm="editForm"
          name="profile"
          title="Редактировать профиль"
        >
            <input 
              minLength="2"
              maxLength="40"
              required
              type="text"
              className="popup__input popup-profile__form-item popup-profile__form-item_el_heading"
              id="heading-profile"
              name="heading-profile"
              placeholder="Имя"
              value={name}
              onChange={handleNameChange}
            />
            <span id="heading-profile-error" className="error"></span>
            <input
              minLength="2"
              maxLength="200"
              required
              type="text"
              className="popup__input popup-profile__form-item popup-profile__form-item_el_subheading"
              id="subheading-profile"
              name="subheading-profile"
              placeholder="Описание"
              value={description}
              onChange={handleDescriptionChange}
            />
            <span id="subheading-profile-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;