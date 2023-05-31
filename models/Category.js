const { Schema, model, models, default: mongoose } = require("mongoose");


// Define the schema for the category
const CategorySchema = new Schema(
    {
        // The name of the category, which is a required string
        name: {type: String, required : true},
        parent : {type:mongoose.Types.ObjectId, ref:'Category'},
        properties:[{type:Object}],
    }
);

// Export the Category model, creating it if it doesn't exist yess
export const Category =models?.Category || model('Category', CategorySchema);