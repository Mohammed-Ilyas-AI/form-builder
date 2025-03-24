import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftPaneComponent } from './left-pane.component';
import { FieldGroupService } from '../../services/field-group.service';
import { StorageService } from '../../services/storage.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../../models/field-group';
import { CommonModule } from '@angular/common';

describe('LeftPaneComponent', () => {
  let component: LeftPaneComponent;
  let fixture: ComponentFixture<LeftPaneComponent>;
  let fieldGroupService: jasmine.SpyObj<FieldGroupService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let mockFieldGroups$: BehaviorSubject<FieldGroup[]>;
  let mockSelectedFieldGroup$: BehaviorSubject<FieldGroup | null>;

  beforeEach(async () => {
    const mockFieldGroups: FieldGroup[] = [
      { id: 1, name: 'AMC Reports', description: 'Report details', elements: [], type: 'default' },
      { id: 2, name: 'HVAC Repair', description: 'HVAC service details', elements: [], type: 'created' },
      { id: 3, name: 'Electrical Inspection', description: 'Inspection details', elements: [], type: 'copied' }
    ];

    mockFieldGroups$ = new BehaviorSubject<FieldGroup[]>(mockFieldGroups);
    mockSelectedFieldGroup$ = new BehaviorSubject<FieldGroup | null>(null);

    fieldGroupService = jasmine.createSpyObj('FieldGroupService', ['addFieldGroup']);
    Object.defineProperty(fieldGroupService, 'fieldGroups$', { get: () => mockFieldGroups$.asObservable() });

    storageService = jasmine.createSpyObj('StorageService', ['setSelectedFieldGroup']);
    Object.defineProperty(storageService, 'selectedFieldGroup$', { get: () => mockSelectedFieldGroup$.asObservable() });

    await TestBed.configureTestingModule({
      imports: [CommonModule, DragDropModule, LeftPaneComponent],
      providers: [
        { provide: FieldGroupService, useValue: fieldGroupService },
        { provide: StorageService, useValue: storageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeftPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categorized field groups on init', () => {
    fixture.detectChanges();
    expect(component.defaultFieldGroups.length).toBe(1);
    expect(component.createdFieldGroups.length).toBe(1);
    expect(component.copiedFieldGroups.length).toBe(1);
  });

  it('should add a new field group under "Created Field Groups"', () => {
    component.createFieldGroup();
    expect(fieldGroupService.addFieldGroup).toHaveBeenCalledWith('New Field Group', 'Enter description here...', 'created');
  });

  it('should select a field group and notify the storage service', () => {
    const mockGroup: FieldGroup = { id: 1, name: 'Test Group', description: 'Desc', elements: [], type: 'default' };
    component.selectFieldGroup(mockGroup);
    expect(storageService.setSelectedFieldGroup).toHaveBeenCalledWith(mockGroup);
  });

  it('should reorder field groups correctly within a category', () => {
    component.createdFieldGroups = [
      { id: 1, name: 'Group A', description: 'Desc A', elements: [], type: 'created' },
      { id: 2, name: 'Group B', description: 'Desc B', elements: [], type: 'created' }
    ];

    const event = { previousIndex: 0, currentIndex: 1 } as any;
    component.reorderGroups(event, 'created');

    expect(component.createdFieldGroups[0].id).toBe(2);
    expect(component.createdFieldGroups[1].id).toBe(1);
  });

  it('should highlight the selected field group', () => {
    const mockGroup: FieldGroup = { id: 2, name: 'HVAC Repair', description: 'Desc', elements: [], type: 'created' };
    mockSelectedFieldGroup$.next(mockGroup);
    fixture.detectChanges();
    expect(component.selectedGroupId).toBe(mockGroup.id);
  });
});
