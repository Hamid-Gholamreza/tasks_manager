import React, {useState} from 'react';
import './App.css';
import StickyNote from './components/StickyNote';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';


export interface Note {
  id: number,
  title: string,
  message: string,
  date: string,
  isInitial: boolean
}


function App() {

  const storedNotes = localStorage.getItem('notesList');
  const parsedNotes = storedNotes ? Array.from(JSON.parse(storedNotes)) : [];
  const listLength = parsedNotes.length;
  const [notesList, setNotesList] = useState(parsedNotes);
  let Notes;




  const initialNote: Note = {
    id: parsedNotes.length + 1,
    title: '',
    message: '',
    date: '',
    isInitial: true
  }

  const handleDelete = (id: number) => {
    let list = localStorage.getItem('notesList');
    const arrList = list?.length ? Array.from(JSON.parse(list)) : [];
    let index = arrList.findIndex((item: any) => item.id === id);   
    arrList.splice(index, 1);
    setNotesList(arrList);
    localStorage.setItem('notesList', JSON.stringify(arrList));
  }


  const handleAddNote = () => {
      let list = localStorage.getItem('notesList');
      const arrList = list?.length ? Array.from(JSON.parse(list)) : [];
      const updatedNotesList = arrList.concat(initialNote);
      localStorage.setItem('notesList', JSON.stringify(updatedNotesList));
      setNotesList(updatedNotesList);

  }

  const updateNotes = () => {
    console.log(notesList);
  }


    Notes = notesList.map((item: any, index: number) => {
      return (
          <Draggable>
              <div className='w-[250px] h-fit relative'>
                  <StickyNote key={index} note={item} />
                  <button className='absolute top-[-3px] left-0 bg-red-600 rounded-full text-white p-1 text-xs'
                  onClick={() => handleDelete(item.id)}><CloseIcon/></button>
              </div>
          </Draggable>
      );
    });

    updateNotes();


  return (
    <div className='w-full h-[100vh] relative'>
      <div className='w-full h-[200px] bg-blue-600 flex flex-col justify-center items-center gap-8'>
        <h1 className='text-xl text-center'>برای اضافه کردن یادداشت جدید کلیک کنید</h1>
        <button className='w-12 h-12 bg-green-500 rounded-lg text-2xl text-white' onClick={handleAddNote}>+</button>
      </div>

      {/* Notes Container */}
      <div className='h-[100vh]'>
          {Notes}
      </div>
    </div>
  );
}

export default App;
