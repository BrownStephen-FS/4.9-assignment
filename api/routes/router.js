const express = require("express");
const router = express.Router();
const Car = require("../models/cars");
const messages = require("../messages/message");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getCar = async (req, res, next) => {
  let car;
  try {
    car = await Car.findById(req.params.id);
    if (car === null) {
      return res.status(404).json({ message: messages.carNotFound });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.car = car;
  next();
};

router.get("/:id", getCar, async (req, res) => {
  res.json(res.car);
});

router.post("/", async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    type: req.body.type,
  });

  try {
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", getCar, async (req, res) => {
  const requestBody = req.body;

  if (requestBody.make != null) {
    res.car.make = requestBody.make;
  }
  if (requestBody.model != null) {
    res.car.model = requestBody.model;
  }
  if (requestBody.year != null) {
    res.car.year = requestBody.year;
  }
  if (requestBody.color != null) {
    res.car.color = requestBody.color;
  }
  if (requestBody.type != null) {
    res.car.type = requestBody.type;
  }

  try {
    const updatedCar = await res.car.save();
    res.json({ message: messages.carUpdated, updatedCar });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getCar, async (req, res) => {
  try {
    await res.car.remove();
    res.json({ message: messages.carRemoved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
