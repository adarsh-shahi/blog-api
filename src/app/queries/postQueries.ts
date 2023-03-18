const makePost = (id: number, content: string) => {
	return `
    INSERT INTO posts (user_id, content) VALUES (${id}, '${content}');
  `;
};

const findPostById = (id: number) => {
	return `
  SELECT posts.id, posts.updated_at, content, username, user_id FROM posts INNER JOIN users ON users.id = posts.user_id WHERE posts.id = ${id};
  `;
};

const updatePostById = (id: number, content: string) => {
	return `
  UPDATE posts SET content = '${content}' WHERE id = ${id};
  `;
};

const deletePostById = (id: number) => {
	return `
     DELETE FROM posts WHERE id = ${id}
  `;
};

export { makePost, findPostById, updatePostById, deletePostById };
