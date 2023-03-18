import { IUserData } from "../controllers/auth";
import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
	namespace Express {
		export interface Request {
			user: IUserData;
		}
	}
}

declare module "jsonwebtoken" {
	export interface JwtPayload {
		username: string;
		email: string;
	}
}
