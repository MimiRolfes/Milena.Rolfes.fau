import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    

    protected mask(component: string): string {
        return component
            .replace(/\\/g, "\\\\")                // Escape → \\ 
            .replace(new RegExp(`\\${this.delimiter}`, "g"), `\\${this.delimiter}`);
    }

    protected unmask(component: string): string {
        let result = "";
        let escaping = false;

        for (const ch of component) {
            if (escaping) {
                result += ch;
                escaping = false;
            } else if (ch === ESCAPE_CHARACTER) {
                escaping = true;
            } else {
                result += ch;
            }
        }
        return result;
    }

    

    public asString(delimiter: string = this.delimiter): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(delimiter);
    }

    public asDataString(): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.mask(this.getComponent(i)));
        }
        return parts.join(this.delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) return false;

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        const data = this.asDataString();
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = (hash * 31 + data.charCodeAt(i)) >>> 0;
        }
        return hash;
    }

    

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public clone(): Name {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return new (this.constructor as any)(parts, this.delimiter);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
}
