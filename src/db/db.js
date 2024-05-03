import mongoose from "mongoose";

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@urbannest.9k1pr4t.mongodb.net/${process.env.DB_NAME}`;

const connectToMongo = async () => {
    await mongoose
        .connect(mongoURI)
        .then((res) => {
            console.log("\n MongoDb Connected ! DB HOST: " + res.connection.host + "\n");
            console.log(" DB Name: " + res.connection.name + "\n");
            
        })
        .catch(() => {
            console.error(" Err:  Can't Connect to Server");
            process.exit(1)
        });
};
mongoose.set("strictQuery", true);
export default connectToMongo;