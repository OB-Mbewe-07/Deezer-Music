import { inject, Injectable } from "@angular/core";
import { FavouritesStore } from "../../store/store";
import { Playlist } from "../../models/favourite-music.models";
import { Album, Track } from "../../models/music-explore.models";


@Injectable({
    providedIn: 'root'
})
export class PlaylistService{
    private store = inject(FavouritesStore);
    playlists = this.store.playlists;
    existsInPlaylist(playlist: Playlist,track: Track): boolean{
        return !!playlist.tracks.find(t => t.id === track.id)
    }

    albumReleaseDate(album: Album):string{
       return (album.release_date) ? (album.release_date) : "No release date"; 
    }
}