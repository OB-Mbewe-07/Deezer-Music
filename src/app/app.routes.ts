import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/search/search.component';
import { ArtistsAlbumTracksComponent } from './components/search-results/search-results.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'search-results',
    component: ArtistsAlbumTracksComponent,
  },
];
