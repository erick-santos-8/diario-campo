"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, PlusSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { adicionarPlantao } from "../actions/plantao.action";


function CadastroPlantao() {
  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const onHandleSubmit = async () => {
    if (!data || !titulo) return;
    setIsPosting(true);

    try {
      const formattedDate = new Date(data); // Converte a string para Date

      const result = await adicionarPlantao(titulo, formattedDate);

      if (result?.success) {
        setTitulo("");
        setData("");
        toast.success("Plantão adicionado!");
      }
    } catch (error) {
      toast.error("Falha ao adicionar o plantão!");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <h1>Plantoes</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Plantao</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar plantão</DialogTitle>
            <DialogDescription>
              Adicione seus plantões por aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nome</Label>
              <Input id="titulo" value={titulo} className="col-span-3" onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Data</Label>
              <Input id="data" type="date" value={data} className="col-span-3" onChange={(e) => setData(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onHandleSubmit} disabled={(!titulo || !data) || isPosting}>
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <PlusSquare className="size-4 mr-2" />
                  Criar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CadastroPlantao