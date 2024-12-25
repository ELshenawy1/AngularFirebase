import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { UserData } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  users : UserData[] = [];
  constructor(public accountService : AccountService){
    this.accountService.getAllUsers().subscribe({
    next : (val) => {this.users = val;}
  })
}
  ngOnInit(): void {
  }

  RemoveUser(userId : number){
    this.accountService.RemoveUser(userId).subscribe({
      next:()=>{ this.users = this.users.filter(p=> p.userId != userId)}
    });
  }

  saveUserId(userId : number){
    localStorage.setItem("userId",userId.toString());
  }


}
