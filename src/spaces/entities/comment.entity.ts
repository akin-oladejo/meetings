import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose' 
import { Document } from 'mongoose'

@Schema()
export class Comment extends Document {
    @Prop()
    readonly spaceId: string

    @Prop()
    readonly content: string
    
    @Prop()
    readonly replyTo: string
    
    @Prop()
    readonly author: string
}

export const commentSchema = SchemaFactory.createForClass(Comment)