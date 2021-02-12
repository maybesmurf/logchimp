const database = require("../database");

// utils
const error = require("../errorResponse");

module.exports = async (req, res, next) => {
	const id = req.body.id;
	const url = req.params.url;

	const board = await database
		.select()
		.from("boards")
		.where({
			boardId: id || null
		})
		.orWhere({
			url: url || null
		})
		.first();

	if (!board) {
		return res.status(404).send({
			message: error.api.boards.boardNotFound,
			code: "BOARD_NOT_FOUND"
		});
	}

	req.board = board;
	next();
};
