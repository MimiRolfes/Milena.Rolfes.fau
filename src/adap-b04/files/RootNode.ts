import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

export class RootNode extends Directory {

    constructor() {
        super("", null);
        this.checkInvariants();
    }

    public rename(): void {
        throw new MethodFailedException();
    }

    protected checkInvariants(): void {
        super.checkInvariants();
        if (this.getParent() !== null) throw new MethodFailedException();
    }
}