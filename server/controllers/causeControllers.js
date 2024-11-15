import Cause from "../models/causeModel.js";
export const getCauses = async (req, res) => {
  try {
    const causes = await Cause.find().populate("creator", "name avatar");
    res.json(causes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCauseById = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id)
      .populate("creator", "name avatar")
      .populate("likes", "name avatar");
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    res.json(cause);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCause = async (req, res) => {
  const { title, description, category, location, targetAmount, image } =
    req.body;
  const cause = new Cause({
    title,
    description,
    category,
    location: {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    },
    targetAmount,
    image,
    creator: req.user._id,
  });

  try {
    const newCause = await cause.save();
    res.status(201).json(newCause);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const likeCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    if (cause.likes.includes(req.user._id)) {
      cause.likes.pull(req.user._id);
    } else {
      cause.likes.push(req.user._id);
    }

    await cause.save();
    res.json({ likes: cause.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCommentCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    cause.comments.push({ user: req.user._id, text: req.body.text });
    await cause.save();
    res.json(cause.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
