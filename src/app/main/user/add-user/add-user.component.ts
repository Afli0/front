import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  unsubscibe:Subject<void> = new Subject();

  userForm:FormGroup=this.userSrvice.createFormUser()
  listeUser:any=[]
@Input()set dataUser(value:any){
  this.userForm=this.userSrvice.createFormUser(value)
}
@Input()mode:boolean=false
@Input()readOnly:boolean=false
@Input() open:boolean=false
@Output() openSideBar=new EventEmitter()
@Output() delete=new EventEmitter()
  constructor(private userSrvice:UserService,) { }

  ngOnInit(): void {
  }

openSidebar(event:any){
  this.userSrvice.setSideBarUser(event)
  this.openSideBar.emit(true)
}
addUser(){
  if(this.userForm.valid){
    this.userSrvice.createUser(this.userForm.value)
    this.userForm.reset()
  }
}
incrementExp(){
  let count =this.userForm.get('years')?.value
  count ++;
  this.userForm.get('years')?.setValue(count)
}
decrementExp(){
  let count =this.userForm.get('years')?.value
  count --;
  this.userForm.get('years')?.setValue(count)
}
deleteUser(element:any){
  this.delete.emit(element)
}
}
