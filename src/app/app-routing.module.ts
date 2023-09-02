import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from "./material/material.module";

import { AddNounComponent } from "./pages/add-noun/add-noun.component";
import { AddRecordingComponent } from "./pages/add-recording/add-recording.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NounsComponent } from './pages/nouns/nouns.component';
import { NounDetailComponent} from "./pages/noun-detail/noun-detail.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'add-noun', component: AddNounComponent },
    { path: 'add-recording', component: AddRecordingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'nouns', component: NounsComponent },
    { path: 'noun-detail/:id', component: NounDetailComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MaterialModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
