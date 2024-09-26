import { useState, useEffect } from "react"; // useEffect qo'shildi
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoTrashOutline } from "react-icons/io5";

const initialCards = []; // Default xolatda bo'sh

const colors = [
  { name: "Red", value: "#ffcccc", textColor: "#a00" },
  { name: "Green", value: "#ccffcc", textColor: "#005700" },
  { name: "Blue", value: "#ccccff", textColor: "#0000a0" },
  { name: "Yellow", value: "#ffffcc", textColor: "#a0a000" },
  { name: "Orange", value: "#ffcc99", textColor: "#a65e2e" },
  { name: "Purple", value: "#e6ccff", textColor: "#5e2ea6" },
];

function Home() {
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cards, setCards] = useState(initialCards);
  const [newCardName, setNewCardName] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardColor, setNewCardColor] = useState(colors[0].value); // Default rang
  const [newCardMember, setNewCardMember] = useState("");
  const [deleteCardId, setDeleteCardId] = useState(null);

  // Local storage dan kartalarni olish
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    if (storedCards) {
      setCards(storedCards);
    }
  }, []);

  // Kartalarni local storage ga saqlash
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newCards = Array.from(cards);
    const [movedCard] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, movedCard);

    setCards(newCards);
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const newBoard = { name: boardName, description, color };

    try {
      const response = await fetch("https://trello.vimlc.uz:8000/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBoard),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Board created successfully!");
        setError("");
        document.getElementById("my_modal_1").close();
        setBoardName("");
        setDescription("");
        setColor("");
      } else {
        setError(data.message || "Failed to create the board");
      }
    } catch (error) {
      setError("An error occurred while creating the board");
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now().toString(),
      content: newCardName,
      description: newCardDescription,
      color: newCardColor,
      members: newCardMember ? [newCardMember] : [],
    };
    setCards([...cards, newCard]);
    setNewCardName("");
    setNewCardDescription("");
    setNewCardColor(colors[0].value); // Default rangni qayta tiklash
    setNewCardMember("");
    document.getElementById("add_card_modal").close();
  };

  const handleDeleteCard = (id) => {
    setDeleteCardId(id);
    document.getElementById("delete_card_modal").showModal();
  };

  const confirmDeleteCard = () => {
    setCards(cards.filter((card) => card.id !== deleteCardId));
    setDeleteCardId(null);
    document.getElementById("delete_card_modal").close();
  };

  return (
    <div className="p-6 flex-1 bg-gray-50">
      <h2>All Task</h2>
      <div className="flex gap-3 mt-6 mb-10">
        <div>
          <div
            className="border-2 rounded-md text-center p-4 cursor-pointer"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <h1>Create New Board</h1>
            <p>Click here to create a new board</p>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create a New Board</h3>
              <form onSubmit={handleCreateBoard}>
                <div className="py-4">
                  <label className="block mb-2">Board Name:</label>
                  <input
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="border p-2 w-full rounded-md"
                    placeholder="Enter board name"
                    required
                  />
                </div>
                <div className="py-4">
                  <label className="block mb-2">Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded-md"
                    placeholder="Enter board description"
                    required
                  />
                </div>
                <div className="py-4">
                  <label className="block mb-2">Color:</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border p-2 w-full rounded-md"
                    placeholder="Enter board color (e.g., green)"
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <div className="modal-action">
                  <button type="submit" className="btn">
                    Create Board
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("add_card_modal").showModal()}
        className="btn mb-4"
      >
        Add Card
      </button>

      <dialog id="add_card_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a New Card</h3>
          <div className="py-4">
            <label className="block mb-2">Card Name:</label>
            <input
              type="text"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Enter card name"
              required
            />
          </div>
          <div className="py-4">
            <label className="block mb-2">Card Description:</label>
            <textarea
              value={newCardDescription}
              onChange={(e) => setNewCardDescription(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Enter card description"
              required
            />
          </div>
          <div className="py-4">
            <label className="block mb-2">Card Color:</label>
            <select
              value={newCardColor}
              onChange={(e) => setNewCardColor(e.target.value)}
              className="border p-2 w-full rounded-md"
            >
              {colors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div className="py-4">
            <label className="block mb-2">Add Member (Email):</label>
            <input
              type="email"
              value={newCardMember}
              onChange={(e) => setNewCardMember(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Enter member email"
            />
          </div>
          <div className="modal-action">
            <button onClick={handleAddCard} className="btn">
              Create Card
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("add_card_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="delete_card_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p>Are you sure you want to delete this card?</p>
          <div className="modal-action">
            <button onClick={confirmDeleteCard} className="btn rounded-lg bg-red-600 text-white hover:bg-red-800">
              Yes, Delete
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                document.getElementById("delete_card_modal").close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ padding: 20, width: 300, background: "#f0f0f0" }}
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        background: card.color,
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{card.content}</span>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-red-500"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                      {card.description && (
                        <div className="text-sm text-gray-600">
                          Description: {card.description}
                        </div>
                      )}
                      {card.members.length > 0 && (
                        <div className="text-sm text-gray-600">
                          Members: {card.members.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Home;
