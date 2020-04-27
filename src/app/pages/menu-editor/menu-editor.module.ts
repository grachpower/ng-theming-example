import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { PageSharedModule } from '../page-shared.module';
import { MenuEditorComponent } from './menu-editor.component';
import { MenuRoutesModule } from './not-found.routes';
import { MenuEditorStoreService } from './services/menu-editor-store.service';
import { CreateNodeBlocksModule } from './views/create-node-blocks/create-node-levels.module';
import { CreateNodeComponent } from './views/create-node/create-node.component';
import { DeleteNodeComponent } from './views/delete-node/delete-node.component';
import { TreeNodeComponent } from './views/tree-node/tree-node.component';
import { TreeComponent } from './views/tree/tree.component';

@NgModule({
    imports: [
        SharedModule,
        PageSharedModule,
        MenuRoutesModule,
        CreateNodeBlocksModule,
    ],
    declarations: [
        MenuEditorComponent,
        TreeComponent,
        TreeNodeComponent,
        CreateNodeComponent,
        DeleteNodeComponent,
    ],
    providers: [
        MenuEditorStoreService,
    ],
    entryComponents: [
        DeleteNodeComponent,
    ]
})
export class MenuEditorModule {}
