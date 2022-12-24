import { Post, User } from '@prisma/client';
import prisma   from '../prisma/prisma';

export type IPostsWithUser = (Post& { author: User | null})
export type IUserWithPosts = User & {posts: Post[]}

export const findAllPosts = async ()  => {
    const posts: IPostsWithUser[] =  await prisma.post.findMany({
        include: {
            author: true,
        }
    });
    return posts;
}


export const findPostById = async (id: string) => {
    const post: IPostsWithUser | null = await prisma.post.findUnique({
        where: { id},
        include: {
            author: true,
        }
    });
    return post;
}


export const findPostbyAuthorId = async (id: string) => {
    const posts:IUserWithPosts = await prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
            posts: true,
        }
    });
    return posts;
}

export const findPostbyAuthorEmail = async (email: string) => {
    const posts:IUserWithPosts = await prisma.user.findUniqueOrThrow({
        where: { email },
        include: {
            posts: true,
        }
    });
    return posts;
}

export const deletePostbyId = async (id: string) => {
    await prisma.user.delete({
        where: {id},
      })

}