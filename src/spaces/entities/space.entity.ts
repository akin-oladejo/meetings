import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose' 
import { Document } from 'mongoose'

@Schema()
export class Space extends Document {
    @Prop()
    readonly hostId: string

    @Prop()
    readonly title: string
    
    @Prop()
    readonly partyId: string
    
    @Prop({default: new Date()})
    readonly startTime: Date
    
    @Prop({default: null})
    readonly endTime: Date
    

    @Prop()
    readonly inSession: boolean
    
    // @Prop()
    // readonly members: string[]
    
    // @Prop({default: 0})
    // readonly nExited: number
    
    @Prop({default: 0})
    readonly maxAttended: number
    
    @Prop(raw({
        pleased: {type: Number, default:0},
        displeased: {type: Number, default:0},
        neutral: {type: Number, default:0}
    }))
    readonly ratings: Record<string, any>
}

export const spaceSchema = SchemaFactory.createForClass(Space)