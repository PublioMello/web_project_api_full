import ImagePopup from "./ImagePopup";
import RemoveCard from "./RemoveCard";

export default function Card({
  card,
  handleOpenPopup,
  handleDeleteCard,
  onCardLike,
}) {
  const { name, link, _id } = card;

  const isLiked = card.isLiked;

  const imageComponent = {
    children: <ImagePopup card={card} />,
    isImage: true,
  };

  const removeCardPopup = {
    title: "Tem certeza?",
    className: "popup__content_type_delete",
    children: (
      <RemoveCard
        onConfirm={async () => {
          await handleDeleteCard(_id);
          handleOpenPopup(null); // fecha popup
        }}
      />
    ),
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => handleOpenPopup(removeCardPopup)}
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
