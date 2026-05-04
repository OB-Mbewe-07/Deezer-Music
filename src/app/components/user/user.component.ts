import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../shared/models/user-data.model';
import { FavouritesStore } from '../../shared/store/store';
import { Playlist } from '../../shared/models/favourite-music.models';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';

@Component({
  standalone: true,
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
  private store = inject(FavouritesStore);
  private musicFormat = inject(MusicFormatService);
  totalSeconds: number = 0;
  playlists : Playlist[] = [];
  activeplaylist: Playlist | null = null; 
  defaultUser: UserProfile = {
    id: '',
    name: 'Guest',
    email: '',
    avatar: 'https://img.icons8.com/?size=190&id=E2LI0GQ7_ToC&format=png&color=000000',
    totalPlaylists: 0,
    totalFavourites: 0,
  };

  ngOnInit(): void {
    this.playlists = this.store.playlists();
  }

  setActivePlaylist(playlist: Playlist): void{
    this.activeplaylist = playlist;
    this.totalSeconds = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  }

  formatDuration(seconds: number): string{
    return this.musicFormat.formatDuration(seconds); 
  }

  getTotalTime(): string{
    const strTime = this.musicFormat.formatDuration(this.totalSeconds); 

    return strTime;
  }
}
