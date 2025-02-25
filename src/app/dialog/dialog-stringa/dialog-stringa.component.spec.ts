import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStringaComponent } from './dialog-stringa.component';

describe('DialogStringaComponent', () => {
  let component: DialogStringaComponent;
  let fixture: ComponentFixture<DialogStringaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogStringaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStringaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
