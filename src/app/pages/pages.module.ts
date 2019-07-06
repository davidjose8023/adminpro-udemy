import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// modulos
import { SharedModule } from '../shared/shared.module';
//ng2-charts
import { ChartsModule } from 'node_modules/ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadoComponent } from '../components/incrementado/incrementado.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadoComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent
  
      ],
      exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadoComponent,
        GraficoDonaComponent
      ],
      imports:[
          SharedModule,
          PAGES_ROUTES,
          FormsModule,
          ChartsModule
      ]
})
export class PagesModule {}