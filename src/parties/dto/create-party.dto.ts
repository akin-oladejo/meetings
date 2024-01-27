import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreatePartyDto {
    @ApiProperty({description: 'Name of the party'})
    @IsString()
    readonly name: string

    @ApiProperty({description: "Id's of members in the party"})
    @IsString({each: true})
    readonly members: string[]
}