import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   jsonURL = 'assets/users.json';
   unsubscibe:Subject<void> = new Subject();
sideBarUser=new BehaviorSubject({})
refreshData=new BehaviorSubject(false)
  constructor(private http: HttpClient,public builderForm:FormBuilder,public toasterService:ToastrService) { 
  }
  createFormUser(data?:any):FormGroup{    
  return  this.builderForm.group({
    id: [data && data.id? data.id:null],
      name: [data && data.name? data.name:"",[Validators.required]],
      usurname: [data && data.usurname? data.usurname:"",[Validators.required]],
      years: [data && data.years? data.years:0,[Validators.required]]
  })
  }

  getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
  setSideBarUser(data: string) {
    this.sideBarUser.next(data);
  }
  getSideBarUser() {
   return this.sideBarUser
  }
  setRefreshData(data: boolean) {
    this.refreshData.next(true);
  }
  getRefreshData() {
   return this.refreshData
  }

  createUser(body: any) {
    let users: any=[]
    this.getJSON().pipe(takeUntil(this.unsubscibe)).subscribe({next:(data)=>{ 
      let storageLocal =localStorage.getItem('listUser')
      if(storageLocal)
      users=JSON.parse(storageLocal)
      body.id=users.length
      if(users.length)users.push(body)
      else   {
        data.push(body);
        users=data
        body.id=users.length
       }
        // Modify the data by pushing the new value to the array
       
        localStorage.setItem('listUser',JSON.stringify(users))     
        this.toasterService.success('Utilisateur a ajouté avec succés') 
        this.setRefreshData(true)
      },
     error: error => {
        console.error('Error retrieving JSON file:', error);
      }}
    );
 
  }
}
