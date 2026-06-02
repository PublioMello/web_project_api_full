function RemoveCard({ onConfirm }) {
  async function handleSubmit(e) {
    e.preventDefault();
    await onConfirm();
  }

  return (
    <form
      className="popup__form popup__form_type_delete"
      onSubmit={handleSubmit}
    >
      <button className="popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}

export default RemoveCard;
