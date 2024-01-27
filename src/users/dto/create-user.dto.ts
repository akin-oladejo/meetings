import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({description: 'User email'})
    @IsString()
    readonly email: string

    @ApiProperty({description: 'User password (will be salted)'})
    @IsString()
    readonly password: string

    @ApiProperty({description: 'Name of user. This name will be used to identify you in spaces'})
    @IsString()
    readonly name: string
}
