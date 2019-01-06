import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { SharedService } from '../../shared.service'

import { User } from '../../models/user';
import { Project } from '../../models/project';
declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  item: Task;
  //proj: Project;
  _users: User[];
  _projects: Project[];
  message: any;
  _tasks: Task[];
  public title: string = "Add";

  constructor(private _taskService: SharedService) {
    this.item = new Task();
  }

  ngOnInit() {

    $(document).ready(function () {

      $("#userInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#userTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      $("#projectInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#projectTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      $("#taskInputsearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#taskTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      $('#ptask_cb').click(function () {        
        if ($(this).is(":checked")) {
          $('#ptask').prop('disabled', true);  
          $('#sdate').prop('disabled', true);  
          $('#edate').prop('disabled', true); 
          $('#user').prop('disabled', true);
          $('#pname').prop('disabled', true); 
          $('#priority').prop('disabled', true);        
        } else {
          $('#ptask').prop('disabled', false);
          $('#sdate').prop('disabled', false);  
          $('#edate').prop('disabled', false); 
          $('#user').prop('disabled', false);
          $('#pname').prop('disabled', false); 
          $('#priority').prop('disabled', false);         
        }
      });

      $('#addtask_btn').click(function () {

        //Required validation for all the mandatory fields
        if ($('#pname').val() == "") {
          alert('Project is required');
          return;
        }
        else if ($('#task').val() == "") {
          alert('Task is required');
          return;
        }
        /*else if ($('#ptask').val() == "") {
          alert('Parent Task is required');
          return;
        }*/
        else if ($('#sdate').val() == "") {
          alert('Start Date is required');
          return;
        }
        else if ($('#edate').val() == "") {
          alert('End Date is required');
          return;
        }
        else if ($('#user').val() == "") {
          alert('User is required');
          return;
        }

        //Start date and End date validations
        if ($('#sdate').val() <= $('#edate').val()) {
          alert('Start Date should be less than End Date');
          return;
        }

        if ($('#sdate').val() < $('#edate').val()) {
          alert('Start Date should be less than End Date');
          return;
        }

        //Start Date
        var date = new Date();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var year = date.getFullYear();
        var mm1;
        var dd1;

        if (mm < 10) mm1 = ('0' + mm);
        else
          mm1 = mm;

        if (dd < 10) dd1 = '0' + dd;
        else
          dd1 = dd;

        var startDate = year + "-" + mm1 + "-" + dd1;
        var stdate = $("#sdate");
        stdate.val(startDate);
        stdate.change();
        stdate.trigger('input');
        stdate.trigger('change');

      });

      //Start Date
      var date = new Date();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var year = date.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var startDate = year + "-" + mm1 + "-" + dd1;
      var stdate = $("#sdate");
      stdate.val(startDate);
      stdate.change();
      //stdate.trigger('input');
      //stdate.trigger('change');

      //End date
      var newdate = new Date();
      newdate.setDate(date.getDate() + 1);

      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var endDate = year + "-" + mm1 + "-" + dd1;
      $("#edate").val(endDate);

      //this.item.end_date = endDate;
      //this.item.start_date = startDate;
    });
  }

  GetAllUsers() {
    this._taskService.GetUsersList().subscribe((data: User[]) => { this._users = data });
  }

  GetParentTaskList() {
    this._taskService.GetAllTasks()
      .subscribe((data: Task[]) => { this._tasks = data });
  }

  GetAllProjects() {
    this._taskService.GetAllProjects().subscribe((data: Project[]) => { this._projects = data });
  }

  GetNames(items: any) {
    this.item.user_name = items.first_name;
    //this.item.UserId = items.user_id;
  }

  GetProjects(items: any) {
    this.item.Project_Name = items.Project_name;
    //this.item.Project_id = items.project_id;
  }

  GetTasks(items: any) {
    this.item.parent_task_name = items.Task_name;
  }

  set SearchUserName(value: string) {
    this._users = this.filteredTask(value);
  }

  filteredTask(searchFilter) {
    return this._users.filter(
      e => e.first_name.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }

  Insert(item: Task) {
    console.log(item.Task_name);
    this.item.status = 'Not Completed';
    if (this.title == "Add") {
      this._taskService.InsertTask(item).subscribe((data) => { this.ngOnInit(), alert("Task Inserted Successfully") });
    }
    else {
      //this._taskService.UpdateTask(item).subscribe((data) => { this.ngOnInit(), alert("Task Updated Successfully") });
    }
  }

}
