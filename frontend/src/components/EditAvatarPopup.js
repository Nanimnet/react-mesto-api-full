import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(event){
        event.preventDefault();

        props.onUpdateAvatar({
            url: avatarRef.current.value,
        })
    }

    function handleFormClose(e) {
        props.onClose();

    }

    return(
        <PopupWithForm
          button="Сохранить"
          popups="popup"
          onClose={handleFormClose}
          isOpen={props.isOpen}
          onSubmit={handleSubmit}
          idForm="updateAvatar"
          name="avatar"
          title="Обновить аватар"
        >
          <input
            required
            type="url"
            className="popup__input popup-avatar__form-item popup-avatar__form-item_el_subheading"
            id="avatar-profile"
            name="avatar-profile"
            placeholder="Ссылка на картинку"
            ref={avatarRef}
          />
          <span id="avatar-profile-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;