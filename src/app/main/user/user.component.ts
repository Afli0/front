import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('SideBarComponent') addUser!:SideBarComponent
  unsubscibe:Subject<void> = new Subject();
  openSideBar:boolean=false
  listUsers:any=[]
  user:any={}
  constructor(private userService:UserService) { }
  ngOnInit(): void {
    this.userService.getRefreshData().subscribe((res)=>{
      this.usersList()
    })
  }
  ngAfterViewInit() {
    this.user= this.addUser?.userForm.value;
     // I am a pup component!
  }
  usersList(){
    let data =localStorage.getItem('listUser')    
    if(data)
    this.listUsers=JSON.parse(data)
    if(!this.listUsers.length)
   { this.getListUsers()}   
  }
  close(event:boolean){
    this.openSideBar=event
  }
  getListUsers(){
    this.userService.getJSON().pipe(takeUntil(this.unsubscibe)).subscribe((res)=>{      
      this.listUsers=res
    })
  }
  open(event:boolean){    
    this.openSideBar=event
  }
  deleteUser(event:any){
    const index =   this.listUsers.findIndex((user:any) => user.id ===event.id);
    this.listUsers.splice(index,1)
    localStorage.setItem('listUser',JSON.stringify(this.listUsers))
  }
  updateUser(event:any){    
    const index =   this.listUsers.findIndex((user:any) => user.id ===event.id);
    this.listUsers.splice(index,1)
    this.listUsers.push(event)
    localStorage.setItem('listUser',JSON.stringify(this.listUsers))
  }
}
