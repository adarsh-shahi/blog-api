import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://192.168.0.111:3001"); // update to match the domain you will make the request from
// 	// res.header(
// 	// 	"Access-Control-Allow-Headers",
// 	// 	"Origin, X-Requested-With, Content-Type, Accept"
// 	// );
// 	next();
// });

const PORT = parseInt(process.env.PORT || "") || 8000;
const HOST: string = `localhost`;

app.listen(PORT, HOST, () => {
	console.log(`Listening on: ${HOST}:${PORT}`);
});
