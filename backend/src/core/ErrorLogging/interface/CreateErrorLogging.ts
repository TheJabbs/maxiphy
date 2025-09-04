export interface CreateErrorLogging {
    service: string,
    method: string,
    message: string,
    stackTrace?: string,
    metadata?: string
}