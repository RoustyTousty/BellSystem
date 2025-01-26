const fs = require("fs");
const path = require("path");

const soundsDir = path.join(__dirname, "../../public/sounds");

if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

const saveSound = (fileBuffer, fileName) => {
  if (!fileBuffer || !fileName) {
    throw new Error("Invalid fileBuffer or fileName");
  }

  const destination = path.join(soundsDir, fileName);

  try {
    fs.writeFileSync(destination, Buffer.from(fileBuffer));
    console.log(`${fileName} saved successfully at ${destination}.`);
  } catch (error) {
    console.error("Error saving sound:", error);
    throw error;
  }
};

const listSounds = () => {
  try {
    return fs.readdirSync(soundsDir);
  } catch (error) {
    console.error("Error listing sounds:", error);
    return [];
  }
};

const deleteSound = (fileName) => {
  const filePath = path.join(soundsDir, fileName);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`${fileName} deleted successfully.`);
    } else {
      throw new Error("File does not exist");
    }
  } catch (error) {
    console.error("Error deleting sound:", error);
    throw error;
  }
};

module.exports = { saveSound, listSounds, deleteSound };
