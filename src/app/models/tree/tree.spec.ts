import { cloneDeep } from 'lodash';

import { HeaderEntryModel } from '../../pages/menu-editor/models/header-entry.model';
import { headerEntriesMultichildren, headerEntriesStub } from '../../testing/stubs/menu-editor-service.stubs';
import { treeInputStub, treeInputWithPadding } from '../../testing/stubs/tree.stub';
import { Tree, TreeNode } from './tree.model';

describe('Clouty tree', () => {
    let tree: Tree<HeaderEntryModel>;
    let numTree: Tree<any>;
    let multichildrenTree: Tree<HeaderEntryModel>;

    beforeEach(() => {
        tree = new Tree<HeaderEntryModel>(headerEntriesStub, 'content');
        numTree = new Tree<any>(treeInputStub, 'content');
        multichildrenTree = new Tree<HeaderEntryModel>(headerEntriesMultichildren, 'content');
    });

    it('should create tree from model list', () => {
        expect(tree).toBeDefined();
    });

    it('child nodes should contain verified parent', () => {
        expect(tree.children[0].parent).toEqual(null);
        expect(tree.children[0].children[0].parent).toEqual(tree.children[0]);
        expect(tree.children[0].children[0].children[0].parent).toEqual(tree.children[0].children[0]);
    });

    it('should contain valid index', () => {
        expect(tree.children[0].index).toEqual(0);
        expect(tree.children[0].children[0].index).toEqual(0);
        expect(tree.children[0].children[0].children[0].index).toEqual(0);
        expect(tree.children[0].children[0].children[1].index).toEqual(1);
    });

    it('should contain depth level', () => {
        expect(tree.children[0].level).toEqual(0);
        expect(tree.children[0].children[0].level).toEqual(1);
        expect(tree.children[0].children[0].children[0].level).toEqual(2);
        expect(tree.children[0].children[0].children[1].level).toEqual(2);
    });

    it('should contain valid value on each level', () => {
        expect(tree.children[0].value).toEqual(headerEntriesStub[0]);
        expect(tree.children[0].children[0].value).toEqual(headerEntriesStub[0].content[0]);
        expect(tree.children[0].children[0].children[0].value).toEqual(headerEntriesStub[0].content[0].content[0]);
        expect(tree.children[0].children[0].children[1].value).toEqual(headerEntriesStub[0].content[0].content[1]);
    });

    it('should find children', () => {
        expect(numTree.children[0].value.num).toEqual(1);
        expect(numTree.children[1].value.num).toEqual(2);
        expect(numTree.children[0].children).toBeDefined();
        expect(numTree.children[0].children[0].children).toEqual([]);
        expect(numTree.children[0].children[0].value.num).toEqual(2);
        expect(numTree.children[0].children[1].value.num).toEqual(3);
    });

    it('should remove node from tree by index', () => {
        numTree.removeNode(0);

        expect(numTree.children.length).toEqual(1);
        expect(numTree.children[0].index).toEqual(0);
    });

    it('should insert new child node in tree by index', () => {
        tree.addNode({ name: 'm' }, 0);

        expect(tree.children.length).toEqual(2);
        expect(tree.children[0].value).toEqual({ name: 'm' });
        expect(tree.children[0].index).toEqual(0);

        tree.addNode({ name: 'b' }, 1);
        expect(tree.children.length).toEqual(3);
        expect(tree.children[1].value).toEqual({ name: 'b' });
        expect(tree.children[1].index).toEqual(1);

        expect(tree.children[2].index).toEqual(2);
    });

    it('should remove node from current node by index', () => {
        const node = numTree.children[0];

        node.removeNode(0);

        expect(node.children.length).toEqual(1);
        expect(node.children[0].index).toEqual(0);
    });

    it('should insert new child node in current node by index', () => {
        const node = numTree.children[0];

        node.addNode({ name: 'm' }, 0);
        expect(node.children.length).toEqual(3);
        expect(node.children[0].value).toEqual({ name: 'm' });
        expect(node.children[0].index).toEqual(0);
        expect(node.children[0].level).toEqual(1);

        node.addNode({ name: 'b' }, 1);
        expect(node.children.length).toEqual(4);
        expect(node.children[1].value).toEqual({ name: 'b' });
        expect(node.children[1].index).toEqual(1);
        expect(node.children[1].level).toEqual(1);

        expect(node.children[2].index).toEqual(2);
    });

    it('should desirialize tree node with its children without changes', () => {
        const node = numTree.children[0];

        const nodeValue = node.getNodeValue();

        expect(nodeValue).toEqual(treeInputStub[0]);
        expect(numTree.getSerializedSource()).toEqual(treeInputStub);
    });

    it('should append child ang return deserialized node value', () => {
        const node = numTree.children[0];
        const originalSource = cloneDeep(treeInputWithPadding);

        node.addNode({ num: 32 }, 1);
        const nodeValue = node.getNodeValue();

        expect(nodeValue).toEqual(treeInputWithPadding[0]);
        expect(numTree.getSerializedSource()).toEqual(originalSource);
    });

    it('should deserialize tree', () => {
        const treeValue = numTree.getSerializedSource();
        expect(treeValue).toEqual(treeInputStub as any);
    });

    it('all nodes should be closed by default', () => {
        const checkNodeClosedRecoursive = (node: TreeNode<any>) => {
            expect(node.isExpanded).toEqual(false);

            node.children.forEach((childNode: TreeNode<any>) => {
                checkNodeClosedRecoursive(childNode);
            });
        };

        numTree.children.forEach((node: TreeNode<any>) => {
            checkNodeClosedRecoursive(node);
        });
    });

    it('should expand node without changing others', () => {
        const nodeOne = numTree.children[0];
        const nodeTwo = numTree.children[1];
        const innerNode = numTree.children[0].children[0];

        expect(nodeOne.isExpanded).toEqual(false);

        nodeOne.expand();

        expect(nodeOne.isExpanded).toEqual(true);
        expect(nodeTwo.isExpanded).toEqual(false);
        expect(innerNode.isExpanded).toEqual(false);
    });

    it('should expand recursively', () => {
        const nodeOne = numTree.children[0];
        const nodes = [
            nodeOne,
            numTree.children[0].children[0],
            numTree.children[0].children[1],
        ];
        const untouchedNode = numTree.children[1];

        for (const node of nodes) {
            expect(node.isExpanded).toBeFalsy();
        }
        expect(untouchedNode.isExpanded).toBeFalsy();

        nodeOne.expandRecursively();

        for (const node of nodes) {
            expect(node.isExpanded).toBeTruthy();
        }
        expect(untouchedNode.isExpanded).toBeFalsy();
    });

    it('should close recursively', () => {
        const nodeOne = numTree.children[0];
        const nodes = [
            nodeOne,
            numTree.children[0].children[0],
            numTree.children[0].children[1],
        ];
        const untouchedNode = numTree.children[1];

        nodeOne.expandRecursively();

        for (const node of nodes) {
            expect(node.isExpanded).toBeTruthy();
        }
        expect(untouchedNode.isExpanded).toBeFalsy();

        nodeOne.closeRecursively();

        for (const node of nodes) {
            expect(node.isExpanded).toBeFalsy();
        }
        expect(untouchedNode.isExpanded).toBeFalsy();
    });

    it('should open node and close node without changing others', () => {
        const nodeOne = numTree.children[0];
        const nodeTwo = numTree.children[1];
        const innerNode = numTree.children[0].children[0];

        nodeOne.expand();
        expect(nodeOne.isExpanded).toEqual(true);
        expect(nodeTwo.isExpanded).toEqual(false);
        expect(innerNode.isExpanded).toEqual(false);

        nodeOne.close();
        expect(nodeOne.isExpanded).toEqual(false);
        expect(nodeTwo.isExpanded).toEqual(false);
        expect(innerNode.isExpanded).toEqual(false);
    });

    it('tree should not mutate original source', () => {
        const originalTree = cloneDeep(treeInputStub);
        const node = numTree.children[0];

        const treeOriginalSerialized = numTree.getSerializedSource();

        expect(treeOriginalSerialized).toEqual(originalTree);

        node.removeNode(0);
        node.removeNode(0);
        const treeSerialized = numTree.getSerializedSource();

        expect(treeSerialized).not.toEqual(originalTree);
    });

    it('should move elements for tree node', () => {
        const nodeOne = numTree.children[0].children[0];
        const nodeTwo = numTree.children[0].children[1];

        expect(numTree.children[0].index).toBe(0);
        expect(numTree.children[1].index).toBe(1);

        numTree.children[0].moveNode(0, 1);

        expect(numTree.children[0].children[0]).toEqual(nodeTwo);
        expect(numTree.children[0].children[1]).toEqual(nodeOne);
        expect(numTree.children[0].index).toBe(0);
        expect(numTree.children[1].index).toBe(1);
    });

    it('should normalize move indexes to children bounds for tree node', () => {
        const nodeOne = numTree.children[0].children[0];
        const nodeTwo = numTree.children[0].children[1];

        numTree.children[0].moveNode(-100, 100);

        expect(numTree.children[0].children[0]).toEqual(nodeTwo);
        expect(numTree.children[0].children[1]).toEqual(nodeOne);
    });

    it('should move elements for tree', () => {
        const nodeOne = multichildrenTree.children[0];
        const nodeTwo = multichildrenTree.children[1];

        expect(multichildrenTree.children[0].index).toBe(0);
        expect(multichildrenTree.children[1].index).toBe(1);

        multichildrenTree.moveNode(0, 1);

        expect(multichildrenTree.children[0]).toEqual(nodeTwo);
        expect(multichildrenTree.children[1]).toEqual(nodeOne);
        expect(multichildrenTree.children[0].index).toBe(0);
        expect(multichildrenTree.children[1].index).toBe(1);
    });

    it('should normalize move indexes to children bounds for tree', () => {
        const nodeOne = multichildrenTree.children[0];
        const nodeTwo = multichildrenTree.children[1];

        multichildrenTree.moveNode(-100, 100);

        expect(multichildrenTree.children[0]).toEqual(nodeTwo);
        expect(multichildrenTree.children[2]).toEqual(nodeOne);
    });
});
