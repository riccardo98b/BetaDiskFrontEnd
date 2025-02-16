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
