import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({description:'Author of the comment'})
    @IsString()
    readonly author: string

    @ApiProperty({description:'Content of the comment'})
    @IsString()
    readonly content: string
}