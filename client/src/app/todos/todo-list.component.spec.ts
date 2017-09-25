import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<todo[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "nick_id",
                    owner: "Nick",
                    status: true,
                    body: "UMM",
                    category: "student"
                },
                {
                    id: "vipul_id",
                    owner: "Vipul",
                    status: false,
                    body: "UMM",
                    category: "person"
                },
                {
                    id: "nic_id",
                    owner: "Nic",
                    status: true,
                    body: "UMM",
                    category: "professor"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a todo named 'Nick'", () => {
        expect(todoList.todos.some((todo: todo) => todo.name === "Nick")).toBe(true);
    });

    it("contain a todo named 'Vipul'", () => {
        expect(todoList.todos.some((todo: todo) => todo.name === "Vipul")).toBe(true);
    });

    it("doesn't contain a todo named 'Santa'", () => {
        expect(todoList.todos.some((todo: todo) => todo.name === "Santa")).toBe(false);
    });

    it("has two todos that are true", () => {
        expect(todoList.todos.filter((todo: todo) => todo.status === true).length).toBe(2);
    });

});

describe("Misbehaving Todo List", () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<todo[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            declarations: [TodoListComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a TodoListService", () => {
        // Since the observer throws an error, we don't expect users to be defined.
        expect(todoList.users).toBeUndefined();
    });
});
