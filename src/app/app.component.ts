import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular18-with-jsonServer';

  // userObj:any = {} //instead of creating any use classObj
  userObj:USER = new USER();

  http = inject(HttpClient) // new method to inject the service
  // constructor(private http:HttpClient){} // old method to inject dependency

  cityList$: Observable<string[]>  = new Observable<string[]>;
  stateList$: string[] = [];
  userList$:USER[] = [];

  ngOnInit(): void {
this.cityList$ = this.http.get<string []>("http://localhost:3000/cityList");
this.getState();
this.getUser();
  }
//   getCity(){
//     this.http.get<string []>("http://localhost:3000/cityList").subscribe((res:string[]) =>{
//  })
//   }

  getState(){
    this.http.get<string []>("http://localhost:3000/stateList").subscribe((res:string[]) =>{
     // console.log(res);
      this.stateList$ = res

 })
  }

  getUser(){
    this.http.get<USER[]>("http://localhost:3000/userList").subscribe((res:USER[])=>{
      this.userList$ = res;
    })
  }

  onSaveUser(){
    this.http.get<USER>("http://localhost:3000/createUser").subscribe((res:USER)=>{
       alert("User Created");
       this.userList$.push(this.userObj);
    }) 
    // this.http.post<USER>("http://localhost:3000/createUser").subscribe((res:USER)=>{
    //    alert("User Created");
    //    this.userList$.unshift(this.userObj);
    // }) 
   }

   onDeleteUser(id:number){
    const isDeleteUser = confirm("Are you sure to delete user")
    if(isDeleteUser){
      this.http.get<USER>("http://localhost:3000/deleteUser").subscribe((res:USER)=>{
        alert("User Deleted")
      })
    }
   }

   onUpdateUser(data:USER){
    this.userObj = data
   }


}


export class USER{
  userId: number;
      username: string;
      fName: string;
      lName: string;
      city: string;
      state: string;
      zipCode: string;
      constructor(){
        this.userId = 0;
        this.username = '';
        this.fName = '';
        this.lName = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
      }
}