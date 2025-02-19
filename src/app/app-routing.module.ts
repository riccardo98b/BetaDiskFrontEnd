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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CreaProdottoComponent } from './admin/crea-prodotto/crea-prodotto.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'carrello',
    component: PaginaCarrelloComponent,
    children: [
      { path: '', component: CarrelloComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  { path: 'prodotti', component: ProdottiComponent },
  { path: 'profilo', component: ProfiloComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'crea-prodotto', pathMatch: 'full' },
      { path: 'crea-prodotto', component: CreaProdottoComponent },
    ],
  },
  {
    path: 'dettaglio-prodotto/:idProdotto',
    component: DettaglioProdottoComponent,
  },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', component: Pagina404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
