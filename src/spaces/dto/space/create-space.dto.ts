import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsObject, IsString, ValidateNested, IsNumber } from "class-validator"
import { rating } from "src/spaces/interfaces/rating.interface";

class Rating {
    @IsNumber()
    verySad: number;

    @IsNumber()
    veryHappy: number;
    
    @IsNumber()
    sad: number;
    
    @IsNumber()
    happy: number;
}

export class CreateSpaceDto {
    @IsString()
    readonly host: string

    @IsString()
    readonly title: string

    @IsString()
    readonly party: string
    
    @IsDateString()
    readonly startTime: Date

    @IsDateString()
    readonly endTime: Date

    @IsString({each:true})
    readonly members: string[]

    @IsNumber()
    readonly nExited: string

    @IsNumber()
    readonly maxAttended: number

    @IsObject()
    @ValidateNested() @Type(() => Rating)
    readonly rating: rating
}
