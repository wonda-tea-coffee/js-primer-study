import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  craeteElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul></ul>`;
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
