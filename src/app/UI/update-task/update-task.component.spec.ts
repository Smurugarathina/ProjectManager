import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from '../../shared.service'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTaskComponent ],
      imports:[RouterTestingModule,FormsModule,ReactiveFormsModule],
      providers: [SharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
