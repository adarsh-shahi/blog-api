import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./controllers/errorController";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";

const app = express();

app.use(express.json());

// export interface IMiddleware {
// 	req: Request;
// 	res: Response;
// 	next: NextFunction;
// }

app.use((req, res, next) => {
	console.log(`working fine`);
	console.log(req.body);
	next();
});

app.use("/v1", userRouter);
app.use("/v1/posts", postRouter);

app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "Resourse not found",
	});
});

app.use(errorHandler);

export { app };
