"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarTarefaDia(tarefa: string, descricao: string, type: "SEGUNDA" | "TERÇA" | "QUARTA" | "QUINTA" | "SEXTA") {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const calendarioDia = await prisma.calendario_Semanal.create({
      data: {
        authorId: userId,
        tarefa,
        descricao,
        type
      }
    })
    return { success: true, calendarioDia }
  } catch (error) {
    console.error("Erro ao criar calendário semanal:", error);
    return { success: false, error: "Falha ao criar uma tarefa" }
  }
}

export async function adicionarTarefaMes(tarefa: string, descricao: string, type: "JANEIRO" | "FEVEREIRO" | "MARÇO" | "ABRIL" | "MAIO" | "JUNHO" | "JULHO" | "AGOSTO" | "SETEMBRO" | "OUTUBRO" | "NOVEMBRO" | "DEZEMBRO") {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const calendarioMes = await prisma.calendario_Mensal.create({
      data: {
        authorId: userId,
        tarefa,
        descricao,
        type
      }
    })
    return { success: true, calendarioMes }
  } catch (error) {
    console.error("Erro ao criar calendário mensal:", error);
    return { success: false, error: "Falha ao criar uma tarefa" }
  }
}