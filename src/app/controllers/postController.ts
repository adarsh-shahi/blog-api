import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import AppError from "../utils/AppError";
import { makePost } from "../queries/postQueries";

const getAllPosts = () => {};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { content }: { content: string } = req.body;
		content.trim();
		if (!content) return next(new AppError("add content to make a post", 401));
		await pool.query(makePost(req.user.id, content));
		res.status(201).json({
			status: "success",
			message: "posted",
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const getPost = () => {};

const updatePost = () => {};

const deletePost = () => {};

export { getAllPosts, createPost, getPost, updatePost, deletePost };
