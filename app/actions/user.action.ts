"use server"

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!user || !userId) return;

    //Checar se o usuario existe
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      }
    })
    return dbUser;
  } catch (error) {
    console.log("Erro ao sincronizar o usuario")
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  })
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("Usuário não encontrado!");
  return user.id;
}