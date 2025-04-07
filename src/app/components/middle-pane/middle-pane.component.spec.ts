import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiddlePaneComponent } from './middle-pane.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { FieldGroup } from '../../models/field-group';

describe('MiddlePaneComponent', () => {
  let component: MiddlePaneComponent;
  let fixture: ComponentFixture<MiddlePaneComponent>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  const testGroup: FieldGroup = {
    id: 1,
    name: 'Test Group',
    description: 'Test Description',
    type: 'default',
    elements: []
  };

  beforeEach(async () => {
    mockStorageService = jasmine.createSpyObj('StorageService', [
      'updateSelectedFieldGroup',
      'deleteSelectedFieldGroup',
      'copySelectedFieldGroup',
      'selectedFieldGroup$'
    ], {
      selectedFieldGroup$: of(testGroup)
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MiddlePaneComponent],
      providers: [{ provide: StorageService, useValue: mockStorageService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form and set field group data', () => {
    expect(component.form).toBeTruthy();
    expect(component.fieldGroups.length).toBe(1);
    expect(component.fieldGroups.at(0).value.title).toBe('Test Group');
  });

  it('should enter and exit edit mode', () => {
    component.enterEditMode();
    expect(component.isEditMode).toBeTrue();

    component.cancelEdit();
    expect(component.isEditMode).toBeFalse();
  });

  it('should save changes to selected group', () => {
    component.enterEditMode();
    component.fieldGroups.at(0).patchValue({ title: 'Updated', description: 'Changed' });
    component.saveChanges();

    expect(mockStorageService.updateSelectedFieldGroup).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Updated', description: 'Changed' })
    );
    expect(component.isEditMode).toBeFalse();
  });

  it('should call copy and delete methods', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.copyGroup();
    expect(mockStorageService.copySelectedFieldGroup).toHaveBeenCalled();

    component.deleteGroup();
    expect(mockStorageService.deleteSelectedFieldGroup).toHaveBeenCalled();
  });
});
