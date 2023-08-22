import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NounsComponent } from './pages/nouns/nouns.component';
import { AddNounComponent } from "./pages/add-noun/add-noun.component";
import { LoginComponent } from "./pages/login/login.component";
import { NounDetailComponent} from "./pages/noun-detail/noun-detail.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { MaterialModule } from "./material/material.module";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'nouns', component: NounsComponent },
    { path: 'add-noun', component: AddNounComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'noun-detail/:id', component: NounDetailComponent },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MaterialModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
