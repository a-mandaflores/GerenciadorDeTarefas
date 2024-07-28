import React, { useState } from "react";
import IActivity from "../interface/IActivity";

interface EditActivityProps extends IActivity {
  onSave: () => void;
  onClose: () => void;
}

const EditActivity: React.FC<EditActivityProps> = ({
  id,
  title: initialTitle,
  description: initialDescription,
  dueDate: initialDueDate,
  priority: initialPriority,
  onSave,
  onClose
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [priority, setPriority] = useState(initialPriority);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    fetch(`https://localhost:7166/api/Activity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        priority
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Use text() instead of json() to avoid parsing errors
      })
      .then(() => {
        onSave();
        console.log('Atividade atualizada com sucesso');
      })
      .catch(error => {
        setError(error.message);
        console.error('Erro ao atualizar a atividade:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Editar Atividade</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
          <input
            type="date"
            value={dueDate.split('T')[0]} // Formata a data no formato adequado para o input
            onChange={(e) => setDueDate(e.target.value + "T00:00:00")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Prioridade</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="Baixo">Baixo</option>
            <option value="Médio">Médio</option>
            <option value="Alto">Alto</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
