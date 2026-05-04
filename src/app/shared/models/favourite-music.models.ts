import { Album, Track } from "./music-explore.models";

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  albums: Album[];
  image?: string; 
}

export interface PlaylistState {
  playlists: Playlist[];
}