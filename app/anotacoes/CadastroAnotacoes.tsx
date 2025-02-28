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


function CadastroAnotacoes({ onAnotacaoAdicionada }: { onAnotacaoAdicionada: () => void }) {
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const onHandleSubmit = async () => {
    if (!conteudo || !titulo) return;
    setIsPosting(true);

    try {
      const result = await adicionarAnotacao(titulo, conteudo);

      if (result?.success) {
        setTitulo("");
        setConteudo("");
        toast.success("Anotacao adicionada!");
        onAnotacaoAdicionada()
      }
    } catch (error) {
      toast.error("Falha ao adicionar a anotacao!");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <h1>Anotacoes</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Anotacoes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Anotacao</DialogTitle>
            <DialogDescription>
              Adicione suas anotacoes por aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nome</Label>
              <Input id="titulo" value={titulo} className="col-span-3" onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Conteudo</Label>
              <Textarea id="conteudo" value={conteudo} className="col-span-3" onChange={(e) => setConteudo(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onHandleSubmit} disabled={(!titulo || !conteudo) || isPosting}>
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

export default CadastroAnotacoes;