"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, PlusSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { adicionarReuniao } from "../actions/reuniao.action";


function CadastroReuniao() {
  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const onHandleSubmit = async () => {
    if (!data || !titulo) return;
    setIsPosting(true);

    try {
      const formattedDate = new Date(data); // Converte a string para Date

      const result = await adicionarReuniao(titulo, formattedDate);

      if (result?.success) {
        setTitulo("");
        setData("");
        toast.success("Reuniao adicionada!");
      }
    } catch (error) {
      toast.error("Falha ao adicionar a reuniao!");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <h1>Reunioes</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Reunioes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar reuniao</DialogTitle>
            <DialogDescription>
              Adicione suas reunioes por aqui
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

export default CadastroReuniao;