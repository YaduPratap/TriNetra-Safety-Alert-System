import Crime from "../models/crime.js";
import User from "../models/user.js";


const report = async (req, res) => {
    const { timeOfCrime, typeOfReporter, typeOfCrime, customCrimeDescription, proof, severity } = req.body;
    const { userId } = req.user;

    console.log("User ID from Token:", userId);

    try {
      const location = {
        latitude: Number(req.body.latitude),
        longitude: Number(req.body.longitude),
      };
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
            return res.status(400).json({ message: "Invalid or missing location data" });
        }

        const uploadedProof = req.files?.map(file => file.path) || [];
    
        const crimeData = {
            reporter: userId,
            timeOfCrime: new Date(),
            typeOfReporter,
            typeOfCrime,
            proof,
            severity,
            proof: uploadedProof,
            location
        };

        if (typeOfCrime === "custom") {
            crimeData.customCrimeDescription = customCrimeDescription;
        }

        await Crime.create(crimeData);

        res.status(200).json({ message: "Reported successfully" });
    } catch (error) {
        console.error("Error in report function:", error);
        res.status(500).json({ message: error.message });
    }
};


const getCrimeLocation = async (req, res) => {
  const { typeOfCrime } = req.params;

  try {
    // If no typeOfCrime is provided, return all locations
    if (!typeOfCrime || typeOfCrime.trim() === "") {
      const locations = await Crime.find().populate("location");
      return res.status(200).json({ message: "Successful", locations });
    }

    const typesArray = typeOfCrime.split(',').map(type => type.trim());

    const locations = await Crime.find({
      typeOfCrime: { $in: typesArray }
    }).populate("location");

    return res.status(200).json({ message: "Successful", locations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const getAllCrime = async (req, res) => {
  try {
    const crime = await Crime.find();
    return res.status(200).json({ message: "Successful", crime });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { report, getCrimeLocation, getAllCrime };
