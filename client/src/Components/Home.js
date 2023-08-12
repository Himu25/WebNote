import React, { useContext, useState } from 'react';
import NoteContext from '../Context/Note/NoteContext';
import { toast } from 'react-toastify';

const Home = () => {
    const { addnote, notes, setNotes } = useContext(NoteContext);
    
    const initialState = {
        title: '',
        description: '',
        tag: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleSubmit1(e) {
        e.preventDefault();
    
        const promise = addnote(formData.title, formData.description, formData.tag);
        
        const toastId = toast.promise(
            promise,
            {
                pending: 'Adding Note...', // Displayed while the promise is pending
                success: 'Note Added',     // Displayed when the promise resolves successfully
                error: 'Note Not Added',   // Displayed when the promise rejects (optional)
            }
        );
    
        try {
            const json = await promise;
            if (json.success) {
                setNotes(notes.concat(json.savedNote));
                setFormData(initialState);
            } else {
                throw new Error(json.errors);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            toast.dismiss(toastId); // Dismiss the toast manually
        }
    }
    

    return (
        <>
            <form id="note" onSubmit={handleSubmit1}>
                <input
                    name="title"
                    onChange={handleChange1}
                    value={formData.title}
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    onChange={handleChange1}
                    value={formData.description}
                    placeholder="Take a note..."
                    rows="3"
                />
                <button type='submit'>Add</button>
            </form>
        </>
    );

};

export default Home;
