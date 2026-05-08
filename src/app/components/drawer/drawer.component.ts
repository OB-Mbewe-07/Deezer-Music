import { Component, model, input, output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [DrawerModule, ButtonModule],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  visible = model(false);
  position = input<'left' | 'right'>('left');
  drawerClosed = output<string>();
  router = inject(Router);

  navItems = [
    { label: 'Search', icon: 'pi pi-search', route: '/' },
    { label: 'Explore', icon: 'pi pi-compass', route: '/explore' },
  ];

  navigate(route: string) {
    this.visible.set(false);
    setTimeout(() => {
      this.router.navigate([route]);
    }, 200);
  }
}
