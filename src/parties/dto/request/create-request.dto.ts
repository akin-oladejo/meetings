import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRequestDto {
    @ApiProperty({description: 'Id of the user'})
    @IsString()
    readonly userId: string

    @ApiProperty({description: "Id of the party"})
    @IsString()
    readonly partyId:string
}