import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  template: `
    <nav class="sticky top-0 z-1000 bg-[#121212]/80  border-b border-white/5 px-4 py-3">
      <div class="flex items-center justify-between w-full max-w-7xl mx-auto gap-4">
        <div class="flex items-center gap-2 shrink-0">
          <app-drawer [(visible)]="drawerVisible" position="left" />
          <button
            class="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
            (click)="drawerVisible = true"
          >
            <i class="pi pi-bars text-xl"></i>
          </button>
        </div>

        <div class="relative grow max-w-md group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i
              class="pi pi-search text-gray-400 group-focus-within:text-white transition-colors text-sm"
            ></i>
          </div>

          <input
            type="text"
            [(ngModel)]="search"
            (keyup.enter)="onSearch()"
            placeholder="What do you want to listen to?"
            class="w-full h-11 bg-[#242424] text-white text-sm rounded-full pl-11 pr-12 
               border border-transparent focus:border-white/20 focus:bg-[#2a2a2a] 
               outline-none transition-all placeholder:text-gray-500"
          />

          <button
            (click)="onSearch()"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1db954] 
               text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            <i class="pi pi-arrow-right text-[10px] font-bold"></i>
          </button>
        </div>
      </div>
    </nav>
  `,
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, FormsModule, DrawerComponent],
})
export class NavbarComponent {
  search: string = '';
  drawerVisible = false;
  router = inject(Router);
  onSearch() {
    const query = this.search.trim();
    if (!query) return;

    this.drawerVisible = false;

    this.router.navigate(['/search-results'], {
      queryParams: { q: query },
      queryParamsHandling: 'merge',
    });
  }
}
