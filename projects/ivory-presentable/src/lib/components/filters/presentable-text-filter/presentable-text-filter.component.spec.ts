import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentableTextFilterComponent } from './presentable-text-filter.component';

describe('PresentableTextFilterComponent', () => {
  let component: PresentableTextFilterComponent;
  let fixture: ComponentFixture<PresentableTextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentableTextFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentableTextFilterComponent);
    component = fixture.componentInstance;
    
    // Set required input
    component.column = { field: 'test', filterType: 'text' };
    
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
