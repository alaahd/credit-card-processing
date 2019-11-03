var express = require("express");
var database = require("../db");
const { ObjectId } = require("mongodb");
var luhn = require("luhn");
var router = express.Router();

const prepare = item => ({
  ...item,
  id: item._id.toString()
});

/* GET cards listing. */
router.get("/", async function(req, res, next) {
  const db = await database();

  const cards = db.collection("cards");
  const cardsList = await cards
    .find({})
    .sort({ _id: -1 })
    .toArray();

  res.status(200).json({
    result: [...cardsList]
  });
});

/* POST add new card. */
router.post("/", async function(req, res, next) {
  const db = await database();

  const { name, number, limit } = req.body;

  if (!name || !number || !limit) {
    return res.status(400).json({
      result: false,
      error: {
        message:
          "One of the following manfdatory fields are missing: name, number or limit"
      }
    });
  }

  if (!luhn.validate(number)) {
    return res.status(400).json({
      result: false,
      error: {
        message: "You have inserted an invalid credit card number !"
      }
    });
  }

  // refefrence to the cards collection in mongoDB
  const cards = db.collection("cards");

  // check if the card is already exists
  const card = await cards.findOne({ number });
  if (card) {
    return res.status(422).json({
      result: false,
      error: {
        message: "The card is already exists in the database !"
      }
    });
  }

  // insert new card into mongodb
  await cards.insertOne({
    name,
    number,
    limit
  });
  const newCard = await cards.findOne({ number });

  return res.status(200).json({
    result: {
      ...newCard
    }
  });
});

// DELETE ALL CARDS TO RESET THE DATA
router.delete("/", async function(req, res, next) {
  const db = await database();

  const cards = db.collection("cards");
  await cards.remove({});
  const cardsList = await cards.find({}).toArray();

  res.status(200).json({
    result: [...cardsList]
  });
});

module.exports = router;
