import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
}

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
        this.checkInvariants();
    }

    public open(): void {
        if (this.state !== FileState.CLOSED) throw new MethodFailedException();
        this.state = FileState.OPEN;
        if (this.state !== FileState.OPEN) throw new MethodFailedException();
        this.checkInvariants();
    }

    public read(noBytes: number): Int8Array {
        if (this.state !== FileState.OPEN) throw new MethodFailedException();
        if (noBytes < 0) throw new MethodFailedException();
        return new Int8Array(noBytes);
    }

    public close(): void {
        if (this.state !== FileState.OPEN) throw new MethodFailedException();
        this.state = FileState.CLOSED;
        if (this.state !== FileState.CLOSED) throw new MethodFailedException();
        this.checkInvariants();
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected checkInvariants(): void {
        super.checkInvariants();
        if (this.state !== FileState.OPEN &&
            this.state !== FileState.CLOSED &&
            this.state !== FileState.DELETED) {
            throw new MethodFailedException();
        }
    }
}