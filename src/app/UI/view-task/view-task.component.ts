import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { SharedService } from '../../shared.service'

import { User } from '../../models/user';
import { Project } from '../../models/project';
declare var $: any;

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  item: Task;
  _tasks: Task[];

  public sortStartDateASC: boolean = true;
  public sortEndDateASC : boolean = true;
  public sortPriorityASC : boolean = true;
  public sortCompletedASC : boolean = true;

  public title: string = "View";

  _TaskLists: Task[];
  _TaskGrid: Task[];
  private msg : string;

  constructor(private _router : Router ,private _TaskService: SharedService) {
    this.item = new Task();
   }

 
  // Sort the grid values based on the start date

  SortStartDate() {
    if (this.sortStartDateASC) {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return a.start_date < b.start_date ? -1 : 1 });
      this.sortStartDateASC = false;
    }
    else {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return b.start_date < a.start_date ? -1 : 1 });
      this.sortStartDateASC = true;
    }
  }
  
  // Sort the grid values based on the end date

  SortEndDate() {
    if (this.sortEndDateASC) {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return a.end_date < b.end_date ? -1 : 1 });
      this.sortEndDateASC = false;
    }
    else {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return b.end_date < a.end_date ? -1 : 1 });
      this.sortEndDateASC = true;
    }
  }

  // Sort the grid values based on the Priority

  SortPriority() {
    if (this.sortPriorityASC) {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return a.Priority - b.Priority });
      this.sortPriorityASC = false;
    }
    else {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return b.Priority - a.Priority });
      this.sortPriorityASC = true;
    }
  }

  // Sort the grid values based on the Status

  SortCompleted() {
    if (this.sortCompletedASC) {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return b.Priority < a.Priority ? -1 : 1 });
      this.sortCompletedASC = false;
    }
    else {
      this._TaskGrid = this._TaskGrid.sort(function (a, b) { return b.Priority < a.Priority ? -1 : 1 });
      this.sortCompletedASC = true;
    }
  }

  // Filter and Display the values based on the input projectname
  set SearchProjectName(value: string) {    
    this._TaskGrid = this.filteredTask(value);
  }

  filteredTask(searchFilter) {   
    return this._TaskLists.filter(
      e => e.Task_name.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }
  

  ngOnInit() {
    this.GetSummaryTasks();
  }

  
  GetAllTasks() {
    this._TaskService.GetAllTasks().subscribe((data: Task[]) => { this._tasks = data });
  }

  GetSummaryTasks() {
    this._TaskService.GetAllTasks().subscribe((data: Task[]) => { this._TaskLists = data, this._TaskGrid = data });
  }

  
 //Reset the some default value
  Reset() {
    this.title = "View";
  }

  Update(_item : any)
  {
    console.log('Update');
    this._router.navigate(['/UpdateTask/' + _item.Task_id]);
  }

  Delete(taskid : number)
  {
      this._TaskService.DeleteData(taskid).subscribe(i => this.msg = i);
      alert("Deleted successfully");
      this.ngOnInit();
  }

}
