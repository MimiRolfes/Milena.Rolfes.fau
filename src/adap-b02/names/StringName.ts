import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
        this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
    }

    private split(): string[] {
        return this.name === "" ? [] : this.name.split(this.delimiter);
    }

    private save(parts: string[]): void {
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) return this.name;
        return this.split().join(delimiter);
    }

    public asDataString(): string {
        return this.asString(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.split()[i];
    }

    public setComponent(i: number, c: string): void {
        const parts = this.split();
        parts[i] = c;
        this.save(parts);
    }

    public insert(i: number, c: string): void {
        const parts = this.split();
        parts.splice(i, 0, c);
        this.save(parts);
    }

    public append(c: string): void {
        const parts = this.split();
        parts.push(c);
        this.save(parts);
    }

    public remove(i: number): void {
        const parts = this.split();
        parts.splice(i, 1);
        this.save(parts);
    }

    public concat(other: Name): void {
        const parts = this.split();
        for (let i = 0; i < other.getNoComponents(); i++) {
            parts.push(other.getComponent(i));
        }
        this.save(parts);
    }
}
