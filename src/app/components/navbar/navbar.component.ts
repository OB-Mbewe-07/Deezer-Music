import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  template: `
    <div class="card m-[1.5%]">
      <p-menubar>
        <ng-template #start>
          <div class="flex items-center">
            <div>
              <app-drawer [(visible)]="drawerVisible" position="left" />
              <button
                class="w-8 h-8 rounded-full flex items-center justify-center mb-[1%]"
                style="
                  border: 1px solid var(--p-inputtext-border-color);
                  background: transparent;
                  color: var(--p-inputtext-color);
                "
                (click)="drawerVisible = true"
              >
                <i class="pi pi-bars" style="font-size: 13px"></i>
              </button>
            </div>
            <div class="flex justify-center w-full" style="max-width: 100%;">
              <p-floatlabel variant="on" style="position: relative; width: 100%; max-width: 400px;">
                <input
                  pInputText
                  id="on_label"
                  [(ngModel)]="search"
                  (keypress.enter)="router.navigate(['/search-results'], { queryParams: { q: search } })"
                  autocomplete="off"
                  style="width: 100%; border-radius: 24px; height: 40px; font-size: 0.9rem; padding-right: 3.5rem;"
                />
                <label for="on_label">Artists, Records & Albums</label>
                <button
                  style="
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1px solid var(--p-inputtext-border-color);
                    background: var(--p-inputtext-background);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--p-inputtext-color);
                  "
                  (click)="router.navigate(['/search-results'], { queryParams: { q: search } })"
                >
                  <i class="pi pi-arrow-right" style="font-size: 11px;"></i>
                </button>
              </p-floatlabel>
            </div>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `,
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, FloatLabel, FormsModule, DrawerComponent],
})
export class NavbarComponent {
  search: string = '';
  drawerVisible = false;
  router = inject(Router);
}
