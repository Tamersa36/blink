import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { TableEntranceComponent } from './table/table-entrance/table-entrance.component';
import { LoginComponent } from './auth/login/login/login.component';
import { ShowDeleteComponent } from './add-table/show-delete/show-delete.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item/add-menu-item.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'table',
    component: PostCreateComponent,
  },
  {
    path: '',
    component: TableEntranceComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addTable',
    component: ShowDeleteComponent,
  },
  {
    path: 'addMenuItem',
    component: AddMenuItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
