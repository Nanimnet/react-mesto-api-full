import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const newNameCardRef = React.useRef();
    const newLinkCardRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({
            description: newNameCardRef.current.value,
            url: newLinkCardRef.current.value,
        })
    }

    function handleFormClose() {
        props.onClose()
    }


    return(
        <PopupWithForm
          button="Создать"
          popups="popup"
          onClose={handleFormClose}
          isOpen={props.isOpen}
          onSubmit={handleSubmit}
          idForm="editMesto"
          name="add"
          title="Новое место"
        >
            <input
              minLength="2"
              maxLength="30"
              required
              type="text"
              className="popup__input popup-add__form-item popup-add__form-item_el_heading"
              id="heading-place"
              name="heading-place"
              placeholder="Название"
              ref={newNameCardRef}
            />
            <span id="heading-place-error" className="error"></span>
            <input
              required
              type="url"
              className="popup__input popup-add__form-item popup-add__form-item_el_subheading"
              id="link-place"
              name="link-place"
              placeholder="Ссылка на картинку"
              ref={newLinkCardRef}
            />
            <span id="link-place-error" className="error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;