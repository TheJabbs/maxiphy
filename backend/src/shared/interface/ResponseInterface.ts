export interface ResponseInterface<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}
