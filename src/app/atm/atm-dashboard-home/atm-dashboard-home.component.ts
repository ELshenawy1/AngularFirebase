import { Component } from '@angular/core';

@Component({
  selector: 'app-atm-dashboard-home',
  templateUrl: './atm-dashboard-home.component.html',
  styleUrls: ['./atm-dashboard-home.component.css']
})
export class AtmDashboardHomeComponent {
  isSidebarClosed = false;
  items = [
    { name: 'Dashboard', icon: 'bi bi-bank text-dark', active: true },
    { name: 'ATM Dashboard', icon: 'bi bi-cash text-dark', active: false },
  ];

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  selectItem(selectedItem: { name: string; icon: string; active: boolean }) {
    this.items.forEach(item => item.active = false);
    selectedItem.active = true;
  }

}
