import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id === undefined) {
    res.status(400).json({ message: 'id is required' });
    return;
  }
  const postId = String(req.query.id);

  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}