import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { Theme } from '../../../../config/theme.enum';
import { ThemeService } from '../../../../core/services/theme.service';
import { TitleService } from './../../../../core/services/title.service';

@Component({
    selector: 'admin-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() sidenavOpened: boolean;
    @Output() openSidenav = new EventEmitter<void>();
    @Output() closeSidenav = new EventEmitter<void>();
    readonly title$ = this.title.titleChanges();
    readonly isMobile$ = this.isMobileChanges();
    public readonly darkThemeControl = new FormControl(false);
    private readonly destroyed$ = new Subject<void>();

    constructor(
        private title: TitleService,
        private breakpoint: BreakpointObserver,
        private router: Router,
        private theme: ThemeService,
    ) {
    }

    public ngOnInit(): void {
        this.listenToThemeChanges();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public toggleTheme(): void {
        this.theme.setTheme(this.darkThemeControl.value
            ? Theme.LIGHT
            : Theme.DARK
        );
    }

    public toggleSidenav(): void {
        this.sidenavOpened
            ? this.closeSidenav.emit()
            : this.openSidenav.emit();
    }

    private isMobileChanges(): Observable<boolean> {
        return this.breakpoint.observe('(max-width: 767px)')
            .pipe(
                map((state: BreakpointState) => state.matches),
            );
    }

    private listenToThemeChanges(): void {
        this.theme.themeChanges()
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.destroyed$),
            )
            .subscribe((newTheme: Theme) =>
                this.darkThemeControl.setValue(newTheme === Theme.DARK)
            );
    }
}
