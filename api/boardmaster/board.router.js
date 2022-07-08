const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createBoard, updateBoard, getBoard, getBoardByID, getSelectBoard } = require('../boardmaster/board.controller');

router.post("/", checkToken, createBoard);
router.patch("/", checkToken, updateBoard);
router.get("/", checkToken, getBoard);
router.get("/select", checkToken, getSelectBoard);
router.get("/:id", checkToken, getBoardByID);

module.exports = router;