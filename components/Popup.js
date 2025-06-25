class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");

    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("popup__close") ||
        event.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
