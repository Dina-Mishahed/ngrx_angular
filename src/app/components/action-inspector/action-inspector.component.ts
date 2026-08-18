import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActionLogs } from '../../state/products.selectors';

@Component({
  selector: 'app-action-inspector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-inspector.component.html',
  styleUrl: './action-inspector.component.css'
})
export class ActionInspectorComponent {
  private store = inject(Store);
  logs = this.store.selectSignal(selectActionLogs);
}
