import React, { useState } from "react";
import IActivity from "../interface/IActivity";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";

import Date from "./Date";
import EditActivity from "./EditActivity";

interface ActivityProps extends IActivity {
  onUpdate: () => void;
}

const Activity: React.FC<ActivityProps> = ({
  id,
  title,
  description,
  dueDate,
  priority,
  onUpdate,
}) => {
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const appearDescreption = () => {
    setHiddenDescription((prev) => !prev)
  };

  const handleEditSave = () => {
    onUpdate()
    setIsEditing(false)
  };

  const handleEditClose = () => {
    setIsEditing(false)
  };

  const handleDelete = () => {
    fetch(`https://localhost:7166/api/Activity/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.text()
      })
      .then(() => {
        onUpdate()
        console.log('Item movido para a lixeira com sucesso')
      })
      .catch(error => {
        console.error('Erro ao mover o item para a lixeira:', error)
      });
  };

  return (
    <section className="w-full p-4 sm:p-6 bg-white text-red-900">
      {isEditing && (
        <EditActivity
          id={id}
          title={title}
          description={description}
          dueDate={dueDate}
          priority={priority}
          onSave={handleEditSave}
          onClose={handleEditClose}
        />
      )}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex gap-4 text-sm">
          <p>Vencimento:</p>
          <Date date={dueDate} />
          <p>{priority}</p>
          <div
            onClick={appearDescreption}
            className="bg-red-50 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:text-red-600"
          >
            {hiddenDescription ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowBack />
            )}
          </div>
          <div
            onClick={handleDelete}
            className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:text-gray-900"
          >
            <IoTrash />
          </div>
          <div
          
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:text-gray-900"
          >
            <FaPencilAlt />
          </div>
        </div>
      </div>

      {hiddenDescription && <p className="pt-4 text-sm">{description}</p>}
    </section>
  );
};

export default Activity;
