"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarAnotacao(titulo: string, conteudo: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const anotacao = await prisma.anotacoes.create({
      data: {
        authorId: userId,
        titulo,
        conteudo
      }
    })
    return { success: true, anotacao }
  } catch (error) {
    console.error("Erro ao criar anotacao:", error);
    return { success: false, error: "Falha ao criar uma anotacao" }
  }
}