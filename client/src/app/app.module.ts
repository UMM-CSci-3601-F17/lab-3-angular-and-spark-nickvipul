import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {UserComponent} from './users/user.component';
import {Routing} from './app.routes';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from "@angular/common";
import {TodoListComponent} from "./Todos/todo-list.component";
import {TodoListService} from "./Todos/todo-list.service";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        UserListComponent,
        UserComponent,
        TodoListComponent
    ],
    providers: [
        UserListService,
        {provide: APP_BASE_HREF, useValue: '/'},
        TodoListService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
