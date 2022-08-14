import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { TableEntranceComponent } from './table/table-entrance/table-entrance.component';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
  {
  path: 'dashboard',
  component: DashboardComponent,

},
{
  path: 'table',
  component: PostCreateComponent,

}
,
{
  path: '',
  component: TableEntranceComponent,

}
,
{
  path: 'login',
  component: LoginComponent,

}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
