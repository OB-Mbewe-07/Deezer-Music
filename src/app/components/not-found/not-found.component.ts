import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
    templateUrl: './not-found.component.html',
    imports: [ButtonModule]
})
export class NotFoundComponent{
    router = inject(Router);
}