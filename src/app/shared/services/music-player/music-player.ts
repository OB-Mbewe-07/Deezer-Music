import { effect, inject, Injectable, signal } from '@angular/core';
import { MusicFormatService } from '../music-explore/music-explore-format.service';
import { Track } from '../../models/music-explore.models';

@Injectable({
  providedIn: 'root',
})
export class NowPlayingService {
  private musicFormat = inject(MusicFormatService);
  private audio = new Audio();
  private abortController = new AbortController();
  track = signal<Track | null>(null);
  isPlaying = signal(false);
  currentTime = signal('0:00');
  duration = signal('0:00');

  constructor() {
    effect(() => {
      const currentTrack = this.track();
      if (currentTrack) {
        this.abortController.abort();
        this.abortController = new AbortController();
        const signal = this.abortController.signal;
        
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = currentTrack.preview;
        this.audio.load();

       this.audio.addEventListener('canplay', () => {
          this.audio.play().catch();
          this.isPlaying.set(true);
        }, { once: true, signal });

        this.audio.addEventListener('timeupdate', () => {
          this.currentTime.set(this.musicFormat.formatDuration(Math.floor(this.audio.currentTime)));
        }, { signal });

        this.audio.addEventListener('loadedmetadata', () => {
          this.duration.set(this.musicFormat.formatDuration(Math.floor(this.audio.duration)));
        }, { signal });

        this.audio.addEventListener('ended', () => {
          this.isPlaying.set(false);
        }, { signal });
      }
    });
  }

  play(track: Track) {
    this.track.set(track);
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play().catch();
      this.isPlaying.set(true);
    }
  }
}
