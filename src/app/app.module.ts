import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";

import { AddNounComponent } from './pages/add-noun/add-noun.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NounsComponent } from './pages/nouns/nouns.component';
import { NounDetailComponent } from './pages/noun-detail/noun-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { AddRecordingComponent } from './pages/add-recording/add-recording.component';

@NgModule({
    declarations: [
        AppComponent,
        NounsComponent,
        NounDetailComponent,
        MessagesComponent,
        LoginComponent,
        RegisterComponent,
        AddNounComponent,
        HomeComponent,
        ToolbarComponent,
        AddRecordingComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
