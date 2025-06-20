import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const formElement = document.querySelector(".popup__form");
const formValidator = new FormValidator(validationConfig, formElement);
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date, id: uuidv4() };
  renderTodo(values);
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});
