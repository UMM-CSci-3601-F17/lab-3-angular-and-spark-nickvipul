import {Component, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {todo} from "./todo";

@Component({
    selector: 'todo-component',
    templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
    public todo: todo = null;
    private id: string;

    constructor(private todoListService: TodoListService) {
        // this.todos = this.todoListService.getTodos();
    }

    private subscribeToServiceForId() {
        if (this.id) {
            this.todoListService.getTodosById(this.id).subscribe(
                todo => this.todo = todo,
                err => {
                    console.log(err);
                }
            );
        }
    }

    setId(id: string) {
        this.id = id;
        this.subscribeToServiceForId();
    }

    ngOnInit(): void {
        this.subscribeToServiceForId();
    }
}
