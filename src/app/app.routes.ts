import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { Routes } from '@angular/router';

import { TodoFormComponent } from './Todos/Components/todo-form/todo-form.component';
import { TodoListComponent } from './Todos/Components/todo-list/todo-list.component';

export const AppRoutes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'create', component: TodoFormComponent },
  { path: 'sign-in', component: SigninComponent},
  { path: 'sign-up', component: SignupComponent}
]