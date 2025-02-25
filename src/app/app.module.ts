import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Aggiungi MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Aggiungi MatInputModule
import { MatTooltipModule } from '@angular/material/tooltip'; // Aggiungi MatTooltipModule (opzionale)
import { MatError } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

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
import { CreaProdottoComponent } from './admin/crea-prodotto/crea-prodotto.component';
import { PopUpComponent } from './dialog/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdiniComponent } from './pagine/ordini/ordini.component';
import { RecensioniComponent } from './pagine/recensioni/recensioni.component';
import { RegistrazioneComponent } from './pagine/registrazione/registrazione.component';
import { OrdiniAdminComponent } from './admin/ordini-admin/ordini-admin.component';
import { DialogDataComponent } from './dialog/dialog-data/dialog-data.component';
import { Pagina403Component } from './pagine/pagina403/pagina403.component';
import { ClientiAdminComponent } from './admin/clienti-admin/clienti-admin.component';
import { DialogStringaComponent } from './dialog/dialog-stringa/dialog-stringa.component';
import { DialogConfermaComponent } from './dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';
import { ModificaProdottoComponent } from './admin/modifica-prodotto/modifica-prodotto.component';
import { ProdottiAdminComponent } from './admin/prodotti-admin/prodotti-admin.component';
import { PaginaCarrelloVuotoComponent } from './pagine/pagina-carrello-vuoto/pagina-carrello-vuoto.component';
import { FormRecensioneComponent } from './dialog/form-recensione/form-recensione.component';
import { DialogUtenteComponent } from './dialog/dialog-utente/dialog-utente/dialog-utente.component';
import { WelcomePageComponent } from './admin/welcome-page/welcome-page.component';

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
    CreaProdottoComponent,
    PopUpComponent,
    OrdiniComponent,
    RecensioniComponent,
    RegistrazioneComponent,
    OrdiniAdminComponent,
    DialogDataComponent,
    Pagina403Component,
    ClientiAdminComponent,
    DialogStringaComponent,
    DialogConfermaComponent,
    ModificaProdottoComponent,
    ProdottiAdminComponent,
    PaginaCarrelloVuotoComponent,
    FormRecensioneComponent,
    DialogUtenteComponent,
    WelcomePageComponent,
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
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatMenuModule,
    FormsModule,
    FormsModule,
    MatRadioModule,
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
