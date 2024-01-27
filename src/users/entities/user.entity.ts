import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({unique:true})
  readonly email: string;

  @Prop()
  readonly password: string;

  @Prop()
  readonly name: string;
}

export const userSchema = SchemaFactory.createForClass(User);
