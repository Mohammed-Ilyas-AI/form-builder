import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPaneComponent } from './left-pane.component';

describe('LeftPaneComponent', () => {
  let component: LeftPaneComponent;
  let fixture: ComponentFixture<LeftPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
