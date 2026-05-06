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
  onDrawerClosed = output<string>();
  router = inject(Router);

  navItems = [
    { label: 'Explore', icon: 'pi-compass', route: '/' },
    { label: 'History', icon: 'pi-history', route: '/favourites' },
  ];

  navigate(route: string) {
    this.router.navigate([route]);
    this.visible.set(false);
  }
}
