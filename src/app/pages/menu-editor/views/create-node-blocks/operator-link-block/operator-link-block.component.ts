import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from '../../../../../models/tree/tree.model';
import { OperatorLinkBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
  selector: 'admin-operator-link-block',
  templateUrl: './operator-link-block.component.html',
  styleUrls: ['./operator-link-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorLinkBlockComponent implements CreateNode, OnDestroy, OnInit{
  @Input() form: FormGroup;
  @Input() node: TreeNode<OperatorLinkBlock>;

  constructor(
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    const { url = ''} = this.node.value;

    this.form.addControl('url', this.fb.control(url, [Validators.required]));
  }

  public ngOnDestroy(): void {
    this.form.removeControl('url');
  }
}
