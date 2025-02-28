"use client"

import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { adicionarTarefaMes } from '../actions/calendario.action'
import toast from 'react-hot-toast'
import { Loader2Icon, PlusSquare } from 'lucide-react'

function page() {
  const [tarefa, setTarefa] = useState("")
  const [descricao, setDescricao] = useState("")
  const [mes, setMes] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const onHandleSubmit = async () => {
    if (!mes || !descricao || !tarefa) return
    setIsPosting(true)
    try {
      const result = await adicionarTarefaMes(tarefa, descricao, mes as "JANEIRO" | "FEVEREIRO" | "MARÇO" | "ABRIL" | "MAIO" | "JUNHO" | "JULHO" | "AGOSTO" | "SETEMBRO" | "OUTUBRO" | "NOVEMBRO" | "DEZEMBRO")

      if (result?.success) {
        setTarefa("")
        setDescricao("")
        setMes("")
        toast.success("Tarefa criada!")
      }
    } catch (error) {
      toast.error("Falha ao criar a tarefa!")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div>
      <h1>Calendario Mensal</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar tarefa</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>
            <DialogDescription>
              Adicione suas demandas por aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Tarefa
              </Label>
              <Input id="tarefa" value={tarefa} className="col-span-3" onChange={(e) => setTarefa(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Descrição
              </Label>
              <Textarea id="descricao" value={descricao} className="col-span-3" onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className='text-right'>Mês </Label>
              <Select value={mes} onValueChange={setMes}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Mês</SelectLabel>
                    <SelectItem value="JANEIRO">Janeiro</SelectItem>
                    <SelectItem value="FEVEREIRO">Fevereiro</SelectItem>
                    <SelectItem value="MARÇO">Março</SelectItem>
                    <SelectItem value="ABRIL">Abril</SelectItem>
                    <SelectItem value="MAIO">Maio</SelectItem>
                    <SelectItem value="JUNHO">Junho</SelectItem>
                    <SelectItem value="JULHO">Julho</SelectItem>
                    <SelectItem value="AGOSTO">Agosto</SelectItem>
                    <SelectItem value="SETEMBRO">Setembro</SelectItem>
                    <SelectItem value="OUTUBRO">Outubro</SelectItem>
                    <SelectItem value="NOVEMBRO">Novembro</SelectItem>
                    <SelectItem value="DEZEMBRO">Dezembro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={onHandleSubmit}
              disabled={(!mes && !descricao && !tarefa) || isPosting}
            >
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
  )
}

export default page