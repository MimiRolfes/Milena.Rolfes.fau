import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);
        if (!Array.isArray(source)) throw new Error("Pre");
        this.components = [...source];
        this.assertInvariant();
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter.length !== 1) throw new Error("Pre");
        const result = this.components.join(delimiter);
        if (result.length < 0) throw new Error("Post");
        return result;
    }

    public asDataString(): string {
        const result = this.components.join(DEFAULT_DELIMITER);
        if (result.length < 0) throw new Error("Post");
        return result;
    }

    public isEqual(other: Name): boolean {
        if (other == null) throw new Error("Pre");
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) return false;
        for (let i = 0; i < this.components.length; i++)
            if (this.components[i] !== other.getComponent(i)) return false;
        return true;
    }

    public getHashCode(): number {
        const s = this.asDataString();
        let hash = 0;
        for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
        return hash;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) throw new Error("Pre");
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) throw new Error("Pre");
        this.components[i] = c;
        this.assertInvariant();
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) throw new Error("Pre");
        this.components.splice(i, 0, c);
        this.assertInvariant();
    }

    public append(c: string) {
        this.components.push(c);
        this.assertInvariant();
    }

    public remove(i: number) {
        if (i < 0 || i >= this.components.length) throw new Error("Pre");
        this.components.splice(i, 1);
        this.assertInvariant();
    }

    public concat(other: Name): void {
        if (other == null) throw new Error("Pre");
        const before = this.components.length;
        for (let i = 0; i < other.getNoComponents(); i++)
            this.components.push(other.getComponent(i));
        if (this.components.length !== before + other.getNoComponents()) throw new Error("Post");
        this.assertInvariant();
    }
}