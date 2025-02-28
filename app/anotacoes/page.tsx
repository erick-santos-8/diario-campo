"use client";

import React, { useEffect, useState } from "react";
import CadastroAnotacoes from "./CadastroAnotacoes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAnotacoes } from "../actions/anotacao.action";

interface Anotacao {
  id: string;
  authorId: string;
  titulo: string;
  conteudo: string;
}

function Page() {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);

  useEffect(() => {
    async function fetchAnotacoes() {
      const data = await getAnotacoes();
      setAnotacoes(data || []);
    }
    fetchAnotacoes();
  }, []);

  const handleAnotacaoAdicionada = async () => {
    const data = await getAnotacoes();
    setAnotacoes(data || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroAnotacoes onAnotacaoAdicionada={handleAnotacaoAdicionada} />
      <h2 className="text-2xl font-bold my-4">Anotações</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {anotacoes.map((anotacao) => (
          <Card key={anotacao.id}>
            <CardHeader>
              <CardTitle>{anotacao.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{anotacao.conteudo}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
