"use client";

import React, { useEffect, useState } from "react";
import CadastroMateriais from "./CadastroMateriais";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMateriais } from "../actions/material.action";

interface Material {
  id: string;
  authorId: string;
  links: string;
}

function Page() {
  const [materiais, setMateriais] = useState<Material[]>([]);

  // Função para buscar materiais ao carregar a página
  useEffect(() => {
    async function fetchMateriais() {
      const data = await getMateriais();
      setMateriais(data || []);
    }
    fetchMateriais();
  }, []);

  // Função para lidar com a adição de um novo material
  const handleMaterialAdicionado = async () => {
    const data = await getMateriais();
    setMateriais(data || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CadastroMateriais onMaterialAdicionado={handleMaterialAdicionado} />
      <h2 className="text-2xl font-bold my-4">Materiais</h2>
      <Separator className="mb-4" />
      <div className="grid gap-4">
        {materiais.map((material) => (
          <Card key={material.id}>
            <CardHeader>
              <CardTitle>{material.links}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
