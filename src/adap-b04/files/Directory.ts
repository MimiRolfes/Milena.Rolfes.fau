import { Node } from "./Node";
import { MethodFailedException } from "../common/MethodFailedException";

export class Directory extends Node {

    protected children: Node[] = [];

    constructor(baseName: string, parent: Directory | null) {
        super(baseName, parent);
        this.checkInvariants();
    }

    public add(n: Node): void {
        if (!n) throw new MethodFailedException();
        if (this.children.includes(n)) throw new MethodFailedException();
        this.children.push(n);
        if (!this.children.includes(n)) throw new MethodFailedException();
        this.checkInvariants();
    }

    public remove(n: Node): void {
        if (!n) throw new MethodFailedException();
        const before = this.children.length;
        this.children = this.children.filter(c => c !== n);
        if (this.children.length !== before - 1) throw new MethodFailedException();
        this.checkInvariants();
    }

    public list(): Node[] {
        return this.children.slice();
    }

    protected checkInvariants(): void {
        super.checkInvariants();
        if (!Array.isArray(this.children)) throw new MethodFailedException();
    }
}