"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, PlusSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { adicionarReuniao } from "../actions/reuniao.action";
import { Textarea } from "@/components/ui/textarea";
import { adicionarAnotacao } from "../actions/anotacao.action";
import { adicionarMaterial } from "../actions/material.action";


function CadastroMateriais() {
  const [links, setLinks] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const onHandleSubmit = async () => {
    if (!links) return;
    setIsPosting(true);

    try {
      const result = await adicionarMaterial(links);

      if (result?.success) {
        setLinks("");
        toast.success("Material adicionado!");
      }
    } catch (error) {
      toast.error("Falha ao adicionar o material!");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <h1>Materiais</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Materiais</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Material</DialogTitle>
            <DialogDescription>
              Adicione seus materiais por aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Link</Label>
              <Input id="titulo" value={links} className="col-span-3" onChange={(e) => setLinks(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onHandleSubmit} disabled={(!links) || isPosting}>
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

export default CadastroMateriais;