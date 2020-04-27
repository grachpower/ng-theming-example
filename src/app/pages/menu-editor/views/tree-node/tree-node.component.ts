import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';

import { TreeNode } from '../../../../models/tree/tree.model';
import { EntryType } from '../../config/entry-type.enum';
import { NODES_WITH_CHILDREN } from '../../config/nodes-with-children.config';
import { HeaderEntryBlocks } from '../../models/header-entry-blocks.model';
import { HeaderEntryModel } from '../../models/header-entry.model';

@Component({
    selector: 'menu-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: [
        './tree-node.component.scss',
        './tree-node-drag.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TreeNodeComponent implements OnDestroy {

    @Input() node: TreeNode<HeaderEntryModel>;
    @Input() isLast: boolean;
    /** Whether parent node is being dragged */
    @Input() parentDragged = false;
    @Output() deleteNode = new EventEmitter<TreeNode<HeaderEntryModel>>();
    @Output() addSibling = new EventEmitter<number>();
    @HostBinding('class.node-edited') public isEditing = false;
    /** Whether one of children nodes is being dragged */
    public isDraggingChild = false;

    public get nodeRole(): string {
        return this.nodeCanContainChildren
            ? 'group'
            : 'treeitem';
    }

    public get hasNodeTitle(): boolean {
        return !!this.node.value.name;
    }

    public get isOperatorLink(): boolean {
        return this.node.value.type === EntryType.OPERATOR_LINK;
    }

    public get hasUrl(): boolean {
        return !!this.node.value.url;
    }

    public get url(): string {
        return this.node.value.url;
    }

    public get nodeCanContainChildren(): boolean {
        return NODES_WITH_CHILDREN.includes(this.node.value.type);
    }

    public get expandIcon(): string {
        return this.node.isExpanded
            ? 'unfold_less'
            : 'unfold_more';
    }

    public get isExpanded(): boolean {
        return this.node.isExpanded && this.nodeCanContainChildren && !this.parentDragged;
    }

    /**
     * We can't just use [class.*] host binding, because it is
     * part of angular core and works separately from digest cycle,
     * thus it was not updating bind class properly on recursive expand.
     * We use [ngClass] directive of angular common package which
     * updates our classes just fine.
     */
    public get appendedClasses(): string[] {
        return this.isExpanded
            ? ['expanded']
            : [];
    }

    private readonly destroyed$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef,
    ) { }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public toggleNodeExpand(): void {
        this.node.isExpanded
            ? this.node.close()
            : this.node.expand();
    }

    public drop(event: CdkDragDrop<TreeNode<HeaderEntryBlocks>>): void {
        this.node.moveNode(event.previousIndex, event.currentIndex);
    }

    public shouldShowNodeContent(): boolean {
        return !this.isEmptyNode() && !this.isEditing;
    }

    public insertNode(index: number): void {
        this.node.addNode({}, index);
    }

    public deleteChildNode(node: TreeNode<HeaderEntryModel>): void {
        this.node.removeNode(node.index);
    }

    public appendSibling(): void {
        const newNodeIndex = this.node.index + 1;

        this.addSibling.emit(newNodeIndex);
    }

    public handleAppendSibling(index: number): void {
        this.insertNode(index);
    }

    public startDrag(): void {
        this.isDraggingChild = true;
        this.cdr.detectChanges();
    }

    public endDrag(): void {
        this.isDraggingChild = false;
        this.cdr.markForCheck();
    }

    public makeNodeEditable(): void {
        this.isEditing = true;

        // "Expand recursively" tree function sets all nodes expanded
        // but it does not know whether it can be expanded or not.
        // When editing such expanded but unexpandable node to be
        // expandable, it can show unwantable expansion after
        // saving. We should prevent this behavior.
        if (!this.nodeCanContainChildren) {
            this.node.close();
        }
    }

    public makeNodeNotEditable(): void {
        this.isEditing = false;
    }

    public emitNodeDelete(): void {
        this.deleteNode.emit(this.node);
    }

    public cancelNodeCreation(): void {
        if (this.node.value.type) {
            this.makeNodeNotEditable();
        } else {
            this.deleteNode.emit(this.node);
        }
    }

    public nodeChanged(updatedNode: TreeNode<HeaderEntryModel>): void {
        Object.keys(updatedNode).forEach((key: string) => {
            this.node[key] = updatedNode[key];
        });
        this.makeNodeNotEditable();
        this.cdr.markForCheck();
    }

    public toggleRecursiveExpand(): void {
        this.isExpanded
            ? this.node.closeRecursively()
            : this.node.expandRecursively();
        this.cdr.markForCheck();
    }

    private isEmptyNode(): boolean {
        return !this.node.value.type;
    }
}
