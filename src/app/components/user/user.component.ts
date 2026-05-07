import { Component, inject } from '@angular/core';
import { UserProfile } from '../../shared/models/user-data.model';
import { FavouritesStore } from '../../shared/store/store';
import { Playlist } from '../../shared/models/favourite-music.models';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';
import { CreatePlaylistButtonComponent } from '../button-playlist/button-playlist.component';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "../navbar/navbar.component";
import { NowPlayingService } from '../../shared/services/music-player/music-player';
import { Track } from '../../shared/models/music-explore.models';

@Component({
  standalone: true,
  templateUrl: './user.component.html',
  imports: [CreatePlaylistButtonComponent, ButtonModule, NavbarComponent],
})
export class UserComponent {
  private store = inject(FavouritesStore);
  private musicFormat = inject(MusicFormatService);
  private musicPlayerService = inject(NowPlayingService)
  playlists = this.store.playlists;
  hoveredTrackId: number | null = null;
  activeplaylist: Playlist | null = null;
  defaultUser: UserProfile = {
    id: '',
    name: 'Guest',
    email: '',
    avatar: 'https://img.icons8.com/?size=190&id=E2LI0GQ7_ToC&format=png&color=000000',
    totalPlaylists: 0,
    totalFavourites: 0,
  };

  setActivePlaylist(playlist: Playlist): void {
    this.activeplaylist = this.playlists().find(p => p.id === playlist.id) ?? null;
  }

  formatDuration(seconds: number): string {
    return this.musicFormat.formatDuration(seconds);
  }

  getTotalTime(): string {
    let totalSeconds = 0;
    for (const playlist of this.playlists()) {
      totalSeconds += playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
    }
    return this.musicFormat.formatDuration(totalSeconds);
  }

  playTrack(track: Track){
    this.musicPlayerService.play(track);
  }

  deleteTrack() {
    if (this.activeplaylist && this.hoveredTrackId) {
      this.store.removeTrackFromPlaylist(this.activeplaylist.id, this.hoveredTrackId);
      this.setActivePlaylist(this.activeplaylist);
    };
  };
}
