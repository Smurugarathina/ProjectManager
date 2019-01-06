export class Task {
    Project_Name : string  
    //Project_id : number  
    Task_id : number
    Task_name : string    
    Priority : number
    parent_task_name : string
    Is_parent_task : boolean = false
    start_date : Date
    end_date : Date
    //UserId : number
    user_name : string    
    deleted : boolean = false
    status : string 
}
