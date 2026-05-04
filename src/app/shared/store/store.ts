import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Playlist, PlaylistState } from '../models/favourite-music.models';
import { Album, Track } from '../models/music-explore.models';

const initialState: PlaylistState = {
  playlists: [
    {
      id: crypto.randomUUID(),
      name: 'My First Playlist',
      tracks: [
        { id: 1, title: 'God Did', title_short: 'God Did', duration: 234, rank: 1, preview: '', link: '', artist: { id: 1, name: 'DJ Khaled' }, album: { id: 1, title: 'God Did', cover_small: '', cover_medium: '', cover_big: '', cover_xl: '', cover: '', link: '', type: 'album' }, type: 'track' },
        { id: 2, title: 'Rich Flex', title_short: 'Rich Flex', duration: 201, rank: 2, preview: '', link: '', artist: { id: 2, name: 'Drake' }, album: { id: 2, title: 'Her Loss', cover_small: '', cover_medium: '', cover_big: '', cover_xl: '', cover: '', link: '', type: 'album' }, type: 'track' },
        { id: 3, title: 'Die For You', title_short: 'Die For You', duration: 260, rank: 3, preview: '', link: '', artist: { id: 3, name: 'The Weeknd' }, album: { id: 3, title: 'Starboy', cover_small: '', cover_medium: '', cover_big: '', cover_xl: '', cover: '', link: '', type: 'album' }, type: 'track' },
      ],
      albums: [],
    }
  ]
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
        playlists: store
          .playlists()
          .map((playlist) => (playlist.id === id ? { ...playlist, name } : playlist)),
      });
    },

    addTrackToPlaylist(playlistId: string, track: Track) {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist,
          ),
      });
    },

    removeTrackFromPlaylist(playlistId: string, trackId: number) {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: playlist.tracks.filter((track) => track.id !== trackId) }
              : playlist,
          ),
      });
    },

    addAlbumToPlaylist(playlistId: string, album: Album) {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, albums: [...playlist.albums, album] }
              : playlist,
          ),
      });
    },

    removeAlbumFromPlaylist(playlistId: string, albumId: number) {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId ? { ...playlist, albums: playlist.albums.filter((album) => album.id !== albumId) } : playlist,
          ),
      });
    },
  })),
);
