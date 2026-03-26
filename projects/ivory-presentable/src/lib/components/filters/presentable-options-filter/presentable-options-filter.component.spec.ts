import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentableOptionsFilterComponent } from './presentable-options-filter.component';

describe('PresentableOptionsFilterComponent', () => {
  let component: PresentableOptionsFilterComponent;
  let fixture: ComponentFixture<PresentableOptionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentableOptionsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentableOptionsFilterComponent);
    component = fixture.componentInstance;
    
    // Set required input
    component.column = { field: 'test', filterType: 'options' };
    
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
