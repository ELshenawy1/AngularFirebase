import { ConfigService } from './../config.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  hoverIndex:number = -1;

  constructor(private configService:ConfigService){
  }

  frx = this.configService.getConfig('frx');
  wlt = this.configService.getConfig('wlt');
  cms = this.configService.getConfig('cms');
  audit = this.configService.getConfig('audit');

  onHover(i:number){
    this.hoverIndex = i;
   }
}
