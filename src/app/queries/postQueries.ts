const makePost = (id: number, title: string, content: string) => {
	return `
    INSERT INTO posts (user_id, title, content) VALUES (${id}, '${title}', '${content}');
  `;
};

const getAllPost = (limit: number, offset: number) => {
	return `
  SELECT username, user_id, posts.id, title, content, posts.updated_at FROM posts INNER JOIN users ON users.id = posts.user_id ORDER BY posts.updated_at DESC LIMIT ${limit} OFFSET ${offset};
  `;
};

const findPostById = (id: number) => {
	return `
  SELECT posts.id, posts.updated_at, title, content, username, user_id FROM posts INNER JOIN users ON users.id = posts.user_id WHERE posts.id = ${id};
  `;
};

const updatePostById = (
	id: number,
	post: { title?: string; content?: string }
) => {
	return `
  UPDATE posts SET${post.content ? ` content = '${post.content}' ` : ""}${
		post.content && post.title ? "," : ""
	}${post.title ? ` title = '${post.title}' ` : ""}WHERE id = ${id};
  `;
};

const deletePostById = (id: number) => {
	return `
     DELETE FROM posts WHERE id = ${id}
  `;
};

const getPostsByUserId = (userId: number) => {
	return `
    SELECT posts.id, posts.updated_at, user_id, title, content FROM posts JOIN users ON users.id = posts.user_id WHERE user_id = ${userId}
  `;
};

export {
	makePost,
	findPostById,
	updatePostById,
	deletePostById,
	getPostsByUserId,
	getAllPost,
};
