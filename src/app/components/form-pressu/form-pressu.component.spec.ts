import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPressuComponent } from './form-pressu.component';

describe('FormPressuComponent', () => {
  let component: FormPressuComponent;
  let fixture: ComponentFixture<FormPressuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPressuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPressuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
