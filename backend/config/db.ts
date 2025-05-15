import mongoose, { ConnectOptions } from "mongoose"

const connectDB = async (): Promise<void> => {
    try {
        const base_uri: string =
            process.env.MONGO_URI || "fallback_connection_string"
        const dbName: string = "Todo"

        const conn = await mongoose.connect(base_uri, {
            dbName,
        } as ConnectOptions)

        console.log(
            `MongoDB is connected successfully at: ${conn.connection.host}`
        )
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Database connection Failed: ${error.message}`)
        } else {
            console.log(`Databse connection failed: ${String(error)}`)
        }

        process.exit(1)
    }
}

export default connectDB
