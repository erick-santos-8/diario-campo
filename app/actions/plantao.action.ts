"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarPlantao(titulo: string, data: Date) {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const plantao = await prisma.plantoes.create({
      data: {
        authorId: userId,
        titulo,
        data
      }
    })
    return { success: true, plantao }
  } catch (error) {
    console.error("Erro ao criar aula:", error);
    return { success: false, error: "Falha ao criar uma aula" }
  }
}