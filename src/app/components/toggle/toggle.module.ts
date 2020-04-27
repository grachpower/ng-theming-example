import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { AdminToggleComponent } from './toggle.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        AdminToggleComponent
    ],
    exports: [
        AdminToggleComponent,
    ],
})
export class ToggleModule {}
