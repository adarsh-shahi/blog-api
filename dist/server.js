"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://192.168.0.111:3001"); // update to match the domain you will make the request from
// 	// res.header(
// 	// 	"Access-Control-Allow-Headers",
// 	// 	"Origin, X-Requested-With, Content-Type, Accept"
// 	// );
// 	next();
// });
// app.use(
// 	cors({
// 		origin: "http://localhost:3001",
// 	})
// );
const PORT = parseInt(process.env.PORT || "") || 8000;
const HOST = `localhost`;
app_1.app.listen(PORT, HOST, () => {
    console.log(`Listening on: ${HOST}:${PORT}`);
});
