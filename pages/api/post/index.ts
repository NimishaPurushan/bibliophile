// pages/api/post/index.ts

import prisma from '../../../prisma/prisma';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email||"nimisha.mec@gmail.com" } },
    },
  });
  res.json(result);
}
