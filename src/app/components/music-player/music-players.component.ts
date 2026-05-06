import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NowPlayingService } from '../../shared/services/music-player/music-player';

@Component({
  selector: 'app-now-playing-bar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './music-player.component.html',
})
export class NowPlayingBarComponent {
  service = inject(NowPlayingService);
}
