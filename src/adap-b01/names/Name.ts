export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    
    constructor(other: string[], delimiter?: string) {
        this.components = [...other];        // defensive copy
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    
    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    
    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1);
    }
}

