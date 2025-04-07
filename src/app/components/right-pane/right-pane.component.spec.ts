import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightPaneComponent } from './right-pane.component';
import { FormElementService, FormCategory } from '../../services/form-element.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('RightPaneComponent', () => {
  let component: RightPaneComponent;
  let fixture: ComponentFixture<RightPaneComponent>;
  let mockService: jasmine.SpyObj<FormElementService>;

  const mockCategories: FormCategory[] = [
    {
      category: 'Input',
      fields: [{ id: '1', category: 'Input', label: 'Text Field', type: 'text', icon: 'fas fa-font' }]
    },
    {
      category: 'Selection',
      fields: [{ id: '2', category: 'Selection', label: 'Checkbox', type: 'checkbox', icon: 'fas fa-check-square' }]
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FormElementService', ['filterCategories'], {
      categories$: of(mockCategories)
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, DragDropModule, RightPaneComponent],
      providers: [{ provide: FormElementService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RightPaneComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(FormElementService) as jasmine.SpyObj<FormElementService>;

    mockService.filterCategories.and.returnValue(mockCategories);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories from service on init', () => {
    expect(component.categories.length).toBe(2);
  });

  it('should filter categories based on search query', () => {
    component.searchQuery = 'Text';
    const result = component.filteredCategories;
    expect(result[0].fields[0].label).toContain('Text');
  });

  it('should set drag data on dragstart', () => {
    const event = new DragEvent('dragstart', { dataTransfer: new DataTransfer() });
    const element = { label: 'Text Field', type: 'text', icon: 'fas fa-font' };
    component.onDragStart(event, element);

    expect(event.dataTransfer?.getData('formElement')).toBe(JSON.stringify(element));
  });
});
