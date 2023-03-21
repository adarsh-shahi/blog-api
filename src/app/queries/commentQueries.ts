const QcreateComment = (comment: string, postId: number, userId: number) => {
	return `
  INSERT INTO comments (comment, post_id, user_id) VALUES ('${comment}', ${postId}, ${userId})
  `;
};

const QdeleteComment = (postId: number, userId: number) => {
	return `
    DELETE FROM comments
    WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};

const QupdateComment = (comment: string, postId: number, userId: number) => {
	return `
   UPDATE comments
   SET comment = '${comment}'
   WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};

const QgetAllCommentsOnPost = (postId: number) => {
	return `
    SELECT username, comment FROM comments INNER JOIN users ON users.id = comments.user_id WHERE post_id = ${postId}
  `;
};

export {
	QcreateComment,
	QdeleteComment,
	QgetAllCommentsOnPost,
	QupdateComment,
};
