import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import {
  DeezerChartResponse,
  Track,
  Album,
  Artist,
} from '../../shared/models/music-explore.models';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';
import { NowPlayingService } from '../../shared/services/music-player/music-player';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, PaginatorModule, NavbarComponent],
  templateUrl: './explore.component.html',
})
export class ExploreComponent implements OnInit {
  private musicApi = inject(MusicExploreService);
  private nowPlaying = inject(NowPlayingService);
  private musicFormat = inject(MusicFormatService);
  router = inject(Router);

  exploreData: DeezerChartResponse | null = null;
  isLoading = signal(true);
  error = signal(false);

  allTracks: Track[] = [];
  pagedTracks: Track[] = [];
  first = 0;
  rows = 8;

  artists: Artist[] = [];
  albums: Album[] = [];

  hoveredTrackId: number | null = null;

  ngOnInit(): void {
    this.musicApi.getExploreData().subscribe({
      next: (data) => {
        this.exploreData = data;
        this.allTracks = data.tracks.data;
        this.artists = data.artists.data;
        this.albums = data.albums.data;

        this.updatePagedTracks();
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  updatePagedTracks(): void {
    this.pagedTracks = this.allTracks.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedTracks();
  }

  playTrack(track: Track): void {
    this.nowPlaying.play(track);
  }

  formatDuration(seconds: number): string {
    return this.musicFormat.formatDuration(seconds);
  }
}
