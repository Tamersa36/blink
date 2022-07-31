import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,

},
{
  path: '',
  component: PostCreateComponent,

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
