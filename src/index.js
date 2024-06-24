import "dotenv/config";
import connectToMongo from "./db/db.js";
import { app } from "./app.js";

connectToMongo()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `⚙️  Server is running at port : ${process.env.PORT} euuuuuuu 🥳`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
