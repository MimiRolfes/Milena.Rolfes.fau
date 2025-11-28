import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter.length !== 1) throw new Error("Pre");
        this.delimiter = delimiter;
        this.assertInvariant();
    }

    protected assertInvariant(): void {
        if (this.delimiter.length !== 1) throw new Error("Inv");
        if (this.getNoComponents() < 0) throw new Error("Inv");
    }

    public clone(): Name {
        throw new Error("Override");
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter.length !== 1) throw new Error("Pre");
        const result = this.asDataString().split(DEFAULT_DELIMITER).join(delimiter);
        if (result.length < 0) throw new Error("Post");
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) parts.push(this.getComponent(i));
        const result = parts.join(DEFAULT_DELIMITER);
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
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public concat(other: Name): void {
        if (other == null) throw new Error("Pre");
        const before = this.getNoComponents();
        for (let i = 0; i < other.getNoComponents(); i++)
            this.append(other.getComponent(i));
        if (this.getNoComponents() !== before + other.getNoComponents()) throw new Error("Post");
        this.assertInvariant();
    }

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
}