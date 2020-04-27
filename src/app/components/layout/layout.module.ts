import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './views/header/header.component';
import { SideMenuModule } from './views/side-menu/side-menu.module';
import { ToggleModule } from '../toggle/toggle.module';


@NgModule({
    imports: [
        SharedModule,
        SideMenuModule,
        ToggleModule,
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
    ],
    exports: [
        LayoutComponent,
    ],
})
export class LayoutModule {}
