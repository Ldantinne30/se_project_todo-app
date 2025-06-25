import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const formElement = document.querySelector(".popup__form");
const formValidator = new FormValidator(validationConfig, formElement);
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const { name, date: dateInput } = formData;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { name, date, id: uuidv4(), completed: false };
    renderTodo(values);
    counter.updateTotal(true);
    formValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", {
    onDelete: (wasCompleted) => {
      counter.updateTotal(false);
      if (wasCompleted) {
        counter.updateCompleted(false);
      }
    },
    onToggle: (isCompleted) => {
      counter.updateCompleted(isCompleted);
    },
  });
  return todo.getView();
}

section.renderItems();

formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  formValidator.resetValidation();
  addTodoPopup.open();
});
