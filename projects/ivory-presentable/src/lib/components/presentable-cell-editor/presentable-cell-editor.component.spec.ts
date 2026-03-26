import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentableCellEditorComponent } from './presentable-cell-editor.component';

describe('PresentableCellEditorComponent', () => {
  let component: PresentableCellEditorComponent;
  let fixture: ComponentFixture<PresentableCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentableCellEditorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PresentableCellEditorComponent);
    component = fixture.componentInstance;
    component.value = 'test';
    component.field = 'testField';
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with provided value', () => {
    expect(component.editValue).toBe('test');
  });

  test('should emit editComplete on Enter key', () => {
    const spy = jest.fn();
    component.editComplete.subscribe(spy);
    component.editValue = 'new value';
    
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);
    
    expect(spy).toHaveBeenCalledWith('new value');
  });

  test('should emit editCancel on Escape key', () => {
    const spy = jest.fn();
    component.editCancel.subscribe(spy);
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeyDown(event);
    
    expect(spy).toHaveBeenCalled();
  });
});
