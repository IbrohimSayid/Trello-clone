import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from '../Axios/axiosConfig';

const Detailes = () => {
  const params = useParams();

  const [boards, setBoards] = useState([
    {
      id: 1,
      name: 'My Awesome Board',
      color: '#8E24AA',
      lists: [
        { id: 1, title: 'To Do', status: 'Pending', cards: [] },
        { id: 2, title: 'In Progress', status: 'Doing', cards: [] },
        { id: 3, title: 'Testing', status: 'Testing', cards: [] },
        { id: 4, title: 'Completed', status: 'Done', cards: [] },
      ],
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [currentListId, setCurrentListId] = useState(null);

  useEffect(() => {
    axios
      .get(`tasks/${params.id}`)
      .then((res) => {
        const apiTask = res.data.tasks;
        let copied = JSON.parse(JSON.stringify(boards));

        if (copied[0]?.lists?.length) {
          const result = copied[0].lists.map((board) => {
            let status = board.status;
            apiTask.forEach((task) => {
              if (task.status === status) {
                board.cards.push(task);
              }
            });
            return board;
          });
          setBoards([{ ...boards, lists: [...result] }]);
        }
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addCard = async () => {
    if (!newTaskName.trim()) {
      toast.error("Task name cannot be empty");
      return;
    }

    let board = {
      title: newTaskName,
      boardId: params.id,
    };

    try {
      await axios.post('/tasks/create', board);
    } catch (error) {
      console.error('Error creating task:', error);
    }

    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => {
          if (list.id === currentListId) {
            return {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: Date.now(),
                  title: newTaskName,
                  description: '',
                },
              ],
            };
          }
          return list;
        }),
      }))
    );
    setNewTaskName('');
    document.getElementById('my_modal_3').close();
    toast.success("Task added successfully!");
  };

  const openAddCardModal = (listId) => {
    setCurrentListId(listId);
    setNewTaskName('');
    document.getElementById('my_modal_3').showModal();
  };

  return (
    <div className='min-h-screen p-6 bg-gray-100'>
      <Toaster position='top-center' reverseOrder={false} />
      <h1 className='text-4xl font-bold mb-4 text-center'>My Awesome Board</h1>
      {boards.map((board) => (
        <div key={board.id} className='rounded-lg p-4'>
          <div className='flex gap-6 flex-wrap'>
            {board.lists.map((list) => (
              <div key={list.id} className='bg-white rounded-lg p-4 shadow-lg'>
                <h3 className='mb-4 text-lg font-bold'>{list.title}</h3>
                <div className='space-y-3'>
                  {list.cards.map((card) => (
                    <div key={card.id} className='cursor-pointer bg-gray-200 rounded-lg p-3 hover:bg-gray-300 transition duration-200'>
                      <h4 className='font-semibold mb-1'>{card.title}</h4>
                      <p className='text-sm text-gray-600 truncate'>{card.description}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => openAddCardModal(list.id)}
                    className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition duration-200'
                  >
                    + Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <h3 className='font-bold text-lg'>Add Task Name</h3>
          <div className='flex gap-3 items-center mt-4'>
            <input
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              type='text'
              className='input input-bordered w-full'
              placeholder='Task Name'
            />
            <button onClick={addCard} className='btn btn-primary'>Submit</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Detailes;