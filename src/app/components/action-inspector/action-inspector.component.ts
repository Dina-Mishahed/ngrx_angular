import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActionLogs } from '../../state/products.selectors';

@Component({
  selector: 'app-action-inspector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inspector-card">
      <div class="inspector-header">
        <div class="header-title">
          <span class="live-dot"></span>
          <h3>🕹️ NgRx Live Action Inspector</h3>
        </div>
        <span class="subtext">سجل الأكشن المتدفقة مباشرةً في الـ Store</span>
      </div>

      <div class="logs-container">
        @if (logs().length === 0) {
          <div class="empty-logs">
            <p>لا توجد الأكشنز حتى الآن...</p>
          </div>
        } @else {
          <div class="logs-list">
            @for (log of logs(); track log.id) {
              <div class="log-item" [class.api-action]="log.actionType.includes('API')" [class.cart-action]="log.actionType.includes('Cart')">
                <span class="log-time">{{ log.timestamp }}</span>
                <span class="log-type">{{ log.actionType }}</span>
                @if (log.payload) {
                  <span class="log-payload">{{ log.payload | json }}</span>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .inspector-card {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
      padding: 1.25rem;
      margin-top: 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }
    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 0.75rem;
    }
    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .header-title h3 {
      margin: 0;
      font-size: 1.05rem;
      color: #f1f5f9;
    }
    .live-dot {
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
      animation: blink 1.2s infinite alternate;
    }
    @keyframes blink {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }
    .subtext {
      font-size: 0.8rem;
      color: #64748b;
    }
    .logs-container {
      max-height: 220px;
      overflow-y: auto;
    }
    .empty-logs {
      text-align: center;
      padding: 1.5rem;
      color: #475569;
    }
    .logs-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .log-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(30, 41, 59, 0.7);
      border-left: 4px solid #6366f1;
      padding: 0.5rem 0.85rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.85rem;
      animation: fadeIn 0.3s ease-out;
    }
    .log-item.api-action {
      border-left-color: #38bdf8;
    }
    .log-item.cart-action {
      border-left-color: #f43f5e;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .log-time {
      color: #64748b;
      font-size: 0.75rem;
    }
    .log-type {
      color: #a78bfa;
      font-weight: bold;
    }
    .log-payload {
      color: #34d399;
      background: rgba(0, 0, 0, 0.3);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
  `]
})
export class ActionInspectorComponent {
  private store = inject(Store);
  logs = this.store.selectSignal(selectActionLogs);
}
