import { Component, OnInit } from '@angular/core';

import { DataService } from '../../Services/data.service';
import { Todo } from './../../Model/Todo';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todos: Array<Todo> = [];
  todo: Todo = {
    title: '',
    text: ''
  };

  constructor(private _dataService: DataService) {
    this._dataService.getTodos()
      .subscribe(res => this.todos = res);
  }

  onSubmit() {
    this._dataService.createTodo(this.todo)
      .subscribe(res => {
        console.log(res)
      });
  }

  ngOnInit() {
  }

}
