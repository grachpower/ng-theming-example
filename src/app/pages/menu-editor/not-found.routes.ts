import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuEditorComponent } from './menu-editor.component';

const routes: Routes = [
    {
        path: '',
        component: MenuEditorComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuRoutesModule {}
