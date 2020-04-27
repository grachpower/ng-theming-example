import { CdkTrapFocus } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TreeNode } from '../../../../models/tree/tree.model';
import { BLOCK_TYPE_TO_COMPONENT_MAP } from '../../config/block-type-component-map.config';
import { BLOCK_TYPE_TO_ICON_MAP } from '../../config/block-type-icon-map.config';
import { EntryType } from '../../config/entry-type.enum';
import { EntryTypesAliasMap } from '../../config/entry-types-map.config';
import { LEVEL_AVAILABLE_ENTRY_TYPES } from '../../config/level-available-types.config';
import { HeaderEntryBlocks } from '../../models/header-entry-blocks.model';
import { CreateNode } from '../core/create-node.interface';
import { DeleteNodeComponent } from '../delete-node/delete-node.component';

@Component({
    selector: 'admin-create-node',
    templateUrl: './create-node.component.html',
    styleUrls: ['./create-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNodeComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() node: TreeNode<HeaderEntryBlocks>;
    @Output() cancelNodeCreation = new EventEmitter<void>();
    @Output() deleteNode = new EventEmitter<TreeNode<HeaderEntryBlocks>>();
    @Output() nodeChange = new EventEmitter<TreeNode<HeaderEntryBlocks>>();
    @ViewChild(CdkTrapFocus, { static: true }) trapFocusRef: CdkTrapFocus;
    @ViewChild('nodeContainer', { read: ViewContainerRef, static: true }) nodeContainerVcr: ViewContainerRef;

    public currentNode: TreeNode<HeaderEntryBlocks>;
    public treeNodeForm = this.fb.group({
      type: this.fb.control('', [Validators.required]),
    });

    private destroyed$ = new Subject<void>();

    public get availabeEntryTypes(): EntryType[] {
        const level = this.node.level;

        return LEVEL_AVAILABLE_ENTRY_TYPES[level];
    }

    public get entryTypeControl(): AbstractControl {
        return this.treeNodeForm.get('type');
    }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
    ) { }

    public ngOnInit(): void {
        this.currentNode = this.node;

        this.lookForEntryTypeChange();
    }

    public ngAfterViewInit(): void {
        this.trapFocusRef.focusTrap.focusFirstTabbableElement();
        this.trapFocusRef.enabled = false;
        // mark so tests won't throw ExpressionChangedAfterItHasBeenCheckedError
        this.cdr.markForCheck();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();

        this.currentNode = null;
        this.treeNodeForm = null;
    }

    public formSubmit(): void {
        this.treeNodeForm.markAllAsTouched();

        if (!this.isFormValid()) {
            return;
        }

        this.currentNode.value = this.treeNodeForm.value;
        this.currentNode.isNew = false;

        this.nodeChange.emit(this.currentNode);
    }

    public entryTypeAlias(type: EntryType): string {
        return EntryTypesAliasMap[type];
    }

    public entryTypeIcon(type: EntryType): string {
        return BLOCK_TYPE_TO_ICON_MAP[type];
    }

    public cancel(): void {
        this.cancelNodeCreation.emit();
    }

    public isFormValid(): boolean {
        return this.treeNodeForm.valid;
    }

    public lookForEntryTypeChange(): void {
        const currentType = this.currentNode.value.type || this.availabeEntryTypes[0] || null;
        this.entryTypeControl.setValue(currentType);
        this.constructEditComponent(currentType);

        this.entryTypeControl.valueChanges
            .pipe(
                takeUntil(this.destroyed$)
            ).subscribe((entryType: EntryType) => {
                if (entryType) {
                    this.constructEditComponent(entryType);
                }
            });
    }

    public deleteCurrentNode(): void {
        this.showConfirmDeletePopup()
            .pipe(
                takeUntil(this.destroyed$),
            )
            .subscribe((result: boolean) => {
                if (result) {
                    this.deleteNode.emit(this.node);
                }
            });
    }

    private showConfirmDeletePopup(): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteNodeComponent, {
            width: '250px',
        });

        return dialogRef.afterClosed();
    }

    private constructEditComponent(type: EntryType): ComponentRef<CreateNode> {
        const componentClass: Type<CreateNode> = BLOCK_TYPE_TO_COMPONENT_MAP[type];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        this.nodeContainerVcr.clear();
        const componentRef = this.nodeContainerVcr.createComponent(componentFactory);

        componentRef.instance.node = this.currentNode;
        componentRef.instance.form = this.treeNodeForm;

        return componentRef;
    }
}
