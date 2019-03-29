export enum Environment {
    Development,
    Production
}

export class Env {
    public static get current(): Environment {
        switch (process.env.NODE_ENV) {
            case 'production':
                return Environment.Production;
            default:
                return Environment.Development;
        }
    }

    public static get isDev(): boolean {
        return this.current === Environment.Development;
    }

    public static get isProd(): boolean {
        return this.current === Environment.Production;
    }
}
