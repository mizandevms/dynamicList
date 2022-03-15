// Inertnal Imports
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    {
      card_title: [
        {
          title: "todo",
          is_card_edit_mode: false,
          placeholder: "edit title",
        },
      ],
      is_locked: false,
      items: [
        {
          value: "test",
          is_edit_mode: false,
          placeholder: "edit todo",
        },
      ],
    },
  ]);

  // title double click functions
  const ondblClickCard = (cardIndex, itemIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].card_title[itemIndex].is_card_edit_mode = true;
    setData(dataCopy);
    // console.log(cardIndex, itemIndex);
  };
  const onDblClickDone = (cardIndex, itemIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].card_title[itemIndex].is_card_edit_mode = false;
    setData(dataCopy);
  };
  const onChangeTitleValue = (e, cardIndex, itemIndex) => {
    const value = e.target.value;
    let dataCopy = [...data];
    dataCopy[cardIndex].card_title[itemIndex].title = value;

    setData(dataCopy);
  };


 // Add new Items
 const onAddItem = (cardIndex) => {
  let dataCopy = [...data];
  dataCopy[cardIndex].items = [
    ...dataCopy[cardIndex].items,
    {
      value: "",
      placeholder: "edit todo",
      is_edit_mode: true,
    },
  ];

  setData(dataCopy);
};



// item 

  const onClickEdit = (cardIndex, itemIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].items[itemIndex].is_edit_mode = true;

    // console.log({ dataCopy });

    setData(dataCopy);
  };
  const onClickDelete = (cardIndex, itemIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].items = dataCopy[cardIndex].items.filter(
      (v, i) => i !== itemIndex
    );

    setData(dataCopy);
  };
  const onClickDone = (cardIndex, itemIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].items[itemIndex].is_edit_mode = false;

    setData(dataCopy);
  };
  const onChangeItemValue = (e, cardIndex, itemIndex) => {
    const value = e.target.value;
    let dataCopy = [...data];
    dataCopy[cardIndex].items[itemIndex].value = value;
    setData(dataCopy);
  };

 

  // lock Card
  const handleLock = (cardIndex) => {
    let dataCopy = [...data];
    dataCopy[cardIndex].is_locked = !dataCopy[cardIndex].is_locked;

    setData(dataCopy);
    // console.log(cardIndex, "lock");
  };

  // add new List
  const onClickAddNewList = () => {
    setData([
      ...data,
      {
        card_title: [
          {
            title: "todo",
            is_card_edit_mode: false,
            placeholder: "edit title",
          },
        ],
        is_locked: false,
        items: [
          {
            value: "",
            is_edit_mode: true,
            placeholder: "edit todo",
          },
        ],
      },
    ]);
  };



// drag and drop functions
const allowDrop = (ev) => {
  ev.preventDefault()
}

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id)
}

const drop = (ev) => {
  ev.preventDefault()
  var data = ev.dataTransfer.getData("text")
  ev.target.appendChild(document.getElementById(data))
}

  return (
    <section className="relative">
      <figure className="relative">
        <img
          className="h-screen w-screen object-cover"
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="bg img"
        />
      </figure>
      <div className="absolute inset-0 h-full w-full bg-gray-900 bg-opacity-70 z-10"></div>{" "}
      <div className="absolute inset-0 h-full w-full z-30">
        <div>
          <h1 className="text-gray-50 font-extrabold text-2xl sm:text-xl capitalize py-4 px-6 bg-gray-100 bg-opacity-50">
            Kanban-style-list-making Demo
          </h1>
          <section className="container mx-auto py-4">
            <div className="grid grid-cols-3 gap-4">
              {data.map((card, i) => {
                return (
                  <div
                    className="relative h-auto w-full px-2 py-4 group"
                    key={i}
                  >
                    <div className="absolute inset-0 h-full w-full bg-gray-500 bg-opacity-80 rounded-md -skew-y-1  transition-all duration-200 group-hover:skew-y-1"></div>
                    <div className="relative border border-gray-100 bg-gray-500 bg-opacity-80 rounded-md p-4">
                      <div className="space-y-2 h-auto w-full">

                        {/* card header */}
                        <div className="flex justify-between items-center text-gray-50 bg-gray-100 bg-opacity-50 rounded-t-md px-2">
                          <div className="flex gap-x-2 justify-between items-center px-2 py-1 h-auto w-full text-gray-500  rounded-sm text-sm ">
                            {card.card_title.map((cardItem, j) => (
                              <div
                                className=" flex gap-x-2 justify-between items-center w-full cursor-pointer"
                                key={i}
                              >
                                {cardItem.is_card_edit_mode ? (
                                  <input
                                    placeholder={cardItem.placeholder}
                                    onChange={(e) =>
                                      onChangeTitleValue(e, i, j)
                                    }
                                    value={cardItem.value}
                                    className="flex h-auto w-full px-2 py-1  outline-none focus:outline-none "
                                  ></input>
                                ) : (
                                  <span
                                    onDoubleClick={() => ondblClickCard(i, j)}
                                    className="text-gray-50 font-semibold text-base capitalize py-2 px-6  text-center "
                                  >
                                    {cardItem.title}
                                  </span>
                                )}
                                {cardItem.is_card_edit_mode ? (
                                  <button
                                    className="  px-2 py-1 h-auto  bg-gray-600 text-gray-300 hover:text-cyan-700   text-sm font-semibold rounded text-xs"
                                    onClick={() => onDblClickDone(i, j)}
                                  >
                                    done
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-x-2 justify-between items-center">
                            {card.is_locked ? (
                              <svg
                                onClick={() => handleLock(i)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-red-700 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            ) : (
                              <svg
                                onClick={() => handleLock(i)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-cyan-700 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                              </svg>
                            )}

                            <button
                              className="  px-2 py-1 h-auto  bg-gray-600 text-gray-300 hover:text-cyan-700   text-sm font-semibold rounded text-sm whitespace-nowrap"
                              onClick={() => onAddItem(i)}
                            >
                              Add Item
                            </button>
                          </div>
                        </div>

                        {/* card body */}
                        <div id={`div${i}`} onDrop={drop} onDragOver={allowDrop} className="space-y-2">
                          {card.items.map((item, j) => (
                            <div
                              className="flex gap-x-2 justify-between items-center px-2 py-1 h-auto w-full bg-gray-300 text-gray-500  rounded-sm text-sm "
                              key={j}
                              id={`${j}`}
                              draggable={true} 
                              onDragStart={drag}
                            >
                              {item.is_edit_mode ? (
                                <input
                                  placeholder={item.placeholder}
                                  onChange={(e) => onChangeItemValue(e, i, j)}
                                  value={item.value}
                                  className="flex h-auto w-full px-2 py-1  outline-none focus:outline-none "
                                ></input>
                              ) : (
                                <span>{item.value}</span>
                              )}
                              {item.is_edit_mode ? (
                                <button
                                  className="  px-2 py-1 h-auto  bg-gray-600 text-gray-300 hover:text-cyan-700   text-sm font-semibold rounded text-xs"
                                  onClick={() => onClickDone(i, j)}
                                >
                                  done
                                </button>
                              ) : (
                                <div className="flex gap-x-2 justify-between items-center">
                                  <button
                                    className="  px-2 py-1 h-auto  bg-gray-600 text-gray-300 hover:text-cyan-700   text-sm font-semibold rounded text-xs"
                                    onClick={() => onClickDelete(i, j)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="  px-2 py-1 h-auto  bg-gray-600 text-gray-300 hover:text-cyan-700   text-sm font-semibold rounded text-xs"
                                    onClick={() => onClickEdit(i, j)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>


                        {/* new List Btn */}
                        {card.is_locked ? (
                          <p className="bg-red-700 w-full px-2 py-1 text-xs text-gray-50 text-center">
                            this card is locked
                          </p>
                        ) : (
                          <button
                            onClick={() => onClickAddNewList()}
                            className=" flex gap-x-2 justify-center items-center px-2 py-1 h-auto w-full bg-gray-300 text-gray-500 hover:text-cyan-700  rounded-b-md text-sm font-semibold  border border-gray-300"
                          >
                            Add New List
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
