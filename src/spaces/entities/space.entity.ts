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
    
    @Prop({default: new Date()})
    readonly startTime: Date
    
    @Prop({default: null})
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