import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { SideMenuStorageService } from './providers/side-menu-storage.service';
import { NavItem } from './models/nav-item.model';

@Component({
    selector: 'side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    providers: [
        SideMenuStorageService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {

    @Output() ngNavigate = new EventEmitter<void>();
    readonly sideMenuContent$: Observable<NavItem[]> = this.sideMenuStorage.sideMenuContent$;

    constructor(
        private sideMenuStorage: SideMenuStorageService,
    ) { }

    emitNavigation(): void {
        this.ngNavigate.emit();
    }

}
