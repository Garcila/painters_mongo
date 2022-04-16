const { Schema, model } = require("mongoose");

const PaintingSchema = new Schema({
	title: String,
	style: String,
});

const Painting = model("Painting", PaintingSchema);

module.exports = Painting;
