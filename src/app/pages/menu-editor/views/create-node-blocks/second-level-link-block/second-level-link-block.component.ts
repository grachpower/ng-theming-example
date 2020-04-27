import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { SecondLevelLinkBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-second-level-link-block',
    templateUrl: './second-level-link-block.component.html',
    styleUrls: ['./second-level-link-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondLevelLinkBlockComponent implements CreateNode, OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() node: TreeNode<SecondLevelLinkBlock>;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        const { name = '', url = '', colored = null} = this.node.value;

        this.form.addControl('name', this.fb.control(name, [Validators.required]));
        this.form.addControl('url', this.fb.control(url, [Validators.required]));
        this.form.addControl('colored', this.fb.control(colored));
    }

    public ngOnDestroy(): void {
        this.form.removeControl('name');
        this.form.removeControl('url');
        this.form.removeControl('colored');
    }
}
