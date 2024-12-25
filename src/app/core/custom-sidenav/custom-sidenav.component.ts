import { User } from 'src/app/shared/models/user';
import { AccountService } from './../../account/account.service';
import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/report/config.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.css']
})
export class CustomSidenavComponent implements OnInit{

  currentUser?: User;
  bankLogo: string = ""
  baseUrl = this.configService.getConfig('apiUrl');
  currentBank = this.configService.getConfig('currentBank');
  constructor(public accountService: AccountService,private configService:ConfigService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res) => {
      if (res) this.currentUser = res;
      else this.currentUser = undefined;
    });

    this.bankLogo = this.baseUrl.slice(0, -3) + `${this.currentBank}_banklogotransparent.png`;
  }

  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
  getProfilePicSrc = computed(() => this.sideNavCollapsed() ? this.bankLogo : this.bankLogo);

  menuItems = signal<MenuItem[]>([
    {
      icon: 'insert_chart',
      label: 'Main Dashboard',
      route: 'Dashboard'
    },    {
      icon: 'atm',
      label: 'ATM Dashboard',
      route: 'ATM/ShowATMs'
    },
    {
      icon: 'group',
      label: 'User Dashboard',
      route: 'user/showusers'
    },
    {
      icon: 'library_books',
      label: 'Reports',
      route: 'report-dashboard'
    },
    {
      icon: 'logout',
      label: 'Logout',
      action: () => this.accountService.logout()
    }
  ]);

  onMenuItemClick(item: MenuItem) {
    if (item.action) {
      item.action();
    }
  }
}
