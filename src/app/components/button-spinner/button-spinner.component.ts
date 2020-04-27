import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
    selector: 'button-spinner',
    templateUrl: './button-spinner.component.html',
    styleUrls: ['./button-spinner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerComponent {
}
