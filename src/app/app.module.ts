import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NounsComponent } from './pages/nouns/nouns.component';
import { NounDetailComponent } from './pages/noun-detail/noun-detail.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddNounComponent } from './pages/add-noun/add-noun.component';

@NgModule({
  declarations: [
    AppComponent,
    NounsComponent,
    NounDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AddNounComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
