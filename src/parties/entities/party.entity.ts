import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Party extends Document {
  @Prop()
  readonly creator: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly members: string[];
}

export const partySchema = SchemaFactory.createForClass(Party);
