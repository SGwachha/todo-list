import React, { useState } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import '../App.css';

const Model = () => {
  const store = 'todo-list';

  const inputModel = useSelect((select) => select(store).getModel());
  const cards = useSelect((select) => select(store).getCard());
  const [inputError, setInputError] = useState('');
  const [formMode, setFormMode] = useState('add');
  const [updateIndex, setUpdateIndex] = useState('');

  const { setModel, setCard, deleteCard, updateCard } = useDispatch(store);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!inputModel.title || !inputModel.desc) {
      setInputError('Please fill out all fields');
      return;
    }

    if (formMode === 'add') {
      setCard({ title: inputModel.title, desc: inputModel.desc });
      setInputError('')
    }
    else {
      updateCard(updateIndex, { title: inputModel.title, desc: inputModel.desc })
      setFormMode('add');
    }

    setModel({ title: '', desc: '' });
  };

  const handleDelete = (cardIndex) => {
    const deleteMessage = window.confirm('Are you sure you want to delete the to-do list?');
    if (deleteMessage) {
      deleteCard(cardIndex);
    }
  };


  const handleUpdate = (cardIndex, updatedCard) => {
    setFormMode('update');
    setUpdateIndex(cardIndex);
    setInputError('')
    setModel({ title: updatedCard.title, desc: updatedCard.desc });
  };

  return (
    <div className='card'>
      <h1>Todo-List</h1>
      <div className='container'>
        <form>
          <div className='card-design' >
            <input
              type='text'
              placeholder='Title'
              value={inputModel.title}
              onChange={(e) => setModel({ ...inputModel, title: e.target.value })}
            />
            <input
              type='text'
              placeholder='Description'
              value={inputModel.desc}
              onChange={(e) => setModel({ ...inputModel, desc: e.target.value })}
            />
            <button className='btn' type='button' onClick={handleAdd}>
              {formMode === 'add' ? 'Add' : 'Update'}
            </button>
            {inputError && <p className='error'>{inputError}</p>}
          </div>
        </form>
      </div>
      <div className='card' style={{ display: 'flex', flexDirection: 'row', gap: '100px' }}>
        {cards &&
          cards.map((card, index) => (
            <div key={index} className='card'>
              <div className='card-design'>
                <h2>Card Data</h2>
                <p>Title: {card.title}</p>
                <p>Description: {card.desc}</p>
                <div className='btn-flex'>
                  <button className='btn' onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                  <button
                    className='btn'
                    onClick={() => {
                      handleUpdate(index, card);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Model;