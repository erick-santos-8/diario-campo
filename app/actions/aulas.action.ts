"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarAula(titulo: string, horario: string, dia: "SEGUNDA" | "TERÇA" | "QUARTA" | "QUINTA" | "SEXTA") {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const aula = await prisma.aulas.create({
      data: {
        authorId: userId,
        titulo,
        horario,
        dia
      }
    })
    return { success: true, aula }
  } catch (error) {
    console.error("Erro ao criar aula:", error);
    return { success: false, error: "Falha ao criar uma aula" }
  }
}


export async function getAulas() {
  try {
    const userId = await getDbUserId();

    if (!userId) return [];

    const aulas = await prisma.aulas.findMany({
      where: { authorId: userId },
      orderBy: { dia: "asc" }, // Ordena por dia da semana
    });

    return aulas;
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
    return [];
  }
}
