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


export async function getAnotacoes() {
  try {
    const userId = await getDbUserId();

    if (!userId) return [];

    const anotacoes = await prisma.anotacoes.findMany({
      where: { authorId: userId },
      orderBy: { titulo: "asc" }, // Ordena por dia da semana
    });

    return anotacoes;
  } catch (error) {
    console.error("Erro ao buscar anotacoes", error);
    return [];
  }
}
