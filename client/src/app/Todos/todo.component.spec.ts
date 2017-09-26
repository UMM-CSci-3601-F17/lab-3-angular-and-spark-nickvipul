import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoComponent} from "./todo.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";
//import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
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
            ].find(todo => todo._id === todoId))
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Pan by ID", () => {
        todoComponent.setId("pan_id");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Pan");
        expect(todoComponent.todo.category).toBe("pan@somewhere.com");
    });

    it("returns undefined for stuff", () => {
        todoComponent.setId("stuff");
        expect(todoComponent.todo).not.toBeDefined();
    });

});
