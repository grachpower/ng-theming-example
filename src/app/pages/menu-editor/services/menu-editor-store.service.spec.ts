import { TestBed } from '@angular/core/testing';
import { ContainersService } from '../../../core/services/containers.service';
import { Tree } from '../../../models/tree/tree.model';
import { AppTestingModule } from '../../../testing/app.testing.module';
import { ContainersServiceMock } from '../../../testing/containers.service.mock';
import { headerEntriesStub, headerEntriesStubModified } from '../../../testing/stubs/menu-editor-service.stubs';
import { MenuEditorStoreService } from './menu-editor-store.service';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { HeaderEntryModel } from '../models/header-entry.model';

describe('MenuEditorStoreService', () => {
  let menuEditorService: MenuEditorStoreService;
  let containerService: ContainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [
        MenuEditorStoreService,
        {
          provide: ContainersService,
          useClass: ContainersServiceMock,
        }
      ],
    });

    menuEditorService = TestBed.get(MenuEditorStoreService);
    containerService = TestBed.get(ContainersService);
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

  it('should load menu menu content and save originals if no errors', () => {
    const blockObjectsSpy = spyOn(containerService, 'getBlockObjects').and.returnValue(of({items: [{content: headerEntriesStub}]}));

    menuEditorService.loadMenuContent();

    expect(blockObjectsSpy).toHaveBeenCalled();
    expect(menuEditorService.getOriginalEntriesTree()).toEqual(new Tree(headerEntriesStub, 'content'));
    menuEditorService.menuTree$
      .pipe(take(1))
      .subscribe((value: Tree<HeaderEntryModel>) => {
        expect(value).toEqual(new Tree(headerEntriesStub, 'content'));
      });
  });

  it('should use default empty array as entries of any http error with containers', () => {
    const blockObjectsSpy = spyOn(containerService, 'getBlockObjects').and.returnValue(throwError(null));

    menuEditorService.loadMenuContent();

    expect(blockObjectsSpy).toHaveBeenCalled();
    expect(menuEditorService.getOriginalEntriesTree()).toEqual(new Tree([], 'content'));
    menuEditorService.menuTree$
      .pipe(take(1))
      .subscribe((value: Tree<HeaderEntryModel>) => {
        expect(value).toEqual(new Tree([], 'content'));
      });
  });

  it('should save orinal entries without changes', () => {
    spyOn(containerService, 'getBlockObjects').and.returnValue(of({items: [{content: headerEntriesStub}]}));

    menuEditorService.loadMenuContent();

    menuEditorService.menuTree$
      .pipe(take(1))
      .subscribe((tree: Tree<HeaderEntryModel>) => {
        tree.children[0].children[0].removeNode(1);

        expect(tree.getSerializedSource()).toEqual(headerEntriesStubModified);
        expect(menuEditorService.getOriginalEntriesTree()).toEqual(new Tree(headerEntriesStub, 'content'));
      });
  });

  xit('should update menuContent', () => {
    // TODO implement
  });
});
