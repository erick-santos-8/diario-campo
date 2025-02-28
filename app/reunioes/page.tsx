"use client";

import React, { useEffect, useState } from "react";
import CadastroReuniao from "./CadastroReuniao";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getReunioes } from "../actions/reuniao.action";

interface Reuniao {
  id: string;
  authorId: string;
  titulo: string;
  data: string;
}

function Page() {
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);

  useEffect(() => {
    async function fetchReunioes() {
      const data = await getReunioes();
      setReunioes(
        data?.map((reuniao) => ({
          ...reuniao,
          data: new Date(reuniao.data).toISOString(),
        })) || []
      );
    }
    fetchReunioes();
  }, []);

  const handleReuniaoAdicionada = async () => {
    const data = await getReunioes();
    setReunioes(
      data?.map((reuniao) => ({
        ...reuniao,
        data: new Date(reuniao.data).toISOString(),
      })) || []
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroReuniao onReuniaoAdicionada={handleReuniaoAdicionada} />
      <h2 className="text-2xl font-bold my-4">Reuniões</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {reunioes.map((reuniao) => (
          <Card key={reuniao.id}>
            <CardHeader>
              <CardTitle>{reuniao.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Data: {new Date(reuniao.data).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
