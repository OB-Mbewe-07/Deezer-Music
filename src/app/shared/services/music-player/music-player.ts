import { inject, Injectable, signal } from "@angular/core";
import { MusicFormatService } from "../music-explore/music-explore-format.service";
import { Track } from "../../models/music-explore.models";

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {
  private musicFormat = inject(MusicFormatService);
  private audio = new Audio();
  track = signal<Track | null>(null);
  isPlaying = signal(false);
  currentTime = signal('0:00');
  duration = signal('0:00');

  constructor() {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime.set(this.musicFormat.formatDuration(Math.floor(this.audio.currentTime)));
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration.set(this.musicFormat.formatDuration(Math.floor(this.audio.duration)));
    });
    this.audio.addEventListener('ended', () => {
      this.isPlaying.set(false);
    });
  }

  play(track: Track) {
    this.track.set(track);
    this.audio.src = track.preview;
    this.audio.play();
    this.isPlaying.set(true);
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play();
      this.isPlaying.set(true);
    }
  }
}