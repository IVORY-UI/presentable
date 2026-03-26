import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentableRowComponent } from './presentable-row.component';

describe('PresentableRowComponent', () => {
  let component: PresentableRowComponent;
  let fixture: ComponentFixture<PresentableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
