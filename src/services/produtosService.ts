import { supabase } from "../supabaseClient";


export async function uploadImagem(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("produtos") // nome do bucket
    .upload(fileName, file);

  if (error) throw error;

  // obtém a URL pública para exibir a imagem
  const { data: publicUrlData } = supabase.storage
    .from("produtos")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
