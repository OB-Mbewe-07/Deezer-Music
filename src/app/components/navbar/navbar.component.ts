import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  template: `
    <div class="card m-[1.5%]">
      <p-menubar [model]="items" />
    </div>
  `,
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Explore',
        icon: 'pi pi-compass',
        routerLink: '/',
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        routerLink: '/search-results',
      },
      {
        label: 'Charts',
        icon: 'pi pi-chart-bar',
        routerLink: '/charts',
      },
      {
        label: 'Favourites',
        icon: 'pi pi-heart',
        routerLink: '/favourites',
      },
    ];
  }
}
