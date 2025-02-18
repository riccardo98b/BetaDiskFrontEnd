import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Aggiungi MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Aggiungi MatInputModule
import { MatTooltipModule } from '@angular/material/tooltip'; // Aggiungi MatTooltipModule (opzionale)
import { MatError } from '@angular/material/form-field';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { HomeComponent } from './pagine/home/home.component';
import { ProdottiComponent } from './pagine/prodotti/prodotti.component';
import { ProfiloComponent } from './pagine/profilo/profilo.component';
import { DettaglioProdottoComponent } from './pagine/dettaglio-prodotto/dettaglio-prodotto.component';
import { RecensioneComponent } from './componenti/recensione/recensione.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CarrelloComponent } from './pagine/carrello/carrello.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Pagina404Component } from './pagine/pagina404/pagina404.component';
import { WishlistComponent } from './componenti/wishlist/wishlist.component';
import { CardComponent } from './componenti/card/card.component';
import { LoaderComponent } from './componenti/loader/loader.component';
import { CarouselComponent } from './componenti/carousel/carousel.component';
import { SigninComponent } from './pagine/signin/signin.component';
import { CheckoutComponent } from './pagine/checkout/checkout.component';
import { PaginaCarrelloComponent } from './pagine/pagina-carrello/pagina-carrello.component';
import { PresentazioneSectionComponent } from './componenti/presentazione-section/presentazione-section.component';

registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProdottiComponent,
    ProfiloComponent,
    DettaglioProdottoComponent,
    RecensioneComponent,
    DashboardComponent,
    CarrelloComponent,
    Pagina404Component,
    WishlistComponent,
    CardComponent,
    LoaderComponent,
    CarouselComponent,
    SigninComponent,
    CheckoutComponent,
    PaginaCarrelloComponent,
    PresentazioneSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'it' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
