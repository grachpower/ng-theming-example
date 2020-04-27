import { NgModule } from '@angular/core';

import { ButtonSpinnerModule } from '../components/button-spinner/button-spinner.module';
import { ToggleModule } from '../components/toggle/toggle.module';

@NgModule({
    imports: [
        ButtonSpinnerModule,
        ToggleModule,
    ],
    exports: [
        ButtonSpinnerModule,
        ToggleModule,
    ],
})
export class PageSharedModule {}
