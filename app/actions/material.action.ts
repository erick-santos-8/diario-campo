"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarMaterial(links: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const material = await prisma.materiais.create({
      data: {
        authorId: userId,
        links,
      }
    })
    return { success: true, material }
  } catch (error) {
    console.error("Erro ao criar material:", error);
    return { success: false, error: "Falha ao criar um material" }
  }
}