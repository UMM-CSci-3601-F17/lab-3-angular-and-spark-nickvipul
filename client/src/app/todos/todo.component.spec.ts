import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {todo} from "./todo";
import {TodoComponent} from "./todo.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";
//import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getUserById: (TodoId: string) => Observable<todo>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getUserById: (TodoId: string) => Observable.of([
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
            ].find(user => user.id === TodoId))
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

    it("can retrieve Nick by ID", () => {
        todoComponent.setId("nick_id");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Nick");
        expect(todoComponent.user.category).toBe("student");
    });

    it("returns undefined for Santa", () => {
        todoComponent.setId("Santa");
        expect(todoComponent.todo).not.toBeDefined();
    });

});
