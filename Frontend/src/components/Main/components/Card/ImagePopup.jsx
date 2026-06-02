import React from "react";

function ImagePopup({ card }) {
  return (
    <>
      <img className="popup__image" src={card?.link} alt={card?.name} />
      <p className="popup__caption">{card?.name}</p>
    </>
  );
}

export default ImagePopup;
