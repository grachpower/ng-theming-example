import { cloneDeep } from 'lodash';

export class TreeNode<T> {
    public parent: TreeNode<T> | null;
    public children: TreeNode<T>[];
    public level: number;
    public index: number;
    public value: T;
    public isNew: boolean;

    public get isExpanded(): boolean {
        return this.isNodeExpanded;
    }

    private childrenField: string;
    private isNodeExpanded: boolean;

    constructor(
        childrenField: string,
        value: T,
        level: number,
        index: number,
        parent: TreeNode<T>,
        isNew = false,
    ) {
        this.parent = parent;
        this.level = level;
        this.index = index;
        this.value = value;
        this.childrenField = childrenField;
        this.isNodeExpanded = false;
        this.isNew = isNew;

        const children = this.value[childrenField];

        if (children) {
            this.children = children.map((child: T, childIndex: number) => {
                return new TreeNode<T>(childrenField, child, this.level + 1, childIndex, this);
            });
        } else {
            this.children = [];
        }
    }

    public close(): void {
        this.isNodeExpanded = false;
    }

    public expand(): void {
        this.isNodeExpanded = true;
    }

    public expandRecursively(): void {
        this.expand();
        for (const child of this.children) {
            child.expandRecursively();
        }
    }

    public closeRecursively(): void {
        this.close();
        for (const child of this.children) {
            child.closeRecursively();
        }
    }

    public addNode(node: T, index: number): void {
        const newNode = new TreeNode(this.childrenField, node, this.level + 1, index, this, true);
        this.children.splice(index, 0, newNode);
        this.reorderChildrenIndex();
    }

    public removeNode(index: number): void {
        this.children.splice(index, 1);
        this.reorderChildrenIndex();
    }

    public moveNode(from: number, to: number): void {
        if (this.children.length <= 1) {

            return;
        }
        from = Math.max(0, Math.min(from, this.children.length - 1));
        to = Math.max(0, Math.min(to, this.children.length - 1));
        const node = this.children.splice(from, 1)[0];
        this.children.splice(to, 0, node);
        for (let i = 0; i < this.children.length - 1; i++) {
            this.children[i].index = i;
        }
    }

    public getNodeValue(): T {
        const nodeValue = {
            ...this.value,
        };

        if (this.children.length > 0) {
            nodeValue[this.childrenField] = this.getSerializedChildren();
        } else {
            delete nodeValue[this.childrenField];
        }

        return nodeValue;
    }

    private getSerializedChildren(): T[] {
        return this.children.map((node: TreeNode<T>) => node.getNodeValue());
    }

    private reorderChildrenIndex(): void {
        this.children.forEach((item: TreeNode<T>, index: number) => {
            item.index = index;
        });
    }
}

export class Tree<T> {
    public children: TreeNode<T>[];
    private childrenField: string;

    constructor(
        source: T[],
        childrenField: string,
    ) {
        this.childrenField = childrenField;
        const items = cloneDeep(source);

        this.children = items.map((child: T, childIndex: number) => {
            return new TreeNode<T>(childrenField, child, 0, childIndex, null);
        });
    }

    public addNode(node: T, index: number): void {
        const newNode = new TreeNode(this.childrenField, node, 0, index, null, true);
        this.children.splice(index, 0, newNode);
        this.reorderChildrenIndex();
    }

    public removeNode(index: number): void {
        this.children.splice(index, 1);
        this.reorderChildrenIndex();
    }

    public moveNode(from: number, to: number): void {
        if (this.children.length <= 1) {

            return;
        }
        from = Math.max(0, Math.min(from, this.children.length - 1));
        to = Math.max(0, Math.min(to, this.children.length - 1));
        const node = this.children.splice(from, 1)[0];
        this.children.splice(to, 0, node);
        for (let i = 0; i < this.children.length - 1; i++) {
            this.children[i].index = i;
        }
    }

    public getSerializedSource(): T[] {
        return this.children.map((node: TreeNode<T>) => node.getNodeValue());
    }

    private reorderChildrenIndex(): void {
        this.children.forEach((item: TreeNode<T>, index: number) => {
            item.index = index;
        });
    }
}
