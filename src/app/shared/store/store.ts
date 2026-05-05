import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Playlist, PlaylistState } from '../models/favourite-music.models';
import { Album, Track } from '../models/music-explore.models';
import { IndexedDbService } from '../services/indexedDb/indexedDb.service';
import { inject } from '@angular/core';

const initialState: PlaylistState = {
  playlists: [
    {
      id: crypto.randomUUID(),
      name: 'My First Playlist',
      tracks: [
        {
          id: 1,
          title: 'God Did',
          title_short: 'God Did',
          duration: 234,
          rank: 1,
          preview: '',
          link: '',
          artist: { id: 1, name: 'DJ Khaled' },
          album: {
            id: 1,
            title: 'God Did',
            cover_small: '',
            cover_medium: '',
            cover_big: '',
            cover_xl: '',
            cover: '',
            link: '',
            type: 'album',
          },
          type: 'track',
        },
        {
          id: 2,
          title: 'Rich Flex',
          title_short: 'Rich Flex',
          duration: 201,
          rank: 2,
          preview: '',
          link: '',
          artist: { id: 2, name: 'Drake' },
          album: {
            id: 2,
            title: 'Her Loss',
            cover_small: '',
            cover_medium: '',
            cover_big: '',
            cover_xl: '',
            cover: '',
            link: '',
            type: 'album',
          },
          type: 'track',
        },
        {
          id: 3,
          title: 'Die For You',
          title_short: 'Die For You',
          duration: 260,
          rank: 3,
          preview: '',
          link: '',
          artist: { id: 3, name: 'The Weeknd' },
          album: {
            id: 3,
            title: 'Starboy',
            cover_small: '',
            cover_medium: '',
            cover_big: '',
            cover_xl: '',
            cover: '',
            link: '',
            type: 'album',
          },
          type: 'track',
        },
      ],
      albums: [],
    },
  ],
};

export const FavouritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, db = inject(IndexedDbService)) => ({
    async loadPlaylists() {
      const playlists = await db.getAll();
      patchState(store, { playlists });
    },
    async createPlaylist(name: string) {
      const playlist: Playlist = {
        id: crypto.randomUUID(),
        name,
        tracks: [],
        albums: [],
      };
      patchState(store, { playlists: [...store.playlists(), playlist] });
      await db.save(playlist);
    },

    async deletePlaylist(id: string) {
      patchState(store, { playlists: store.playlists().filter((playlist) => playlist.id !== id) });
      await db.delete(id);
    },

    async renamePlaylist(id: string, name: string) {
      const updated = store
        .playlists()
        .map((playlist) => (playlist.id === id ? { ...playlist, name } : playlist));
      patchState(store, { playlists: updated });
      const updatedPlaylist = updated.find((playlist) => playlist.id === id);
      if (updatedPlaylist) {
        await db.save(updatedPlaylist);
      }
    },

    async addTrackToPlaylist(playlistId: string, track: Track) {
      const updated = store
        .playlists()
        .map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, tracks: [...playlist.tracks, track] }
            : playlist,
        );
      patchState(store, { playlists: updated });
      const updatedPlaylist = updated.find((playlist) => playlist.id === playlistId);
      if (updatedPlaylist) {
        await db.save(updatedPlaylist);
      }
    },

    async removeTrackFromPlaylist(playlistId: string, trackId: number) {
      const updated = store
        .playlists()
        .map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, tracks: playlist.tracks.filter((t) => t.id !== trackId) }
            : playlist,
        );
      patchState(store, { playlists: updated });
      const updatedPlaylist = updated.find((playlist) => playlist.id === playlistId);
      if (updatedPlaylist) {
        await db.save(updatedPlaylist);
      }
    },

    async addAlbumToPlaylist(playlistId: string, album: Album) {
      const updated = store
        .playlists()
        .map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, albums: [...playlist.albums, album] }
            : playlist,
        );
      patchState(store, { playlists: updated });
      const updatedPlaylist = updated.find((playlist) => playlist.id === playlistId);
      if (updatedPlaylist) {
        await db.save(updatedPlaylist);
      }
    },

    async removeAlbumFromPlaylist(playlistId: string, albumId: number) {
      const updated = store
        .playlists()
        .map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, albums: playlist.albums.filter((album) => album.id !== albumId) }
            : playlist,
        );
      patchState(store, {
        playlists: updated,
      });
      const updatedPlaylist = updated.find((playlist) => playlist.id === playlistId);
      if (updatedPlaylist) {
        await db.save(updatedPlaylist);
      }
    },
  })),
);
