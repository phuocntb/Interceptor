import { Expose } from "class-transformer";

export class FindOneDto {
    @Expose()
    id: number;
    name: string;
    pass: string;
    @Expose()
    role: string;
    @Expose()
    status: boolean;
}