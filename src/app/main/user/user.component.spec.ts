import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/service/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService:UserService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    userService=TestBed.inject(UserService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoul call function in ngOnInit',()=>{
spyOn(component,'usersList')
component.ngOnInit()
expect(component.usersList).toHaveBeenCalled()
  })
});
