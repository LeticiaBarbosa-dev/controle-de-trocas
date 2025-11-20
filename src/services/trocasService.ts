import { supabase } from "../supabaseClient"


export const TrocasService = {
  async listar() {
    const { data, error } = await supabase.from("trocas").select("*").order("id", { ascending: true })
    if (error) throw error
    return data
  },

  async adicionar(nome: string) {
    const { data, error } = await supabase.from("trocas").insert([{ nome }])
    if (error) throw error
    return data
  },

  async deletar(id: number) {
    const { data, error } = await supabase.from("trocas").delete().eq("id", id)
    if (error) throw error
    return data
  },
}
