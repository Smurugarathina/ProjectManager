import { NgModule } from '@angular/core';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { UpdateTaskComponent } from './UI/update-task/update-task.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

