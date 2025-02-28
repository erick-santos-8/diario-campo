"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCalendarioMensal } from "../actions/calendario.action";
import CadastroMensal from "./CadastroMensal";

interface Tarefa {
  id: string;
  authorId: string;
  tarefa: string;
  descricao: string;
  type: "JANEIRO" | "FEVEREIRO" | "MARÇO" | "ABRIL" | "MAIO" | "JUNHO" | "JULHO" | "AGOSTO" | "SETEMBRO" | "OUTUBRO" | "NOVEMBRO" | "DEZEMBRO";
}

function Page() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para buscar as tarefas do calendário mensal ao carregar a página
  useEffect(() => {
    async function fetchCalendarioMensal() {
      const data = await getCalendarioMensal();
      setTarefas(data || []);
    }
    fetchCalendarioMensal();
  }, []);

  // Função para lidar com a adição de uma nova tarefa no calendário mensal
  const handleTarefaAdicionada = async () => {
    const data = await getCalendarioMensal();
    setTarefas(data || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroMensal onMesAdicionado={handleTarefaAdicionada} />
      <h2 className="text-2xl font-bold my-4">Calendário Mensal</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {tarefas.map((tarefa) => (
          <Card key={tarefa.id}>
            <CardHeader>
              <CardTitle>{tarefa.type}</CardTitle> {/* Exibe o mês */}
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">{tarefa.tarefa}</h3> {/* Exibe o título da tarefa */}
              <p className="text-gray-600">{tarefa.descricao}</p> {/* Exibe a descrição da tarefa */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
