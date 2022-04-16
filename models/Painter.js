const { Schema, model } = require("mongoose");

const PainterSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		country: {
			type: String,
			required: true,
			trim: true,
		},
		// associating the Painting and Painter Schema.
		paintings: [
			{
				// creates the connection
				// to the object with the
				// ObjectId -> Painting
				type: Schema.Types.ObjectId,
				// What doc to look for
				ref: "Painting",
			},
		],
	},
	{
		toJSON: {
			// Enable the Schema to use virtuals (computed values - functions)
			virtuals: true,
		},
		// in this case we are not using the id, therefore
		// we set it to false (don't return it)
		id: false,
	}
);

// Use properties in the schema to generate a painterCountry property
// computed property usually evaluated when the document is accessed
// Virtuals are part of Mongoose, in this case we make a getter function
PainterSchema.virtual("painterCountry").get(function () {
	return `${this.name
		.replace(/\s+/g, "")
		.toLowerCase()}-${this.country.slice(0, 2).toUpperCase()}`;
});

// create the Comment model using the CommentSchema
const Painter = model("Painter", PainterSchema);

module.exports = Painter;
