import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import {
  Album,
  Artist,
  DeezerSearchResponse,
  Track,
} from '../../shared/models/music-explore.models';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription, switchMap } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  templateUrl: './search-result.component.html',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule, NavbarComponent],
})
export class ArtistsAlbumTracksComponent implements OnInit, OnDestroy{
  private information = inject(MusicExploreService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private subscription = new Subscription();
  results: DeezerSearchResponse | undefined = undefined;
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams
        .pipe(
          filter((params) => !!params['q']),
          switchMap((params) => this.information.searchAll(params['q'])),
        )
        .subscribe({
          next: (data) => {
            this.results = data;
            this.tracks = data.tracks.data.slice(0, 10);
            this.artists = data.artists.data.slice(0, 10);
            this.albums = data.albums.data.slice(0, 8);
            this.cdr.detectChanges();
          },
        }),
    );
  }

  formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
