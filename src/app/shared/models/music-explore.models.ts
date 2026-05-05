export interface DeezerChartResponse {
  tracks: { data: Track[] };
  albums: { data: Album[] };
  artists: { data: Artist[] };
  playlists: { data: Playlist[] };
  podcasts: { data: Podcast[] };
}

export interface Track {
  id: number;
  title: string;
  title_short: string;
  link: string;
  duration: number;
  rank: number;
  preview: string;
  artist: Partial<Artist>;
  album: Partial<Album>;
  track_position?: number;
  release_date?: string;
  type: string;
}

export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  position?: number;
}

export interface Album {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  release_date?: string;
  artist?: Partial<Artist>;
  type: string;
}

export interface Playlist {
  id: number;
  title: string;
  public: boolean;
  nb_tracks: number;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum: string;
  user: {
    id: number;
    name: string;
  };
  type: string;
}

export interface Podcast {
  id: number;
  title: string;
  description: string;
  available: boolean;
  fans: number;
  link: string;
  share: string;
  picture: string;
  picture_medium: string;
  type: string;
}

export interface DeezerSearchResponse {
  tracks: { data: Track[] };
  artists: { data: Artist[] };
  albums: { data: Album[] };
}

export interface ArtistDetailsResponse {
  artist: Artist;
  albums: { data: Album[] };
  tracks: { data: Track[] };
}

export interface AlbumDetailsResponse {
  album: Album;
  tracks: { data: Track[] };
}
