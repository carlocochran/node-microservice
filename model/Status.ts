export enum StatusCode {
    SUCCESSFUL = 'Successful',
    ERROR = 'Error'
}
export class Status{
    status: StatusCode;
    message: string;

    constructor(statusCode: StatusCode, message: string){
        this.status = statusCode;
        this.message = message;
    }

    public toString = (): string => {
        return JSON.stringify(this);
    }
}