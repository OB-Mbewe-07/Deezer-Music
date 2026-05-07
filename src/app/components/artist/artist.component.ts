import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, Artist, Track } from '../../shared/models/music-explore.models';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { NowPlayingService } from '../../shared/services/music-player/music-player';

@Component({
  templateUrl: './artist.component.html',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProgressSpinnerModule],
})
export class ArtistComponent implements OnInit, OnDestroy {
  private musicApi = inject(MusicExploreService);
  private musicPlayer = inject(NowPlayingService)
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private musicFormat = inject(MusicFormatService);
  private subscription = new Subscription;
  id: number | null = null;
  artist: Artist | null = null;
  albums: Album[] | null = null;
  tracks: Track[] | null = null;
  router = inject(Router);

  ngOnInit(): void {

    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.id = params['id'];
      }),
    );

    if (this.id) {
      this.subscription.add(
        this.musicApi.getArtistById(this.id).subscribe({
          next: (data) => {
            this.artist = data.artist;
            this.albums = data.albums.data.slice(0,8);
            this.tracks = data.tracks.data;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
          },
        }),
      );
    }
  }

   playTrack(track: Track): void {
    this.musicPlayer.play(track);
  }

  formatDuration(seconds: number): string{
    return this.musicFormat.formatDuration(seconds);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
