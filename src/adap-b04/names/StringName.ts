import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);
        if (source == null) throw new Error("Pre");
        this.name = source;
        this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
        this.assertInvariant();
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter.length !== 1) throw new Error("Pre");
        const result = this.name.split(this.delimiter).join(delimiter);
        if (result.length < 0) throw new Error("Post");
        return result;
    }

    public asDataString(): string {
        const result = this.name.split(this.delimiter).join(DEFAULT_DELIMITER);
        if (result.length < 0) throw new Error("Post");
        return result;
    }

    public isEqual(other: Name): boolean {
        if (other == null) throw new Error("Pre");
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) return false;
        for (let i = 0; i < this.getNoComponents(); i++)
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        return true;
    }

    public getHashCode(): number {
        const s = this.asDataString();
        let hash = 0;
        for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
        return hash;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const parts = this.name.split(this.delimiter);
        if (i < 0 || i >= parts.length) throw new Error("Pre");
        return parts[i];
    }

    public setComponent(i: number, c: string) {
        let parts = this.name.split(this.delimiter);
        if (i < 0 || i >= parts.length) throw new Error("Pre");
        parts[i] = c;
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
        this.assertInvariant();
    }

    public insert(i: number, c: string) {
        let parts = this.name === "" ? [] : this.name.split(this.delimiter);
        if (i < 0 || i > parts.length) throw new Error("Pre");
        parts.splice(i, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
        this.assertInvariant();
    }

    public append(c: string) {
        let parts = this.name === "" ? [] : this.name.split(this.delimiter);
        parts.push(c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
        this.assertInvariant();
    }

    public remove(i: number) {
        let parts = this.name.split(this.delimiter);
        if (i < 0 || i >= parts.length) throw new Error("Pre");
        parts.splice(i, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
        this.assertInvariant();
    }

    public concat(other: Name): void {
        if (other == null) throw new Error("Pre");
        let parts = this.name === "" ? [] : this.name.split(this.delimiter);
        const before = parts.length;
        for (let i = 0; i < other.getNoComponents(); i++)
            parts.push(other.getComponent(i));
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
        if (this.noComponents !== before + other.getNoComponents()) throw new Error("Post");
        this.assertInvariant();
    }
}