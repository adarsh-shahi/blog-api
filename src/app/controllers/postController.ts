import { NextFunction, Request, Response } from "express";
import pool from "../config/db";
import AppError from "../utils/AppError";
import {
	findPostById,
	makePost,
	updatePostById,
	deletePostById,
	getPostsByUserId,
	getAllPost,
} from "../queries/postQueries";
import { url } from "inspector";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const limit: number = +(req.query.limit || "") || 2;
		const page: number = +(req.query.page || "") || 1;

		const response = await pool.query(getAllPost(limit, limit * (page - 1)));
		console.log(response);
		res.status(200).json({
			status: "success",
			message: {
				postLength: response.rowCount,
				posts: response.rows,
			},
		});
	} catch (err: any) {
		console.log(err.message);
		next(new AppError("internal server error", 502));
	}
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			title,
			content,
			url,
		}: { content: string; title: string; url?: string } = req.body;
		if (!content || !title)
			return next(new AppError("add content and title to make a post", 401));
		await pool.query(makePost(req.user.id, title, content, url));
		res.status(201).json({
			status: "success",
			message: "posted",
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await pool.query(findPostById(+req.params.id));
		if (!response.rows.length) return next(new AppError("post not found", 404));
		const postData = {
			username: response.rows[0].username,
			user_id: response.rows[0].user_id,
			title: response.rows[0].title,
			content: response.rows[0].content,
			post_id: response.rows[0].id,
			updated_at: response.rows[0].updated_at,
		};
		res.status(200).json(postData);
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const getAllPostsByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = +req.params.id;
	const response = await pool.query(getPostsByUserId(userId));
	const totalPosts = response.rows.length;
	console.log(response.rows);
	res.status(200).json({
		status: "success",
		message: {
			totalPosts,
			posts: response.rows,
		},
	});
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const postId = +req.params.id;
		const {
			content,
			title,
			url,
		}: { content?: string; title?: string; url?: string } = req.body;

		if (!content && !title)
			return next(new AppError("must have title or content to edit", 403));
		const response = await pool.query(findPostById(postId));
		console.log(response);

		if (response.rows[0].user_id !== req.user.id)
			return next(
				new AppError("You are not authorized to edit this post", 403)
			);
		const post: { title: string; content: string; url: string } = {
			title: "",
			content: "",
			url: "",
		};

		if (title) post.title = title;
		if (content) post.content = content;
		if (url) post.url = url;
		await pool.query(updatePostById(postId, post));

		res.status(201).json({
			status: "success",
			message: "post updated",
		});
	} catch (err: any) {
		console.log(err);
		next(new AppError(err.message, 500));
	}
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const postId = +req.params.id;
		const response = await pool.query(findPostById(postId));
		if (response.rows[0].user_id !== req.user.id)
			return next(
				new AppError("You are not authorized to delete this post", 403)
			);
		await pool.query(deletePostById(postId));
		res.status(201).json({
			status: "success",
			message: "post deleted",
		});
	} catch (err: any) {
		next(new AppError("internal server error", 500));
	}
};

export {
	getAllPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
	getAllPostsByUserId,
};
