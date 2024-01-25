import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    readonly author: string

    @IsString()
    readonly content: string
}