import { Router } from '@angular/router';
import { Component, OnInit, computed, signal } from '@angular/core';
import { AccountService } from './account/account.service';
import { NavLink, User } from './shared/models/user';
import { GeneralService } from './core/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'MVMASTER';
  constructor(public accountService : AccountService, private router : Router, private generalService : GeneralService){}
  currentUser? : User ;
  navItems : NavLink[] = [];
  baseNavItems : NavLink[] = [];
  ngOnInit(): void {
    this.generalService.GetMenusTab().subscribe({
      next:(result)=>{
        this.navItems = result;
        this.baseNavItems = result.filter(i => ((i.menuParent === null) && (i.menuEnabled == true)))

        this.baseNavItems.forEach((i)=>{
          i.navLink = this.navItems.filter(n => n.menuParent == i.menuId && n.menuEnabled == true)
          i.navLink.forEach((n)=>{
            n.navLink = this.navItems.filter(x => x.menuParent == n.menuId && x.menuEnabled == true)
          })
        })
      },
      error:(error)=>{
        console.log(error)
      }
    })
    this.accountService.currentUser$.subscribe((res)=>{
      if(res) this.currentUser = res;
      else this.currentUser = undefined
    })

    this.loadCurrentUser()
  }
  getCustomBackgroundColor(): string {
    return '#f5f5f5'; // Return the desired background color
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token)
      this.accountService.loadCurrentUser(token).subscribe();
    else
      this.router.navigate([`/login`])
  }
  
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

}
