import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
            type: Schema.Types.ObjectId,
            ref: "products",
            default: [],
            required: true
        }
}],
    quantity: { type: Number, default: 1 },
    total: { type: Number, required: true },
})

cartSchema.pre('find', function(){
    this.populate('products');
})

cartSchema.pre('findById', function(){
    this.populate('products');
})

export const CartModel = model("users", cartSchema);