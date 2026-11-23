import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

// Endereço do backend.
// Web ou emulador iOS: http://localhost:3000
// Emulador Android:    http://10.0.2.2:3000
// Celular físico:      http://IP-DO-SEU-PC:3000  (ex.: http://192.168.0.10:3000)
const API_URL = "http://localhost:3000";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      const res = await fetch(API_URL + "/tarefas");
      if (!res.ok) throw new Error("Erro " + res.status);
      setTarefas(await res.json());
      setErro(null);
    } catch (e) {
      setErro("Não foi possível falar com a API: " + e.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function limpar() {
    setTitulo("");
    setDescricao("");
    setEditandoId(null);
  }

  // CADASTRAR ou EDITAR
  async function salvar() {
    if (!titulo.trim()) return;
    const url = editandoId
      ? API_URL + "/tarefas/" + editandoId
      : API_URL + "/tarefas";
    try {
      const res = await fetch(url, {
        method: editandoId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao }),
      });
      if (!res.ok) throw new Error("Erro " + res.status);
      limpar();
      carregar();
    } catch (e) {
      setErro("Erro ao salvar: " + e.message);
    }
  }

  function editar(tarefa) {
    setEditandoId(tarefa._id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
  }

  // EXCLUIR
  async function excluir(id) {
    try {
      const res = await fetch(API_URL + "/tarefas/" + id, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro " + res.status);
      if (editandoId === id) limpar();
      carregar();
    } catch (e) {
      setErro("Erro ao excluir: " + e.message);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 50 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        Tarefas
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title={editandoId ? "Salvar edição" : "Cadastrar"} onPress={salvar} />
      {editandoId && <Button title="Cancelar" onPress={limpar} />}

      {erro && <Text style={{ color: "red", marginTop: 8 }}>{erro}</Text>}

      <FlatList
        style={{ marginTop: 16 }}
        data={tarefas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" color="red" onPress={() => excluir(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
