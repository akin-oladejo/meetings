import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose' 
import { Document } from 'mongoose'
import { rating } from '../interfaces/rating.interface'

@Schema()
export class Space extends Document {
    @Prop()
    readonly host: string

    @Prop()
    readonly title: string
    
    @Prop()
    readonly party: string
    
    @Prop()
    readonly startTime: Date
    
    @Prop()
    readonly endTime: Date
    
    @Prop()
    readonly isPrivate: boolean

    @Prop()
    readonly inSession: boolean
    
    @Prop()
    readonly members: string[]
    
    @Prop()
    readonly nExited: string
    
    @Prop()
    readonly maxAttended: number
    
    @Prop({type: Object})
    readonly rating: rating
}

export const spaceSchema = SchemaFactory.createForClass(Space)