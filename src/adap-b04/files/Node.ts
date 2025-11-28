import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class Node {

    protected baseName: string;
    protected parent: Directory | null;

    constructor(baseName: string, parent: Directory | null) {
        if (!baseName) throw new MethodFailedException();
        this.baseName = baseName;
        this.parent = parent;
        this.checkInvariants();
    }

    public getBaseName(): string {
        return this.baseName;
    }

    public getParent(): Directory | null {
        return this.parent;
    }

    public rename(newName: string): void {
        if (!newName) throw new MethodFailedException();
        const old = this.baseName;
        this.baseName = newName;
        if (this.baseName !== newName) throw new MethodFailedException();
        this.checkInvariants();
    }

    protected checkInvariants(): void {
        if (!this.baseName) throw new MethodFailedException();
    }
}