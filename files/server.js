require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Tarefa = mongoose.model(
  "Tarefa",
  new mongoose.Schema(
    {
      titulo: { type: String, required: true },
      descricao: { type: String, default: "" },
    },
    { timestamps: true }
  )
);

// LISTAR
app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await Tarefa.find().sort({ createdAt: -1 });
    res.json(tarefas);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

// CADASTRAR
app.post("/tarefas", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const tarefa = await Tarefa.create({ titulo, descricao });
    res.status(201).json(tarefa);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// EDITAR
app.put("/tarefas/:id", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const tarefa = await Tarefa.findByIdAndUpdate(
      req.params.id,
      { titulo, descricao },
      { new: true, runValidators: true }
    );
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(tarefa);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// EXCLUIR
app.delete("/tarefas/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json({ mensagem: "Tarefa excluída" });
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => console.log("API rodando na porta " + PORT));
  })
  .catch((e) => {
    console.error("Erro ao conectar no MongoDB:", e.message);
    process.exit(1);
  });
