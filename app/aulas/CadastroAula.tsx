"use client";

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2Icon, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { adicionarAula } from '../actions/aulas.action';
import toast from 'react-hot-toast';

function CadastroAula() {
  const [titulo, setTitulo] = useState("")
  const [horario, setHorario] = useState("")
  const [dia, setDia] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const onHandleSubmit = async () => {
    if (!dia || !horario || !titulo) return
    setIsPosting(true)
    try {
      const result = await adicionarAula(titulo, horario, dia as "SEGUNDA" | "TERÇA" | "QUARTA" | "QUINTA" | "SEXTA")

      if (result?.success) {
        setTitulo("")
        setHorario("")
        setDia("")
        toast.success("Aula adicionada!")
      }
    } catch (error) {
      toast.error("Falha ao adicionar a aula!")
    } finally {
      setIsPosting(false)
    }
  }
  return (
    <div>
      <h1>Aulas</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Aula</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar aula</DialogTitle>
            <DialogDescription>
              Adicione suas aulas por aqui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Nome
              </Label>
              <Input id="titulo" value={titulo} className="col-span-3" onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                horario
              </Label>
              <Input id="horario" value={horario} className="col-span-3" onChange={(e) => setHorario(e.target.value)} />
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
              disabled={(!dia && !horario && !titulo) || isPosting}
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

export default CadastroAula