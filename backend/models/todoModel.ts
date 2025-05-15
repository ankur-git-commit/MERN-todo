import mongoose, { Document, Schema} from "mongoose";

export interface ITodo extends Document {
    task: string
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
}

const TodoSchema = new Schema<ITodo>({
    task : {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
})

export default mongoose.model<ITodo>("Todo", TodoSchema)