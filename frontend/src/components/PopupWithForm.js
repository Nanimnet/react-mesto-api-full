function PopupWithForm(props) {
    
    const closePopup = () => {
      if (props.onClose) {
        props.onClose();
      } 
    };

  return (
    <div
      className={`${props.popups} popup-${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          className="popup__close popup-profile__close"
          type="button"
          onClick={closePopup}
        ></button>

        <form
          className={`popup__form popup-${props.name}__form`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h3 className="popup__heading">{props.title}</h3>

          {props.children}

          <button className="popup__button" type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;