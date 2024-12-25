import { CreateAtmComponent } from './atm/create-atm/create-atm.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { UserDashboardComponent } from './account/user-dashboard/user-dashboard.component';
import { UpdateUserComponent } from './account/update-user/update-user.component';
import { HomeComponent } from './home/home/home.component';
import { UserGroupsComponent } from './group/user-groups/user-groups.component';
import { JouranlComponent } from './home/jouranl/jouranl.component';
import { AtmDashboardComponent } from './atm/atm-dashboard/atm-dashboard.component';
import { GroupDashboardComponent } from './group/group-dashboard/group-dashboard.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ErrorComponent } from './core/error/error.component';
import { AtmDetailsComponent } from './atm/atm-details/atm-details.component';
import { EditAtmComponent } from './atm/edit-atm/edit-atm.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { SurveillanceComponent } from './home/surveillance/surveillance.component';
import { AtmDashboardHomeComponent } from './atm/atm-dashboard-home/atm-dashboard-home.component';
import { ReportViewerComponent } from './core/report-viewer/report-viewer.component';
import { DemoReportComponent } from './report/demo-report/demo-report.component';
// import { SystraceComponent } from './report/systrace/systrace.component';
import { ReportDashboardComponent } from './report/report-dashboard/report-dashboard.component';
import { ExportReportComponent } from './report/export-report/export-report.component';
import { AdvAtmDashboardComponent } from './home/adv-atm-dashboard/adv-atm-dashboard.component';
import { BranchDashboardComponent } from './branch/branch-dashboard/branch-dashboard.component';
import { RegionDashboardComponent } from './region/region-dashboard/region-dashboard.component';
import { CreateRegionComponent } from './region/create-region/create-region.component';
import { SystraceComponent } from './report/systrace/systrace.component';
import { WalletReportComponent } from './report/wallet-report/wallet-report.component';
import { FrxReportComponent } from './report/frx-report/frx-report.component';
import { EditRegionComponent } from './region/edit-region/edit-region.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard],component:HomeComponent},
  {path:'home',canActivate:[AuthGuard],component:HomeComponent},
  {path:'ATM/ShowATMs',canActivate:[AuthGuard],component:AtmDashboardComponent},
  {path:'Dashboard',canActivate:[AuthGuard],component:AdvAtmDashboardComponent},
  {path:'Group/Index',canActivate:[AuthGuard],component:GroupDashboardComponent},
  {path:'report-dashboard',canActivate:[AuthGuard],component:ReportDashboardComponent},
  {path:'Report/WalletReport',canActivate:[AuthGuard],component:WalletReportComponent},
  {path:'Report/FrxNewReport',canActivate:[AuthGuard],component:FrxReportComponent},
  {path:'ExportReport/Index',canActivate:[AuthGuard],component:ExportReportComponent},
  {path:'create-group',canActivate:[AuthGuard],component:CreateGroupComponent},
  {path:'create-region',canActivate:[AuthGuard],component:CreateRegionComponent},
  {path:'edit-region',canActivate:[AuthGuard],component:EditRegionComponent},
  {path:'journal',canActivate:[AuthGuard],component:JouranlComponent},
  {path:'surveillance',canActivate:[AuthGuard],component:SurveillanceComponent},
  {path:'login',component:LoginComponent},
  {path:'demo-report/:id',component:DemoReportComponent},
  {path:'Region/ShowRegions',component:RegionDashboardComponent},
  {path:'Report/SysTraceReport', canActivate:[AuthGuard],component: SystraceComponent},
  {path:"register" ,canActivate:[AuthGuard], component:RegisterComponent},
  {path:'user/showusers',canActivate:[AuthGuard], component:UserDashboardComponent},
  {path:'update-user' ,canActivate:[AuthGuard], component:UpdateUserComponent},
  {path:'user-groups' ,canActivate:[AuthGuard], component:UserGroupsComponent},
  {path:'atm-details' ,canActivate:[AuthGuard], component:AtmDetailsComponent},
  {path:'create-atm' ,canActivate:[AuthGuard], component:CreateAtmComponent},
  {path:'edit-atm' ,canActivate:[AuthGuard], component:EditAtmComponent},
  {path:'Branch/ShowBranches' ,canActivate:[AuthGuard], component:BranchDashboardComponent},
  {path:'edit-group' ,canActivate:[AuthGuard], component:EditGroupComponent},
  {path:'atm-dashboard-home2' ,canActivate:[AuthGuard], component:AtmDashboardHomeComponent},
  {path:'repo' ,canActivate:[AuthGuard], component:ReportViewerComponent},
  {path:'error/:error-status', component:ErrorComponent},
  { path: '**', redirectTo: '/error/404' } // Redirect any unknown routes to the error component with 404 status
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
