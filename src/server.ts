import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

const PORT = parseInt(process.env.PORT || "") || 8000;
const HOST: string = `localhost`;

app.listen(PORT, HOST, () => {
	console.log(`Listening on: ${HOST}:${PORT}`);
});
