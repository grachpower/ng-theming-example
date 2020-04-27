import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Tree, TreeNode } from '../../../../models/tree/tree.model';
import { AppTestingModule } from '../../../../testing/app.testing.module';
import { MatDialogMock, DialogRefMock } from '../../../../testing/mat-dialog.mock';
import { headerEntriesStub } from '../../../../testing/stubs/menu-editor-service.stubs';
import { EntryType } from '../../config/entry-type.enum';
import { TreeNodeComponent } from './tree-node.component';
import { cloneDeep } from 'lodash';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;
  let expectedTree: Tree<any>;
  let expectedNode: TreeNode<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ AppTestingModule ],
      declarations: [ TreeNodeComponent ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    expectedNode = expectedTree.children[0];
    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    component.node = expectedNode;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct role attribute for group', () => {
    expect(component.nodeRole).toEqual('group');
  });

  it('should get correct role attribute for tree item', () => {
    component.node = component.node.children[0].children[0].children[0];

    expect(component.nodeRole).toEqual('treeitem');
  });

  describe('toggle node', () => {
    it('should toggle in and out', () => {
      expect(component.node.isExpanded).toEqual(false);
      component.toggleNodeExpand();
      expect(component.node.isExpanded).toEqual(true);
      component.toggleNodeExpand();
      expect(component.node.isExpanded).toEqual(false);
    });
  });

  describe('shouldShowNodeContent', () => {
    it('should show content if node not editing and not empty', () => {
      component.node.value.type = EntryType.BANNER;
      component.isEditing = false;

      expect(component.shouldShowNodeContent()).toEqual(true);
    });

    it('should hide content if node not editing and empty', () => {
      delete component.node.value.type;
      component.isEditing = false;

      expect(component.shouldShowNodeContent()).toEqual(false);
    });

    it('should hide content if node editing and not empty', () => {
      component.node.value.type = EntryType.BANNER;
      component.isEditing = true;

      expect(component.shouldShowNodeContent()).toEqual(false);
    });

    it('should hide content if node editing and empty', () => {
      delete component.node.value.type;
      component.isEditing = true;

      expect(component.shouldShowNodeContent()).toEqual(false);
    });
  });

  describe('insert node', () => {
    it('should insert empty node by index 0 and move previous "0" to "1"', () => {
      component.insertNode(0);
      expect(component.node.children[0].value).toEqual({});
      expect(component.node.children[1].value).toEqual(headerEntriesStub[0].content[0]);
    });

    it('should insert empty node at last index, prev last node should be n+1 node', () => {
      component.node = component.node.children[0].children[0];

      component.insertNode(1);

      expect(component.node.children[1].value).toEqual({});
      expect(component.node.children[0].value).toEqual((headerEntriesStub[0].content[0].content[0].content[0]));
      expect(component.node.children[2].value).toEqual((headerEntriesStub[0].content[0].content[0].content[1]));
    });
  });

  it('should delete child node by index', () => {
    component.node = component.node.children[0].children[0];
    const nodeDeleteSpy = spyOn(component.node, 'removeNode').and.callThrough();
    const nodeToDelete = cloneDeep(component.node.children[0]);
    const newZeroNode = cloneDeep(component.node.children[1]);

    component.deleteChildNode(nodeToDelete);

    expect(nodeDeleteSpy).toHaveBeenCalledWith(nodeToDelete.index);
    expect(component.node.children[0].value).toEqual(newZeroNode.value);
  });

  describe('makeNodeEditable', () => {
    it('should make node editable if not editable', () => {
      component.isEditing = false;
      component.makeNodeEditable();
      expect(component.isEditing).toEqual(true);
    });

    it('should make node editable if editable', () => {
      component.isEditing = true;
      component.makeNodeEditable();
      expect(component.isEditing).toEqual(true);
    });

    it('should close node when entering edit mode if node is not expandable', () => {
      const closeMock = spyOn(component.node, 'close').and.callThrough();
      spyOnProperty(component, 'nodeCanContainChildren').and.returnValue(false);
      component.makeNodeEditable();
      expect(closeMock).toHaveBeenCalled();
    });
  });

  describe('makeNodeNotEditable', () => {
    it('should make node not editable if not editable', () => {
      component.isEditing = false;
      component.makeNodeNotEditable();
      expect(component.isEditing).toEqual(false);
    });

    it('should make node not editable if editable', () => {
      component.isEditing = true;
      component.makeNodeNotEditable();
      expect(component.isEditing).toEqual(false);
    });
  });

  describe('emitNodeDelete', () => {
    it('should emit with delete node emitter', () => {
      const deleteNodeSpy = spyOn(component.deleteNode, 'emit').and.callThrough();

      component.emitNodeDelete();

      expect(deleteNodeSpy).toHaveBeenCalled();
    });
  });

  describe('cancelNodeCreation', () => {
    it('should make node not editable if current node has entryType and content', () => {
      const deleteNodeSpy = spyOn(component.deleteNode, 'emit').and.callThrough();
      const makeNodeNotEditableSpy = spyOn(component, 'makeNodeNotEditable').and.callThrough();

      component.cancelNodeCreation();

      expect(deleteNodeSpy).not.toHaveBeenCalled();
      expect(makeNodeNotEditableSpy).toHaveBeenCalled();
    });

    it('should make node not editable if current node has no entryType and content', () => {
      const deleteNodeSpy = spyOn(component.deleteNode, 'emit').and.callThrough();
      const makeNodeNotEditableSpy = spyOn(component, 'makeNodeNotEditable').and.callThrough();

      component.node.value = {};

      component.cancelNodeCreation();

      expect(deleteNodeSpy).toHaveBeenCalled();
      expect(makeNodeNotEditableSpy).not.toHaveBeenCalled();
    });
  });

  it('incremental update current node', () => {
    const makeNodeNotEditableSpy = spyOn(component, 'makeNodeNotEditable').and.callThrough();

    component.nodeChanged( {
      children: [],
      value: {},
     } as any );

    expect(makeNodeNotEditableSpy).toHaveBeenCalled();
    expect(component.node.children).toEqual([]);
    expect(component.node.value).toEqual({});
  });

  describe('appendSibling', () => {
    it('should emit to parent index of next element (index + 1)', () => {
      const emitSpy = spyOn(component.addSibling, 'emit').and.callThrough();
      const currentNodeIndex = component.node.index;

      component.appendSibling();

      expect(emitSpy).toHaveBeenCalledWith(currentNodeIndex + 1);
    });
  });

  describe('handleAppendSibling', () => {
    it('should append node by index', () => {
      const newTestingIndex = 23;
      const insertNodeSpy = spyOn(component, 'insertNode').and.callThrough();

      component.handleAppendSibling(23);

      expect(insertNodeSpy).toHaveBeenCalledWith(newTestingIndex);
    });
  });

  describe('toggleRecursiveExpand', () => {
    it('should toggle expand state for node and its children', () => {
      const expandRecursivelyMock = spyOn(component.node, 'expandRecursively').and.callThrough();
      const closeRecursivelyMock = spyOn(component.node, 'closeRecursively').and.callThrough();

      expect(component.node.isExpanded).toBeFalsy();

      component.toggleRecursiveExpand();

      expect(expandRecursivelyMock).toHaveBeenCalled();
      expect(closeRecursivelyMock).toHaveBeenCalledTimes(0);
      expect(component.node.isExpanded).toBeTruthy();

      component.toggleRecursiveExpand();

      expect(expandRecursivelyMock).toHaveBeenCalledTimes(1);
      expect(closeRecursivelyMock).toHaveBeenCalled();
      expect(component.node.isExpanded).toBeFalsy();
    });
  });
});
