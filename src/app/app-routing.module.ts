import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pagine/home/home.component';
import { CarrelloComponent } from './pagine/carrello/carrello.component';
import { ProfiloComponent } from './pagine/profilo/profilo.component';
import { ProdottiComponent } from './pagine/prodotti/prodotti.component';
import { DettaglioProdottoComponent } from './pagine/dettaglio-prodotto/dettaglio-prodotto.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'prodotti', component: ProdottiComponent },
  { path: 'profilo', component: ProfiloComponent },
  {
    path: 'dettaglio-prodotto/:idProdotto',
    component: DettaglioProdottoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
