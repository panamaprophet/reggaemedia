import { DecoratorNode } from 'lexical';
import { ReactNode } from 'react';


export class Node extends DecoratorNode<ReactNode> {
    static getType() {
        return 'cutter';
    }

    static clone(node: Node) {
        return new Node(node.__key);
    }

    static importJSON() {
        return new Node();
    }

    exportJSON() {
        return {
            type: this.getType(),
            version: 1,
        };
    }

    createDOM() {
        return document.createElement('div');
    }

    updateDOM() {
        return false;
    }

    exportDOM() {
        return {
            element: this.createDOM(),
        };
    }

    decorate() {
        return <div className="w-full border-2 border-b border-gray-400" />
    }

    isKeyboardSelectable() {
        return false;
    }
}
