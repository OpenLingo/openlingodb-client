import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NounsComponent } from './pages/nouns/nouns.component';
// import { DashboardComponent} from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { NounDetailComponent} from "./pages/noun-detail/noun-detail.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'nouns', component: NounsComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: NounDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
