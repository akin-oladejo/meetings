import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"

export class CreatePartyDto {
    @ApiProperty({description: 'Name of the party'})
    @IsString()
    readonly name: string

    @ApiProperty({description: 'Whether space is private'})
    @IsBoolean()
    readonly isPrivate: boolean
}