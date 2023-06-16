import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../components/common/baseUrl';
import { Todo } from '../components/common/Todo';
import { User } from '../components/common/User';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = BASE_URL + '/todo';

  constructor(private _http: HttpClient) {}

  getTodos(): Observable<TodoResponse> {
    return this._http.get<TodoResponse>(`${this.url}`);
  }

  addTodo(todo: any): Observable<Todo> {
    return this._http.post<Todo>(`${this.url}/add`, { ...todo });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this._http.put<Todo>(`${this.url}/update`, {
      title: todo.title,
      description: todo.description,
      todoId: todo._id,
      start: todo.start,
      due: todo.due,
      tag: todo.tag,
      isCompleted: todo.isCompleted,
      progress: todo.progress,
    });
  }

  deleteTodo(todoId: string): Observable<Todo> {
    return this._http.delete<Todo>(`${this.url}/delete/${todoId}`);
  }
}

interface TodoResponse {
  completed: Todo[];
  notCompleted: Todo[];
  Progress: Todo[];

  // # Extra
  Urgent: Todo[];
  Important: Todo[];
  UrgentImp: Todo[];
  Today: Todo[];
  Nothing: Todo[];
  All: Todo[];
}
