import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TreeNode } from '../../../../../models/tree/tree.model';
import { GENDERS_TRANSLATE_MAP, GENDER_LIST } from '../../../config/gender.config';
import { Gender } from '../../../config/gender.enum';
import { FirstLevelBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
    selector: 'admin-first-level-block',
    templateUrl: './first-level-block.component.html',
    styleUrls: ['./first-level-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLevelBlockComponent implements CreateNode, OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() node: TreeNode<FirstLevelBlock>;

    public genders = GENDER_LIST;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        const { name = '', gender = Gender.FEMALE } = this.node.value;

        this.form.addControl('name', this.fb.control(name, [Validators.required]));
        this.form.addControl('gender', this.fb.control(gender, [Validators.required]));
    }

    public ngOnDestroy(): void {
        this.form.removeControl('name');
        this.form.removeControl('gender');
    }

    public getGenderAlias(gender: Gender): string {
        return GENDERS_TRANSLATE_MAP[gender];
    }
}
