import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/search/search.component';
import { ArtistsAlbumTracksComponent } from './components/search-results/search-results.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'search-results',
    component: ArtistsAlbumTracksComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistComponent
  },
  {
    path: 'album/:id',
    component: AlbumComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
