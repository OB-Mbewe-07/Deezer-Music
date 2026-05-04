import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Playlist, PlaylistState } from '../models/favourite-music.models';
import { Album, Track } from '../models/music-explore.models';

const initialState: PlaylistState = {
  playlists: [],
};
export const FavouritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({
    createPlaylist(name: string) {
      const playlist: Playlist = {
        id: crypto.randomUUID(),
        name,
        tracks: [],
        albums: [],
      };
      patchState(store, { playlists: [...store.playlists(), playlist] });
    },

    deletePlaylist(id: string) {
      patchState(store, { playlists: store.playlists().filter((playlist) => playlist.id !== id) });
    },

    renamePlaylist(id: string, name: string) {
      patchState(store, {
        playlists: store.playlists().map((playlist) => (playlist.id === id ? { ...playlist, name } : playlist)),
      });
    },

    addTrackToPlaylist(playlistId: string, track: Track) {
      patchState(store, {
        playlists: store.playlists().map(playlist =>
          playlist.id === playlistId ? { ...playlist, tracks: [...playlist.tracks, track] } : playlist
        )
      });
    },

    removeTrackFromPlaylist(playlistId: string, trackId: number) {
      patchState(store, {
        playlists: store.playlists().map(playlist =>
          playlist.id === playlistId ? { ...playlist, tracks: playlist.tracks.filter(t => t.id !== trackId) } : playlist
        )
      });
    },

    addAlbumToPlaylist(playlistId: string, album: Album) {
      patchState(store, {
        playlists: store.playlists().map(playlist =>
          playlist.id === playlistId ? { ...playlist, albums: [...playlist.albums, album] } : playlist
        )
      });
    },

    removeAlbumFromPlaylist(playlistId: string, albumId: number) {
      patchState(store, {
        playlists: store.playlists().map(p =>
          p.id === playlistId ? { ...p, albums: p.albums.filter(a => a.id !== albumId) } : p
        )
      });
    },
  })),
);
