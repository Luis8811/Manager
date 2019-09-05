import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:language',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:language',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'client', loadChildren: './client/client.module#ClientPageModule' },
  { path: 'staff', loadChildren: './staff/staff.module#StaffPageModule' },
  { path: 'processes/:language', loadChildren: './processes/processes.module#ProcessesPageModule' },
  { path: 'finances/:language', loadChildren: './finances/finances.module#FinancesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
