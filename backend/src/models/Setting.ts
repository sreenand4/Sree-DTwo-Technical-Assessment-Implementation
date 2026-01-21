import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
    name: string;
    value: any;
    createdAt?: Date;
    updatedAt?: Date;
}

const SettingSchema: Schema = new Schema({
    // For frontend display
    name: {
        type: String,
        required: true,
    },
    // Schemaless JSON body 
    value: {
        type: Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
})

export default mongoose.model<ISetting>('Setting', SettingSchema);