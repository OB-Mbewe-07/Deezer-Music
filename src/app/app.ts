import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FavouritesStore } from './shared/store/store';
import { NowPlayingBarComponent } from "./components/music-player/music-players.component";
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NowPlayingBarComponent, AnimateOnScrollModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('deezer-music-app');
  private store = inject(FavouritesStore);
  ngOnInit() {
    this.store.loadPlaylists();
  }
}
