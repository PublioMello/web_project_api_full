import closeIcon from "../../../../assets/images/close.svg";
import { useEffect } from "react";
function Popup({ onClose, title, children, isImage, className }) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="popup popup_opened" onMouseDown={handleOverlayClick}>
      <div
        className={`popup__content 
        ${isImage ? "popup__content_content_image" : ""}
        ${className || ""}`}
      >
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Fechar" />
        </button>

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}

export default Popup;
