import { FormGroup } from '@angular/forms';

import { TreeNode } from '../../../../models/tree/tree.model';
import { HeaderEntryBlocks } from '../../models/header-entry-blocks.model';

export interface CreateNode {
    form: FormGroup;
    node: TreeNode<HeaderEntryBlocks>;
}
