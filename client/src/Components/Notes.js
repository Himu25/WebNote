import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { toast } from 'react-toastify';
import Home from './Home';
import Spinner from './Spinner';

const Notes = () => {
    const ref = useRef(null)
    const closeRef = useRef(null)
    const context = useContext(NoteContext);
    const { notes, setNotes, fetchallnotes, deletenote, editnote } = context;
    const [loading, setLoading] = useState(true);
    const [noteInfo, setNoteInfo] = useState({
        title: '',
        description: '',
        tag: '',
        id: ''
    });

    const handleDelete = async (id) => {
        const promise = deletenote(id);
        toast.promise(promise, {
            pending: 'Deleting Note...',
            success: 'Note Deleted Successfully',
            error: 'Failed to Delete Note',
        });
        try {
            const json = await promise;
            if (json.success) {
                const newNotes = notes.filter((note) => note._id !== id);
                setNotes(newNotes);
            }
        } catch (error) {
            // Errors are already handled by toast.promise
        }
    };

    const handleEditClick = (note) => {
        setNoteInfo({
            title: note.title,
            description: note.description,
            tag: note.tag,
            id: note._id
        });
        ref.current.click();
    };

    const handleSaveChanges = async() => {
        const promise = editnote(noteInfo.title, noteInfo.description, noteInfo.tag, noteInfo.id);
        closeRef.current.click();
        toast.promise(promise, {
            pending: 'Updating Note...',
            success: 'Note Updated Successfully',
            error: 'Failed to Update Note',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchallnotes();
                setLoading(false); // Set loading to false after fetching notes
            } catch (error) {
                toast.error('Error fetching notes.');
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Home />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form className='my-4 mx-4'>
                                    <div className="mb-1">
                                        <label htmlFor="input1" className="form-label">Title</label>
                                        <input type="text" value={noteInfo.title} onChange={(e) => setNoteInfo({ ...noteInfo, title: e.target.value })} className="form-control" id="input1" name='title' />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="input2" className="form-label">Note</label>
                                        <input type="text" value={noteInfo.description} onChange={(e) => setNoteInfo({ ...noteInfo, description: e.target.value })} className="form-control" name='description' id="input2" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="input3" className="form-label">Set Tag</label>
                                        <input type="text" value={noteInfo.tag} onChange={(e) => setNoteInfo({ ...noteInfo, tag: e.target.value })} className="form-control" id="input3" name='tag' />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" style={{background: '#f5ba13'}} className="btn text-white" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                 <div className="con min-vh-100" style={{ textAlign: 'center' }}>
                    <Spinner />
                    </div>
            ) : (<div className="container mt-5 justify-content-center min-vh-100">
                <div className="row">
                    {notes.map((note) => (
                        <div className="col-md-4" key={note._id}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    {note.title}
                                    <span className="float-end">
                                        <i
                                            className="fas fa-edit me-2 text-white bg-warning rounded-circle p-2"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit Note"
                                            onClick={() => { handleEditClick(note) }}
                                        ></i>
                                        <i
                                            className="fas fa-trash text-white bg-warning rounded-circle p-2"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete Note"
                                            onClick={() => { handleDelete(note._id) }}
                                        ></i>

                                    </span>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    )
}

export default Notes;
