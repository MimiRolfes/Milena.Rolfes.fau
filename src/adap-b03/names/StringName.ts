import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        if (source === "") {
            this.components = [];
        } else {
            this.components = source.split(this.delimiter);
        }
    }

    public clone(): Name {
        return new StringName(this.components.join(this.delimiter), this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.components.splice(i, 1);
    }
}
