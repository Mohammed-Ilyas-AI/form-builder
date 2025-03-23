import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftPaneComponent } from './left-pane.component';
import { FieldGroupService } from '../../services/field-group.service';
import { StorageService } from '../../services/storage.service';
import { of } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('LeftPaneComponent', () => {
  let component: LeftPaneComponent;
  let fixture: ComponentFixture<LeftPaneComponent>;
  let fieldGroupService: jasmine.SpyObj<FieldGroupService>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const fieldGroupSpy = jasmine.createSpyObj('FieldGroupService', ['getFieldGroups', 'addFieldGroup']);
    const storageSpy = jasmine.createSpyObj('StorageService', ['setSelectedFieldGroup']);

    await TestBed.configureTestingModule({
      imports: [LeftPaneComponent, DragDropModule], // ✅ Fix: Import standalone component
      providers: [
        { provide: FieldGroupService, useValue: fieldGroupSpy },
        { provide: StorageService, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeftPaneComponent);
    component = fixture.componentInstance;
    fieldGroupService = TestBed.inject(FieldGroupService) as jasmine.SpyObj<FieldGroupService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load field groups on init', () => {
    const mockGroups = [
      { id: 1, name: 'Test Group 1', description: 'Desc 1', elements: [] },
      { id: 2, name: 'Test Group 2', description: 'Desc 2', elements: [] }
    ];
    fieldGroupService.fieldGroups$ = of(mockGroups);
    component.ngOnInit();
    expect(component.fieldGroups.length).toBe(2);
  });

  it('should call addFieldGroup on create button click', () => {
    component.createFieldGroup();
    expect(fieldGroupService.addFieldGroup).toHaveBeenCalledWith('New Field Group', 'Enter description here...');
  });

  it('should call setSelectedFieldGroup when a field group is clicked', () => {
    const mockGroup = { id: 1, name: 'Test Group', description: 'Desc', elements: [] };
    component.selectFieldGroup(mockGroup);
    expect(storageService.setSelectedFieldGroup).toHaveBeenCalledWith(mockGroup);
  });
});
