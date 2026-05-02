import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-input',
  template: `
    <div class="scrollbar-hide h-screen overflow-y-scroll snap-y snap-mandatory">
      <section class="h-screen snap-start">
        <div class="landingDivContainer" ∏>
          <div class="flex">
            <img
              src="https://img.icons8.com/?size=100&id=uEdXEgELNafT&format=png&color=000000"
              alt="logo"
            />
            <img
              src="https://img.icons8.com/?size=120&id=zQBiTJTC1Gj0&format=png&color=000000"
              alt="logo"
            />
          </div>

          <p-floatlabel
            variant="on"
            class="landindLabel"
          >
            <input
              pInputText
              id="on_label"
              [(ngModel)]="search"
              (ngModelChange)="runSearch()"
              autocomplete="off"
              class="landingInput"
              style="border-radius: 24px;"
            />
            <label for="on_label">Artists, Records & Albums</label>
            <button
              class="landingButton"
              (click)="run()"
            >
              <i class="pi pi-arrow-right" style="font-size: 13px;"></i>
            </button>
          </p-floatlabel>
          <div class="flex gap-[2%]">
            <p-badge value="Drake" style="white-space: nowrap;" />
            <p-badge value="Mavrick City" style="white-space: nowrap;" />
            <p-badge value="Elevation worship" style="white-space: nowrap;" />
            <div class="hidden sm:block">
              <p-badge value="The Weekend" style="white-space: nowrap;" />
            </div>
          </div>
        </div>
      </section>
      <section class="h-screen snap-start">
        @if (exploreData) {}
      </section>
    </div>
  `,
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
export class LandingPageComponent {
  private exploreDataService = inject(MusicExploreService);
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
      this.exploreDataService.search$.subscribe({
        next: (data) => {
          console.log(data);
        },
      });
    }
  }
}
