import { Album, Track } from "./music-explore.models";

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  albums: Album[];
}

export interface PlaylistState {
  playlists: Playlist[];
}