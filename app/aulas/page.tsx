"use client";

import React, { useEffect, useState } from "react";
import CadastroAula from "./CadastroAula";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAulas } from "../actions/aulas.action";

interface Aula {
  id: string;
  authorId: string;
  titulo: string;
  horario: string;
  dia: string;
}

function Page() {
  const [aulas, setAulas] = useState<Aula[]>([]);

  useEffect(() => {
    async function fetchAulas() {
      const data = await getAulas();
      setAulas(data || []);
    }
    fetchAulas();
  }, []);

  const handleAulaAdicionada = async () => {
    const data = await getAulas();
    setAulas(data || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroAula onAulaAdicionada={handleAulaAdicionada} />
      <h2 className="text-2xl font-bold my-4">Aulas</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {aulas.map((aula) => (
          <Card key={aula.id}>
            <CardHeader>
              <CardTitle>{aula.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Horário: {aula.horario}</p>
              <p className="text-gray-600">Dia: {aula.dia}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
