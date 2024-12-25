import { AtmModule } from './atm/atm.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { GroupModule } from './group/group.module';
import { ReportModule } from './report/report.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HomeModule } from './home/home.module';
import { BranchModule } from './branch/branch.module';
import { RegionModule } from './region/region.module';
import { HashLocationStrategy , LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './report/config.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'primeng/api';

export const configFactory = (configService : ConfigService) => {
  return () => configService.loadConfig();
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BranchModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AccountModule,
    HttpClientModule,
    CoreModule,
    GroupModule,
    HomeModule,
    AtmModule,
    SharedModule,
    ReportModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    RegionModule,
    NgbModule,
    PaginationModule.forRoot(),
    SharedModule        
  ],
  providers: [
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    {
      provide : APP_INITIALIZER,
      useFactory : configFactory,
      deps : [ConfigService],
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


