import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
