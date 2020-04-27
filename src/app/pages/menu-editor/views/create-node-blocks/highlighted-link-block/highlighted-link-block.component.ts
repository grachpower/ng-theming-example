import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { HighlightedLinkBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-highlighted-link-block',
    templateUrl: './highlighted-link-block.component.html',
    styleUrls: ['./highlighted-link-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightedLinkBlockComponent implements CreateNode, OnDestroy, OnInit {
    @Input() form: FormGroup;
    @Input() node: TreeNode<HighlightedLinkBlock>;

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
