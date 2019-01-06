import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { UpdateTaskComponent } from './UI/update-task/update-task.component';

import { SharedService } from './shared.service'

const routes: Routes = [
  { path : 'AddProject', component : AddProjectComponent},
  { path : 'AddTask', component : AddTaskComponent},
  { path : 'AddUser', component : AddUserComponent},
  { path : 'ViewTask', component : ViewTaskComponent},
  { path : 'UpdateTask/:id' , component :UpdateTaskComponent } ,
];

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
