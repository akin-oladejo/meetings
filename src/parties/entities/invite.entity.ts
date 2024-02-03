import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose' 
import { Document } from 'mongoose'

@Schema()
export class Invite extends Document {
    @Prop()
    readonly userId: string
    
    @Prop({default: new Date()})
    readonly requestTime: Date
}

export const inviteSchema = SchemaFactory.createForClass(Invite)