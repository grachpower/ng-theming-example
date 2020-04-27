import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { Tree, TreeNode } from '../../../../models/tree/tree.model';
import { HeaderEntryBlocks } from '../../models/header-entry-blocks.model';
import { HeaderEntryModel } from '../../models/header-entry.model';

@Component({
    selector: 'menu-tree',
    templateUrl: './tree.component.html',
    styleUrls: [
        './tree.component.scss',
        './tree-drag.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TreeComponent {

    @Input() tree: Tree<HeaderEntryModel>;

    public isDraggingChild = false;

    constructor(
        private cdr: ChangeDetectorRef,
    ) {
    }

    public drop(event: CdkDragDrop<TreeNode<HeaderEntryBlocks>>): void {
        this.tree.moveNode(event.previousIndex, event.currentIndex);
    }

    public startDrag(): void {
        this.isDraggingChild = true;
        this.cdr.markForCheck();
    }

    public endDrag(): void {
        this.isDraggingChild = false;
        this.cdr.markForCheck();
    }

    public insertNode(index: number): void {
        this.tree.addNode({}, index);
    }

    public deleteChildNode(node: TreeNode<HeaderEntryModel>): void {
        this.tree.removeNode(node.index);
    }
}
