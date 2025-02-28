"use client"

import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { adicionarTarefaDia } from '../actions/calendario.action'
import toast from 'react-hot-toast'
import { Loader2Icon, PlusSquare } from 'lucide-react'

function CadastroSemana({ onDiaAdicionado }: { onDiaAdicionado: () => void }) {
  const [tarefa, setTarefa] = useState("")
  const [descricao, setDescricao] = useState("")
  const [dia, setDia] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const onHandleSubmit = async () => {
    if (!dia || !descricao || !tarefa) return
    setIsPosting(true)
    try {
      const result = await adicionarTarefaDia(tarefa, descricao, dia as "SEGUNDA" | "TERÇA" | "QUARTA" | "QUINTA" | "SEXTA")

      if (result?.success) {
        setTarefa("")
        setDescricao("")
        setDia("")
        toast.success("Tarefa criada!")
        onDiaAdicionado()
      }
    } catch (error) {
      toast.error("Falha ao criar a tarefa!")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div>
      <h1>Calendario Semanal</h1>
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
              <Label className='text-right'>Dia </Label>
              <Select value={dia} onValueChange={setDia}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um dia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dias da Semana</SelectLabel>
                    <SelectItem value="SEGUNDA">Segunda</SelectItem>
                    <SelectItem value="TERÇA">Terça</SelectItem>
                    <SelectItem value="QUARTA">Quarta</SelectItem>
                    <SelectItem value="QUINTA">Quinta</SelectItem>
                    <SelectItem value="SEXTA">Sexta</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={onHandleSubmit}
              disabled={(!dia && !descricao && !tarefa) || isPosting}
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

export default CadastroSemana