declare global {
    namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string,
        GITHUB_SECRET: string,
        GITHUB_ID: string,
        }
    }
}