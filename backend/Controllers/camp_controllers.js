const Camp = require("../Models/Camp");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const camp = await Camp.find();
    res.json(camp);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "error getting all camp sites" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const camp = await Camp.findById(id);
    res.json(camp);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "error getting particular camp site" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const camp = await Camp.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.json(camp);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "error updating a camp site" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const camp = await Camp.findByIdAndDelete(id);
    res.json(camp);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "error in deleting a camp" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await new Camp({ ...req.body }).save();
    res.status(200).json({ message: "camp created" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "error creating camp site" });
  }
});

module.exports = router;
