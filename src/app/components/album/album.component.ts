import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album, Track } from '../../shared/models/music-explore.models';
import { MusicFormatService } from '../../shared/services/music-explore/music-explore-format.service';

@Component({
  standalone: true,
  templateUrl: './album.component.html',
})
export class AlbumComponent implements OnInit, OnDestroy {
  private musicApi = inject(MusicExploreService);
  private musicFormat = inject(MusicFormatService)
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private subscription = new Subscription();
  id: number | null = null;
  album: Album | null = null;
  tracks: Track[] | null = null;
  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.id = params['id'];
      }),
    );

    if (this.id) {
      this.subscription.add(
        this.musicApi.getAlbumById(this.id).subscribe({
          next: (data) => {
            this.album = data.album;
            this.tracks = data.tracks.data;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
          },
        }),
      );
    }
  }

  formatDuration(seconds: number){
    return this.musicFormat.formatDuration(seconds);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
