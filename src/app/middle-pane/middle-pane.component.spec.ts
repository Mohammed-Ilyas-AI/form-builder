import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlePaneComponent } from './middle-pane.component';

describe('MiddlePaneComponent', () => {
  let component: MiddlePaneComponent;
  let fixture: ComponentFixture<MiddlePaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddlePaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddlePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
