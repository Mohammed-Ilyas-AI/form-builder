import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  private draggedItem = new BehaviorSubject<any>(null);

  setDraggedItem(item: any): void {
    this.draggedItem.next(item);
  }

  getDraggedItem() {
    return this.draggedItem.asObservable();
  }
}
