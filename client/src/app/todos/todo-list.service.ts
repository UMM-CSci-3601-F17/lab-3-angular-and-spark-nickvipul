import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from "rxjs";
import "rxjs/add/operator/map";

import {todo} from './todo';
import {environment} from "../../environments/environment";

@Injectable()
export class TodoListService {
    private todoUrl: string = environment.API_URL + "todos";

    constructor(private http: Http) {
    }

    getTodos(): Observable<todo[]> {
        let observable: Observable<any> = this.http.request(this.todoUrl);
        return observable.map(res => res.json());
    }

    getTodosById(id: string): Observable<todo> {
        return this.http.request(this.todoUrl + "/" + id).map(res => res.json());
    }
}
