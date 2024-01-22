import { IsInt, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    readonly content: string

    @IsInt()
    readonly replyTo: number

    @IsString()
    readonly author: string
}