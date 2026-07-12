import index from "./index.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

connectDB();

index.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
