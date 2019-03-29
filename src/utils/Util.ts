class ArrayUtil {
    public static dedupe<T>(arr: T[]): T[] {
        if (!Array.isArray(arr)) {
            return arr;
        }

        const ret: T[] = [];
        arr.forEach((item: T) => {
            if (!ret.includes(item)) {
                ret.push(item);
            }
        });
        return ret;
    }

    public static dedupeByKey<T>(arr: T[], key: string): T[] {
        if (!Array.isArray(arr)) {
            return arr;
        }

        const ret: T[] = [];
        const keys: string[] = [];

        arr.forEach((item: T) => {
            if (!item || typeof item !== 'object') {
                return;
            }
            if (key in item) {
                if (!keys.includes(item[key])) {
                    ret.push(item);
                    keys.push(item[key]);
                }
            }
        });
        return ret;
    }
}

export const Util = { Array: ArrayUtil };
