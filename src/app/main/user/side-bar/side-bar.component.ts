import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
export class SidebarModel {
  linkText: string=""
  parentLink: string=""
  menu: boolean=false
  submenu: { childtext: string; link: string }[]=[];
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  sidebarShow:boolean=false
  userForm:FormGroup=this.userSrvice.createFormUser()
  @Input() set sidebar(value:boolean){
    this.sidebarShow=value
  }
  @Output() closeSideBar=new EventEmitter()
  @Output() updateUser=new EventEmitter()
  constructor(private userSrvice:UserService) {
  }
  ngOnInit(): void {
    this.userSrvice.getSideBarUser().subscribe((res)=>{
      this.userForm=this.userSrvice.createFormUser(res)
    })
  }
close(){
  this.sidebarShow = !this.sidebarShow
  this.closeSideBar.emit(this.sidebarShow)
}
update(){
  this.updateUser.emit(this.userForm.value)
}
}


