import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MusicExploreService } from '../../shared/services/music-explore/music-expore.service';
import { Subscription } from 'rxjs';
import { DeezerChartResponse } from '../../shared/models/music-explore.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    IftaLabelModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    FloatLabelModule,
    BadgeModule,
    ButtonModule,
    CarouselModule,
    TagModule,
  ],
})
export class LandingPageComponent implements OnDestroy {
  router = inject(Router);
  exploreDataService = inject(MusicExploreService);
  private cdr = inject(ChangeDetectorRef);
  private subscription = new Subscription();
  search: string | undefined;
  exploreData: DeezerChartResponse | null = null;
  text: string = '';

  run() {
    this.subscription.add(
      this.exploreDataService.getExploreData().subscribe({
        next: (data) => {
          this.exploreData = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      }),
    );
  }

  runSearch() {
    if (this.search) {
      this.exploreDataService.getAllInformationSearch(this.search);
    }
  }

  badgeSearch(nameStr: string) {
    this.search = nameStr;
    this.runSearch();
    this.router.navigate(['/search-results'], { queryParams: { q: this.search } });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
