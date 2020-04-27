import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { LinkBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-link-block',
    templateUrl: './link-block.component.html',
    styleUrls: ['./link-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBlockComponent implements CreateNode, OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() node: TreeNode<LinkBlock>;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        const { name = '', url = '', isButton = false, inNewWindow = false} = this.node.value;

        this.form.addControl('name', this.fb.control(name, [Validators.required]));
        this.form.addControl('url', this.fb.control(url, [Validators.required]));
        this.form.addControl('isButton', this.fb.control(isButton, [Validators.required]));
        this.form.addControl('inNewWindow', this.fb.control(inNewWindow, [Validators.required]));
    }

    public ngOnDestroy(): void {
        this.form.removeControl('name');
        this.form.removeControl('url');
        this.form.removeControl('isButton');
        this.form.removeControl('inNewWindow');
    }
}
