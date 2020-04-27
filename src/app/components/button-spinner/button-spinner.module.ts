import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ButtonSpinnerComponent } from './button-spinner.component';
import { NoMarginDirective } from './no-margin.directive';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        ButtonSpinnerComponent,
        NoMarginDirective,
    ],
    exports: [
        ButtonSpinnerComponent,
        NoMarginDirective,
    ],
})
export class ButtonSpinnerModule {}
