function ImagePopup(props) {

  return (
    <div className={`popup popup-image ${props.card != null ? "popup_is-opened" : null}` }>
            <div className="popup__overlay"></div>
            <div className="popup-image__content">
                <button onClick={props.onClose} className="popup__close popup-image__close" type="button"></button>
                <img className="popup-image__img" src={props.card && props.card['link']} alt={props.card && props.card['name']}/>
                <p className="popup-image__description">{props.card && props.card['name']}</p>
            </div>
        </div>
  );
}

export default ImagePopup;