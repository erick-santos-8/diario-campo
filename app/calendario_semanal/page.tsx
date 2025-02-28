"use client";

import React, { useEffect, useState } from "react";
import CadastroSemana from "./CadastroSemana";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCalendarioSemanal } from "../actions/calendario.action";


interface Dia {
  id: string;
  authorId: string;
  type: string;  // Suponho que 'type' seja o tipo de dia (ex: 'segunda', 'terça', etc)
  tarefa: string;
  descricao: string;
}

function Page() {
  const [dias, setDias] = useState<Dia[]>([]);

  // Função para buscar o calendário semanal ao carregar a página
  useEffect(() => {
    async function fetchCalendario() {
      const data = await getCalendarioSemanal();
      setDias(data || []);
    }
    fetchCalendario();
  }, []);

  // Função para lidar com a adição de um novo dia no calendário
  const handleDiaAdicionado = async () => {
    const data = await getCalendarioSemanal();
    setDias(data || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroSemana onDiaAdicionado={handleDiaAdicionado} />
      <h2 className="text-2xl font-bold my-4">Calendário Semanal</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {dias.map((dia) => (
          <Card key={dia.id}>
            <CardHeader>
              <CardTitle>{dia.type}</CardTitle> {/* Exibe o tipo de dia */}
            </CardHeader>
            <CardContent>
              <h1>Tarefa: {dia.tarefa}</h1> {/* Exibe o tipo de dia */}
              <p className="text-gray-600">{dia.descricao}</p>
              {/* Adicione aqui mais detalhes sobre o dia, se houver */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
