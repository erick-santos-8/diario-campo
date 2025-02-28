"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function adicionarReuniao(titulo: string, data: Date) {
  try {
    const userId = await getDbUserId();

    if (!userId) return

    const reuniao = await prisma.reunioes.create({
      data: {
        authorId: userId,
        titulo,
        data
      }
    })
    return { success: true, reuniao }
  } catch (error) {
    console.error("Erro ao criar reuniao:", error);
    return { success: false, error: "Falha ao criar uma reuniao" }
  }
}