import { NgModule } from '@angular/core';

import { SharedModule } from './../../../../shared/shared.module';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuLinkComponent } from './views/link/side-menu-link.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        SideMenuComponent,
        SideMenuLinkComponent,
    ],
    exports: [
        SideMenuComponent,
    ],
})
export class SideMenuModule {}
