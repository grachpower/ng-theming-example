import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-pages',
    templateUrl: 'pages.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent {}
