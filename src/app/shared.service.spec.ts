import { SharedService } from '../app/shared.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { MockBackend } from '@angular/http/testing'

import { Task } from '../app/models/task';
import { HttpModule, Response } from '@angular/http';

describe('TaskServiceService', () => {

  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule],
      providers: [SharedService, { provide: HttpClient, deps: MockBackend }]
    });
    service = TestBed.get(SharedService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });

  it('Service should check with Dummy post from api via get method', () => {
    var date = new Date('2018-11-02');
    const dummyPost: Task[] = [
      {       
        Project_Name: 'TEST',
        Task_id: 1,
        Task_name: 'Task New',        
        Priority: 10,        
        parent_task_name: 'Task',
        Is_parent_task: true,
        start_date: date,
        end_date: date,        
        user_name: 'User1',
        deleted: false,
        status: 'Completed'
      }
    ];

    service.GetTask(2002).subscribe(post => {
      expect(post.Task_name).toBe(dummyPost.find(i => i.Task_name == 'Task New').Task_name);

    });
  });

});