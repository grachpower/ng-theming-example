import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { LinkBlockBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-link-block-block',
    templateUrl: './link-block-block.component.html',
    styleUrls: ['./link-block-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBlockBlockComponent implements CreateNode, OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() node: TreeNode<LinkBlockBlock>;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        const { name = ''} = this.node.value;

        this.form.addControl('name', this.fb.control(name));
    }

    public ngOnDestroy(): void {
        this.form.removeControl('name');
    }
}
