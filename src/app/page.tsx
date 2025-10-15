interface Item {
  titulo: string;
  id: number;
  name: string;
  chave: string;
}

export default async function Home() {
  let items: Item[] = [];
  let error: string | null = null;

  try {
    const res = await fetch("https://api.asimplekreative.com.br/api/data", {
      cache: "no-store", // Garante que os dados sejam sempre buscados no servidor
    });

    if (!res.ok) {
      throw new Error(`Falha ao buscar dados: ${res.status} ${res.statusText}`);
    }

    items = await res.json();
  } catch (e: any) {
    error = e.message;
    console.error("Erro ao buscar dados da API:", e);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Dados da API (localhost:3001)</h1>

      {error && (
        <p className="text-red-500 text-lg">Erro ao carregar dados: {error}</p>
      )}

      {!error && items.length === 0 && (
        <p className="text-gray-500 text-lg">
          Nenhum item encontrado ou API não está rodando.
        </p>
      )}

      {!error && items.length > 0 && (
        <ul className="list-disc list-inside">
          {items.map((item) => (
            <li key={item.id} className="text-lg">
              ID: {item.id}, Nome: {item.chave}, Titulo: {item.titulo}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
