export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._checkboxEl.addEventListener("change", () => {
      this._data.completed = this._checkboxEl.checked;
    });
  }

  getView() {
    const template = document
      .querySelector(this._selector)
      .content.cloneNode(true);
    this._element = template.querySelector(".todo");

    this._element.querySelector(".todo__name").textContent = this._data.name;
    this._element.querySelector(".todo__date").textContent =
      this._data.date.toLocaleString();

    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._labelEl = this._element.querySelector(".todo__label");

    this._checkboxEl.id = this._data.id;
    this._labelEl.htmlFor = this._data.id;

    this._checkboxEl.checked = this._data.completed;

    if (this._data.completed) {
      this._element.classList.add("todo_completed");
    }

    this._setEventListeners();
    return this._element;
  }
}
