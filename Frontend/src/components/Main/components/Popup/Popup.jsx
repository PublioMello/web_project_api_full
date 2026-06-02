function Popup({ onClose, title, children, isImage, className }) {
  return (
    <div className="popup popup_opened">
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
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}

export default Popup;
