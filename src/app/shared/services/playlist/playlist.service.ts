import { inject, Injectable } from "@angular/core";
import { FavouritesStore } from "../../store/store";
import { Playlist } from "../../models/favourite-music.models";
import { Track } from "../../models/music-explore.models";


@Injectable({
    providedIn: 'root'
})
export class PlaylistService{
    private store = inject(FavouritesStore);
    playlists = this.store.playlists;
    existsInPlaylist(playlist: Playlist,track: Track): boolean{
        return !!playlist.tracks.find(t => t.id === track.id)
    }

    findReleaseDate(tracks: Track[]): string{
        for(const track of tracks){
            if(track.release_date){
                return "Released: " + track.release_date;
            }
        }
        return "No release date";
    }
}