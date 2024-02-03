import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsString } from "class-validator"

export class CreateInviteDto {
    @ApiProperty({description: 'Id of the user'})
    @IsString()
    readonly userId: string
}