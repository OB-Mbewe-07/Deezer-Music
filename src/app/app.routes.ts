import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlbumComponent } from './components/album/album.component';
import { albumResolver } from './shared/resolver/route-resolver';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/search/search.component').then(m => m.LandingPageComponent),
  },
  {
    path: 'search-results',
    loadComponent: () => import( './components/search-results/search-results.component').then(m => m.ArtistsAlbumTracksComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent),
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./components/artist/artist.component').then(m => m.ArtistComponent),
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./components/album/album.component').then(m => m.AlbumComponent),
    resolve: { data: albumResolver }
  },
  {
    path: '**',
    loadComponent:() => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
