import React from "react";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUserContext = React.useContext(CurrentUserContext);

    if(props.item == null) {
        return (<div></div>)
       };

    function handleClick() {
        props.onCardClick(props.item);  
    };

    function handleLikeClick() {
        props.onCardLike(props.item);
    };
    
    function handleDeleteClick() {
        props.onCardDelete(props.item);
    };

    const currentUserId = currentUserContext.currentUserId;

    const isOwn = (props.item.owner === currentUserId) || (props.item.owner?._id === currentUserId);
    const isLiked = Array.from(props.item.likes || []).some(
        (liker) => (liker?._id === currentUserId) || (liker === currentUserId)
    );

    const cardLikeButtonClassName = `card__like ${
        isLiked ? 'card__like_active' : ' '
    }`;

    const cardDeleteButtonClassName = `card__delete ${
        isOwn ? " " : "card__delete_hidden"
    }`;



    return (
        <div className="card">
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
            <img onClick={handleClick} className="card__photo" src={props.item.link} alt={props.item.name}/>
            <div className="card__name">
                <h2 className="card__title">
                    {props.item.name}
                </h2>
                <div className="card__like-section">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                    <p className="card__like-count">{Array.from(props.item.likes || []).length}</p>
                    {/* <p className="card__like-count">0</p> */}
                </div>
            </div>
        </div>
    );
  }
  
  export default Card;