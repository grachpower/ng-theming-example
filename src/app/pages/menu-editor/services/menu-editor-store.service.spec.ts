import { TestBed } from '@angular/core/testing';
import { Tree } from '../../../models/tree/tree.model';
import { AppTestingModule } from '../../../testing/app.testing.module';
import { headerEntriesStub } from '../../../testing/stubs/menu-editor-service.stubs';
import { MenuEditorStoreService } from './menu-editor-store.service';

describe('MenuEditorStoreService', () => {
  let menuEditorService: MenuEditorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [
        MenuEditorStoreService,
      ],
    });

    menuEditorService = TestBed.get(MenuEditorStoreService);
  });

  it('should be created', () => {
    expect(menuEditorService).toBeTruthy();
  });

  it('should transform menuHeaders data to menu tree data', () => {
    const menuTree = menuEditorService.constructMenuTree(headerEntriesStub);

    expect(menuTree instanceof Tree).toBeTruthy();
    expect(menuTree.getSerializedSource()).toEqual(headerEntriesStub);
  });

  it('should transform menu tree to headerEntries without changes', () => {
    const menuTree = menuEditorService.constructMenuTree(headerEntriesStub);
    const headerEntriesDeserealized = menuEditorService.desirializeMenuTree(menuTree);

    expect(headerEntriesDeserealized).toEqual(headerEntriesStub);
  });
});
