import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    _id: "christopher_id",
                    owner: "Christopher",
                    status: false,
                    body: "UMN",
                    category: "christopher@that.this"
                },
                {
                    _id: "pan_id",
                    owner: "Pan",
                    status: true,
                    body: "Intel",
                    category: "pan@somewhere.com"
                },
                {
                    _id: "jamison_id",
                    owner: "Jamison",
                    status: false,
                    body: "Fish, Inc.",
                    category: "jamie@fish.com"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
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

    it("contains a todo owned by 'Christopher'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Christopher")).toBe(true);
    });

    it("contain a todo owned by 'Jamison'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamison")).toBe(true);
    });

    it("contain a todo owned by 'Jamison'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamison")).toBe(true);
    });

    it("doesn't contain a todo owned by 'stuff'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "stuff")).toBe(false);
    });

    it("has two todos that are false years old", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status == false).length).toBe(2);
    });

    it("contains a todo with the body  'Fish, Inc.", () => {
        expect(todoList.todos.some((todo: Todo) => todo.body === "Fish, Inc.")).toBe(true);
    });

    it("contains a todo with the body  'pan@somewhere.com", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "pan@somewhere.com")).toBe(true);
    });

});

describe("Misbehaving Todo List", () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
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
        // Since the observer throws an error, we don't expect todos to be defined.
        expect(todoList.todos).toBeUndefined();
    });
});
