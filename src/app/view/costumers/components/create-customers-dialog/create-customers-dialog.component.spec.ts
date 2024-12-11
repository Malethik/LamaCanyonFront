import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomersDialogComponent } from './create-customers-dialog.component';

describe('CreateCustomersDialogComponent', () => {
  let component: CreateCustomersDialogComponent;
  let fixture: ComponentFixture<CreateCustomersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
