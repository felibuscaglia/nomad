export interface UnsplashImageDTO {
    total: number;
    results: UnsplashImageResult[];
}

interface UnsplashImageResult {
    user: {
        username: string;
    }
    urls: {
        regular: string;
    }
}