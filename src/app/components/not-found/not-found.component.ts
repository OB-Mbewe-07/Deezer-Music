import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    templateUrl: './not-found.component.html',
    imports: [ButtonModule, NavbarComponent]
})
export class NotFoundComponent{
    router = inject(Router);
}