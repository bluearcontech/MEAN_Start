import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Array<Object> = [];
  private todo: Object = {};
  loginUser: Object;
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this._dataService.getTodos()
      .subscribe(res => this.todos = res)
  }

  ngOnInit() {
    this.subscription = this._authService.isLoggedIn
      .subscribe(
        isLoggedIn => {
          this.isLoggedIn = isLoggedIn
        }
      )

    this._authService.getUser()
      .subscribe(
        res => {
          this.loginUser = res.username
        }
      )
  }

  onTodoDelete(todoId: String) {
    this._dataService.deleteTodo(todoId)
      .subscribe(res => {
        this.todos = this.todos.filter( (todo: any) => {
          return todo._id != todo.id;
        });
        console.log(res);
      })
  }

}
