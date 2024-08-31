let todoId = 0;

export class TodoItemModel {
  id;
  title;
  completed;

  constructor({ title, completed }) {
    this.id = todoId++;
    this.title = title;
    this.completed = completed;
  }
}
