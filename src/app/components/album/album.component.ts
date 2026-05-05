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

@Component({
  standalone: true,
  templateUrl: './album.component.html',
  imports: [DialogModule, ButtonModule],
})
export class AlbumComponent implements OnInit, OnDestroy {
  private store = inject(FavouritesStore);
  private playlistService = inject(PlaylistService);
  private musicApi = inject(MusicExploreService);
  private musicFormat = inject(MusicFormatService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private subscription = new Subscription();
  playlists = this.store.playlists;
  id: number | null = null;
  album: Album | null = null;
  tracks: Track[] | null = null;
  showAddTrack: boolean = false;
  activeTrack: Track | null = null;
  hoveredTrackId: number | null = null;
  releaseDate : string = ""
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
            if(this.tracks){
              this.releaseDate = this.playlistService.findReleaseDate(this.tracks);
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

  showAddTrackDialog() {
    this.showAddTrack = true;
  }

  setAddToPlaylist(playlist: Playlist) {
    if (this.activeTrack && !this.playlistService.existsInPlaylist(playlist, this.activeTrack)) {
      this.store.addTrackToPlaylist(playlist.id, this.activeTrack);
      this.showAddTrack = false;
    }else{
      //means the song exists in the playlist

    }
  }

  setActiveTrack(track: Track) {
    this.activeTrack = track;
  }

  formatDuration(seconds: number) {
    return this.musicFormat.formatDuration(seconds);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
