import React, { useEffect, useState } from 'react';
import Activity from './Activity';
import IActivitys from '../interface/IActivity';

interface Update {
  updateActivitys: number;
}

const AllActivitys: React.FC<Update> = ({ updateActivitys }) => {
  const [data, setData] = useState<IActivitys[] | null>(null);
  const [trash, setTrash] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://localhost:7166/api/Activity";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: IActivitys[] = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [updateActivitys, trash]);

  const handleDelete = () => {
    setTrash(prev => prev + 1); // Atualiza o estado para forçar a re-renderização
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {data.map(task => (
        <div className='my-4' key={task.id}>
          <Activity
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
            onUpdate={handleDelete} // Passa a função de callback para o componente Activity
          />
        </div>
      ))}
    </section>
  );
};

export default AllActivitys;
