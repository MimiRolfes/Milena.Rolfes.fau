import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

export class Link extends Node {

    protected target: Node;

    constructor(baseName: string, parent: Directory, target: Node) {
        super(baseName, parent);
        if (!target) throw new MethodFailedException();
        this.target = target;
        this.checkInvariants();
    }

    public getTarget(): Node {
        return this.target;
    }

    public rename(newName: string): void {
        super.rename(newName);
        this.checkInvariants();
    }

    protected checkInvariants(): void {
        super.checkInvariants();
        if (!this.target) throw new MethodFailedException();
    }
}