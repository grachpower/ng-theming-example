import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Tree } from '../../../../models/tree/tree.model';
import { headerEntriesStub } from '../../../../testing/stubs/menu-editor-service.stubs';
import { TreeComponent } from './tree.component';
import { cloneDeep } from 'lodash';
import { AppTestingModule } from '../../../../testing/app.testing.module';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let expectedTree: Tree<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ AppTestingModule ],
      declarations: [ TreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    component.tree = expectedTree;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert empty node by index', () => {
    const treeInsertNode = spyOn(component.tree, 'addNode').and.callThrough();
    const originalZeroNode = cloneDeep(component.tree.children[0]);

    component.insertNode(0);

    expect(treeInsertNode).toHaveBeenCalled();
    expect(component.tree.children[0].value).toEqual({});
    expect(component.tree.children[1].value).toEqual(originalZeroNode.value);
  });

  it('should delete child node', () => {
    const treeRemoveNode = spyOn(component.tree, 'removeNode').and.callThrough();
    const originalZeroNode = cloneDeep(component.tree.children[0]);

    expect(component.tree.children.length).toEqual(1);
    component.deleteChildNode(component.tree.children[0]);

    expect(treeRemoveNode).toHaveBeenCalledWith(originalZeroNode.index);
    expect(component.tree.children.length).toEqual(0);
  });
});
