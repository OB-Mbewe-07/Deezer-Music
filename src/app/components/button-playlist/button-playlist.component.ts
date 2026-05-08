import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FavouritesStore } from '../../shared/store/store';
import { Playlist } from '../../shared/models/favourite-music.models';

@Component({
  templateUrl: './button-playlist.component.html',
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, DialogModule, FloatLabelModule, InputTextModule, FormsModule],
})
export class CreatePlaylistButtonComponent {
  private store = inject(FavouritesStore);
  visibleCreatePlaylist = false;
  visibleDeletePlaylist = false;
  visibleRenamePlaylist = false;
  playlists: Playlist[] = [];
  playlistName = '';

  selectedPlaylist: Playlist | null = null;
  newPlaylistName = '';

  showCreatePlaylist() {
    this.visibleCreatePlaylist = true;
    this.visibleDeletePlaylist = false;
    this.visibleRenamePlaylist = false;
  }
  showDeletePlaylist() {
    this.playlists = [...this.store.playlists()];
    this.visibleDeletePlaylist = true;
    this.visibleCreatePlaylist = false;
    this.visibleRenamePlaylist = false;
  }

  showRenamePlaylist() {
    this.playlists = [...this.store.playlists()];
    this.visibleDeletePlaylist = false;
    this.visibleCreatePlaylist = false;
    this.visibleRenamePlaylist = true;
  }
  create() {
    if (this.playlistName.trim()) {
      this.store.createPlaylist(this.playlistName);
      this.playlistName = '';
      this.visibleCreatePlaylist = false;
    }
  }
  deletePlaylist(id: string) {
    this.store.deletePlaylist(id);
    if (this.store.playlists().length === 0) {
      this.visibleDeletePlaylist = false;
    }
  }

  selectPlaylistToRename(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    this.newPlaylistName = playlist.name;
  }
  renamePlaylist() {
    if (this.selectedPlaylist && this.newPlaylistName) {
      this.store.renamePlaylist(this.selectedPlaylist.id, this.newPlaylistName);
      this.visibleRenamePlaylist = false;
    }
  }
}
