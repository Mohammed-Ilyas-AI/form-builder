import { Component } from '@angular/core';
import { LeftPaneComponent } from './left-pane/left-pane.component';
import { MiddlePaneComponent } from './middle-pane/middle-pane.component';
import { RightPaneComponent } from './right-pane/right-pane.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftPaneComponent, MiddlePaneComponent, RightPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-builder';
}
