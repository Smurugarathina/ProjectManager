import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { SharedService } from '../../shared.service'
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  item: User;
  _users: User[];
  UserID: number;
  AllUserList: User[];
  public sortFirstNameASC: boolean = true;
  public sortLastNameASC: boolean = true;
  public sortEmployeeIdASC: boolean = true;
  public title: string = "Add User";
  _UserLists: User[];
  _UserGrid: User[];
  msg: string;


  constructor(private _UserService: SharedService) {
    this.item = new User();
  }

  ngOnInit() {
    $(document).ready(function () {

      $('#adduser').click(function () {

        //Required validation for all the mandatory fields

        if ($('#firstName').val() == "") {
          alert('First Name is required');
          return;
        }
        else if ($('#lname').val() == "") {
          alert('Last Name is required');
          return;
        }
        else if ($('#empid').val() == "") {
          alert('Employee ID is required');
          return;
        }
      });
    });

    this.GetUsersList();
  }

  // Get the users list form DB

  GetUsersList() {
    this._UserService.GetUsersList().subscribe((data: User[]) => { this._UserLists = data, this._UserGrid = data });
  }

  //Insert the user into user table

  Insert(item: User) {
    if (this.title == "Add User") {
      this._UserService.InsertUser(item).subscribe((data) => { this.ngOnInit(), alert("Inserted successfully") });
    }
    else {
      this._UserService.UpdateUser(item.user_id, item).subscribe((data) => { this.ngOnInit(), alert("Updated successfully") });
    }
  }

  Delete(UserID: number) {
    this._UserService.DeleteUser(UserID).subscribe(i => this.msg = i);
    alert("Deleted successfully");
    this.ngOnInit();
  }

  //Reset the some default value
  Reset() {
    this.title = "Add User";
  }

  //Update to the textbox
  Update(item: any) {        
    this.item.first_name = item.first_name;
    this.item.last_name = item.last_name;
    this.item.emp_id = item.emp_id;
    this.item.user_id = item.user_id;
    this.title = "Update";
  }

  SortFirstName() {
    if (this.sortFirstNameASC) {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return a.first_name < b.first_name ? -1 : 1 });
      this.sortFirstNameASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return b.first_name < a.first_name ? -1 : 1 });
      this.sortFirstNameASC = true;
    }
  }

  SortLastName() {
    if (this.sortLastNameASC) {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return a.last_name < b.last_name ? -1 : 1 });
      this.sortLastNameASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return b.last_name < a.last_name ? -1 : 1 });
      this.sortLastNameASC = true;
    }
  }

  SortEmployeeId() {
    if (this.sortEmployeeIdASC) {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return a.emp_id - b.emp_id });
      this.sortEmployeeIdASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return b.emp_id - a.emp_id });
      this.sortEmployeeIdASC = true;
    }
  }

  set SearchUserName(value: string) {
    this._UserGrid = this.filteredTask(value);
  }


  filteredTask(searchFilter) {    
        return this._UserLists.filter(
          e => e.first_name.toLowerCase().startsWith(searchFilter.toLowerCase()));
      }

}
