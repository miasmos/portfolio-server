import crypto = require('crypto');

export class Random {
    public static range(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static fromArray<T>(arr: T[], count: number = 1, result: T[] = []): T[] {
        if (count > arr.length) {
            return Random.fromArray(arr, arr.length);
        }
        if (result.length === count) {
            return result;
        }

        const item = arr[Math.floor(Math.random() * arr.length)];
        if (!result.includes(item)) {
            result.push(item);
        }

        return Random.fromArray(arr, count, result);
    }

    public static string(length: number): string {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length); /** return required number of characters */
    }

    public static coinflip(): boolean {
        return Random.range(0, 1) <= 0.5;
    }
}
