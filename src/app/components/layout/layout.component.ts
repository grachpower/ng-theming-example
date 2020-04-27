import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'admin-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {

    readonly sidenavOpenedOnMobile$ = new BehaviorSubject<boolean>(false);
    readonly sidenavModeChanges$ = this.sidenavModeChanges();
    readonly sidenavOpened$ = this.sidenavOpenedChanges();

    constructor(
        private breakpoint: BreakpointObserver,
    ) {
    }

    openSidenav(): void {
        this.sidenavOpenedOnMobile$.next(true);
    }

    closeSidenav(): void {
        this.sidenavOpenedOnMobile$.next(false);
    }

    private isMobileChanges(): Observable<boolean> {
        return this.breakpoint.observe('(max-width: 767px)')
            .pipe(
                map((state: BreakpointState) => state.matches),
            );
    }

    private sidenavModeChanges(): Observable<'over' | 'side'> {
        return this.isMobileChanges()
            .pipe(
                map((isMobile: boolean) => isMobile
                    ? 'over'
                    : 'side'
                ),
            );
    }

    private sidenavOpenedChanges(): Observable<boolean> {
        return this.isMobileChanges()
            .pipe(
                switchMap((isMobile: boolean) => isMobile
                    ? this.sidenavOpenedOnMobile$
                    : of(true)
                )
            );
    }
}
