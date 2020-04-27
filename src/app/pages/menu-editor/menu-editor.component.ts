import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HeaderEntryModel } from './models/header-entry.model';
import { MenuEditorStoreService, childrenField } from './services/menu-editor-store.service';
import { Tree } from '../../models/tree/tree.model';

@Component({
    selector: 'menu-editor',
    templateUrl: './menu-editor.component.html',
    styleUrls: ['./menu-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuEditorComponent implements OnInit, OnDestroy {
    @ViewChild('confirmModal', {static: false}) confirmModalTempl: TemplateRef<any>;
    @ViewChild('declineModal', {static: false}) declineModalTempl: TemplateRef<any>;

    public treeData$ = new BehaviorSubject<Tree<HeaderEntryModel>>(new Tree([], childrenField));
    private destroyed$ = new Subject<void>();

    constructor(
        private menuEditorStore: MenuEditorStoreService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        this.menuEditorStore.loadMenuContent();
        this.menuEditorStore.menuTree$
            .pipe(
                takeUntil(this.destroyed$),
            ).subscribe((tree: Tree<HeaderEntryModel>) => {
                this.treeData$.next(tree);
                this.cdr.markForCheck();
            });
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public confirm(): void {
        const dialogRef = this.dialog.open(this.confirmModalTempl, {
            width: '250px',
          });

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this.destroyed$),
            )
            .subscribe((result: boolean) => {
                if (result) {
                    const newEntries = this.menuEditorStore.desirializeMenuTree(this.treeData$.value);
                    this.menuEditorStore.updateMenuContent(newEntries);
                }
            });
    }

    public cancel(): void {
        const dialogRef = this.dialog.open(this.declineModalTempl, {
            width: '250px',
          });

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((result: boolean) => {
                if (result) {
                    this.treeData$.next(this.menuEditorStore.getOriginalEntriesTree());
                }
            });
    }
}
