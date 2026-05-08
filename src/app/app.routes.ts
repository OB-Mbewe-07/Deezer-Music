import { Routes } from '@angular/router';
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
    path: 'explore',
    loadComponent: () => import('./components/explore/explore.component').then(m => m.ExploreComponent)
  },
  {
    path: '**',
    loadComponent:() => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
