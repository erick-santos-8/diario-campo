"use client";

import React, { useEffect, useState } from "react";
import CadastroPlantao from "./CadastroPlantoes";
import { getPlantoes } from "../actions/plantao.action";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Plantao {
  id: string;
  authorId: string;
  titulo: string;
  data: string;
}

function Page() {
  const [plantoes, setPlantoes] = useState<Plantao[]>([]);

  useEffect(() => {
    async function fetchPlantoes() {
      const data = await getPlantoes();
      setPlantoes(
        data?.map((plantao) => ({
          ...plantao,
          data: new Date(plantao.data).toISOString(),
        })) || [plantoes]
      );
    }
    fetchPlantoes();
  }, []);

  const handlePlantaoAdicionado = async () => {
    const data = await getPlantoes();
    setPlantoes(
      data?.map((plantao) => ({
        ...plantao,
        data: new Date(plantao.data).toISOString(),
      })) || []
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroPlantao onPlantaoAdicionado={handlePlantaoAdicionado} />
      <h2 className="text-2xl font-bold my-4">Plantões</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {plantoes.map((plantao) => (
          <Card key={plantao.id}>
            <CardHeader>
              <CardTitle>{plantao.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Data: {new Date(plantao.data).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;

