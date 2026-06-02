import React, { useRef } from "react";

function EditAvatar({ onUpdateAvatar, handleClosePopup }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
    handleClosePopup();
  }
  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Link de Imagem"
        required
        type="url"
        ref={avatarRef}
      />
      <span className="link-input-error popup__error-message"></span>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
