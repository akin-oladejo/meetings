import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMemberDto {
    // @ApiProperty({description:"Id of the space this member is joining"})
    // @IsString()
    // readonly spaceId: string

    @ApiProperty({description:"Name of the member"})
    @IsString()
    readonly name: string
}
