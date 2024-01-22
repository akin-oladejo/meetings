import { IsBoolean, IsDateString, IsString } from "class-validator"

export class CreateSpaceDto {
    @IsDateString()
    readonly startTime: Date

    @IsDateString()
    readonly endTime: Date

    @IsBoolean()
    readonly inSession: boolean

    @IsBoolean()
    readonly isPrivate: boolean

    @IsString({each:true})
    readonly members: string[]
}
