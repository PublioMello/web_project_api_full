import React, { useState, useContext } from "react";
import Popup from "./components/Popup/Popup";
import EditProfile from "./components/Popup/components/NewCard/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditAvatar from "./components/Popup/components/NewCard/EditAvatar";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import App from "../App";
import RemoveCard from "./components/Card/RemoveCard";

function Main({ cards, onCardLike, onCardDelete, onAddPlaceSubmit }) {
  const { currentUser, handleUpdateUser, handleUpdateAvatar } =
    useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);

  if (!currentUser) return null;

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  const newCardPopup = {
    title: "New card",
    children: (
      <NewCard
        onAddPlaceSubmit={onAddPlaceSubmit}
        handleClosePopup={handleClosePopup}
      />
    ),
  };

  const editProfilePopup = {
    title: "Edit Profile",
    children: (
      <EditProfile
        handleUpdateUser={handleUpdateUser}
        handleClosePopup={handleClosePopup}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Edit Avatar",
    children: (
      <EditAvatar
        onUpdateAvatar={handleUpdateAvatar}
        handleClosePopup={handleClosePopup}
      />
    ),
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <button
          className="profile__avatar-button"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Avatar"
          />
        </button>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              handleDeleteCard={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isImage={popup?.isImage}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
