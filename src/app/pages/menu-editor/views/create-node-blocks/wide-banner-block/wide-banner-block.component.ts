import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from '../../../../../models/tree/tree.model';
import { WideBannerBlock } from '../../../models/header-entry-blocks.model';
import { CreateNode } from '../../core/create-node.interface';

@Component({
  selector: 'admin-wide-banner-block',
  templateUrl: './wide-banner-block.component.html',
  styleUrls: ['./wide-banner-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WideBannerBlockComponent implements CreateNode, OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() node: TreeNode<WideBannerBlock>;

  constructor(
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    const { name = '', imageUrl = '', url = ''} = this.node.value;

    this.form.addControl('name', this.fb.control(name, [Validators.required]));
    this.form.addControl('imageUrl', this.fb.control(imageUrl, [Validators.required]));
    this.form.addControl('url', this.fb.control(url, [Validators.required]));
  }

  public ngOnDestroy(): void {
    this.form.removeControl('name');
    this.form.removeControl('url');
    this.form.removeControl('imageUrl');
  }
}
