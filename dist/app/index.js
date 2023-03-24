"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
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
app.use("/v1", userRoutes_1.default);
app.use("/v1/posts", postRoutes_1.default);
app.all("*", (req, res) => {
    console.log("in unspecified route");
    res.status(404).json({
        status: "fail",
        message: "Resourse not found",
    });
});
app.use(errorController_1.default);
