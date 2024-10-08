import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel();

  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      const todoListElement = this.#todoListView.craeteElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    })

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = inputElement.value;

      if (!value) return;

      this.handleAdd(value);
      inputElement.value = "";
    });
  }
}
