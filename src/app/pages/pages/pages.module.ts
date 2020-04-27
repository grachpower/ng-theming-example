import { NgModule } from '@angular/core';

import { LayoutModule } from './../../components/layout/layout.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        LayoutModule,
    ],
    declarations: [PagesComponent],
})
export class PagesModule {}
