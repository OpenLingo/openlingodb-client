import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NounsComponent } from './nouns/nouns.component';
import { DashboardComponent} from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { NounDetailComponent} from "./noun-detail/noun-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'nouns', component: NounsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: NounDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
