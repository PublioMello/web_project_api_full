import React from "react";
import approved from "../../assets/images/approved.png";
import rejected from "../../assets/images/rejected.png";
import close from "../../assets/images/close.svg";
import "../../assets/blocks/infoTooltip.css";

const InfoTooltip = ({ isOpen, isSuccess, onClose }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}>
          <img className="image__popup" src={close} alt="Close" />
        </button>

        <img
          className="image__success"
          src={isSuccess ? approved : rejected}
          alt={isSuccess ? "Sucesso" : "Erro"}
        />

        <p>
          {isSuccess
            ? "Vitória! Você acaba de se registrar."
            : "Ops, algo saiu errado! Por favor, tente novamente."}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
