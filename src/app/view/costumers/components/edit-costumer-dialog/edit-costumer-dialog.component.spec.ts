import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostumerDialogComponent } from './edit-costumer-dialog.component';

describe('EditCostumerDialogComponent', () => {
  let component: EditCostumerDialogComponent;
  let fixture: ComponentFixture<EditCostumerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCostumerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCostumerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
