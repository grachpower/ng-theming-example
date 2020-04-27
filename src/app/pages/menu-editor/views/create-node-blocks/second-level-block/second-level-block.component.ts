import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { SecondLevelBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-second-level-block',
    templateUrl: './second-level-block.component.html',
    styleUrls: ['./second-level-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondLevelBlockComponent implements CreateNode, OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() node: TreeNode<SecondLevelBlock>;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        const { name = ''} = this.node.value;

        this.form.addControl('name', this.fb.control(name, [Validators.required]));
    }

    public ngOnDestroy(): void {
        this.form.removeControl('name');
    }
}
