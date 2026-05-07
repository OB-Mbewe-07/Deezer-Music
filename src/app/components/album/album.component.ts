import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album, Track } from '../../shared/models/music-explore.models';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';
import { DialogModule } from 'primeng/dialog';
import { FavouritesStore } from '../../shared/store/store';
import { Playlist } from '../../shared/models/favourite-music.models';
import { ButtonModule } from 'primeng/button';
import { PlaylistService } from '../../shared/services/playlist/playlist.service';
import { NowPlayingService } from '../../shared/services/music-player/music-player';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from "../navbar/navbar.component";
import { ReleaseYearPipe } from "../../shared/pipes/release-year.pipe";

@Component({
  standalone: true,
  templateUrl: './album.component.html',
  imports: [DialogModule, ButtonModule, ToastModule, NavbarComponent, ReleaseYearPipe],
  providers: [MessageService],
})
export class AlbumComponent implements OnInit, OnDestroy {
  private store = inject(FavouritesStore);
  private messageService = inject(MessageService);
  private playlistService = inject(PlaylistService);
  private musicApi = inject(MusicExploreService);
  private musicFormat = inject(MusicFormatService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private nowPlaying = inject(NowPlayingService);
  private subscription = new Subscription();
  playlists = this.store.playlists;
  id: number | null = null;
  album: Album | null = null;
  tracks: Track[] | null = null;
  showAddTrack = false;
  activeTrack: Track | null = null;
  hoveredTrackId: number | null = null;
  releaseDate = '';
  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.id = params['id'];
      }),
    );

    if (this.id) {
      this.subscription.add(
        this.musicApi.getAlbumById(this.id).subscribe({
          next: (data) => {
            this.album = data.album;
            this.tracks = data.tracks.data;
            if (this.album) {
              this.releaseDate = this.playlistService.albumReleaseDate(this.album);
            }
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
          },
        }),
      );
    }
  }

  showToast(severity: 'success' | 'error'): void {
    switch (severity) {
      case 'success':
        this.messageService.add({
          severity: severity,
          summary: 'Confirmed',
          detail: 'Song added',
        });
        break;

      case 'error':
        this.messageService.add({
          severity: severity,
          summary: 'Check Again',
          detail: 'Song Exists in this playlist',
        });
        break;
    }
  }

  showAddTrackDialog(): void {
    this.showAddTrack = true;
  }

  setAddToPlaylist(playlist: Playlist) {
    if (this.activeTrack && !this.playlistService.existsInPlaylist(playlist, this.activeTrack)) {
      this.store.addTrackToPlaylist(playlist.id, this.activeTrack);
      this.showToast('success'); 
    } else {
      this.showToast('error');
    }
    this.showAddTrack = false;
  }

  setActiveTrack(track: Track) {
    this.activeTrack = track;
  }

  formatDuration(seconds: number) {
    return this.musicFormat.formatDuration(seconds);
  }

  onTrackClick(track: Track) {
    this.nowPlaying.play(track);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
