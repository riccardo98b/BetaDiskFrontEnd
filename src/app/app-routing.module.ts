import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pagine/home/home.component';
import { CarrelloComponent } from './pagine/carrello/carrello.component';
import { ProfiloComponent } from './pagine/profilo/profilo.component';
import { ProdottiComponent } from './pagine/prodotti/prodotti.component';
import { DettaglioProdottoComponent } from './pagine/dettaglio-prodotto/dettaglio-prodotto.component';
import { WishlistComponent } from './componenti/wishlist/wishlist.component';
import { Pagina404Component } from './pagine/pagina404/pagina404.component';
import { SigninComponent } from './pagine/signin/signin.component';
import { CheckoutComponent } from './pagine/checkout/checkout.component';
import { PaginaCarrelloComponent } from './pagine/pagina-carrello/pagina-carrello.component';
import { OrdiniComponent } from './pagine/ordini/ordini.component';
import { RecensioneComponent } from './componenti/recensione/recensione.component';
import { RecensioniComponent } from './pagine/recensioni/recensioni.component';
import { RegistrazioneComponent } from './pagine/registrazione/registrazione.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  {
    path: 'carrello',
    component: PaginaCarrelloComponent,
    children: [
      { path: '', component: CarrelloComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  { path: 'prodotti', component: ProdottiComponent },
  {
    path: 'dettaglio-prodotto/:idProdotto',
    component: DettaglioProdottoComponent,
  },
  { path: 'profilo', component: ProfiloComponent },
  { path: 'profilo/ordini', component: OrdiniComponent },
  { path: 'profilo/recensioni', component: RecensioniComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', component: Pagina404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
