import React, { useEffect, useState } from 'react'
import { addEvent, updatedEventAdmin } from '../../js/helpers';

const AdminForm = (props) => {
    const [buttonContent, setButtonContent] = useState('Valider')
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        categorie: '',
        description:'',
        places: '', 
        location : '',
        illustration : '',
        date: '',
        hour: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    useEffect(() =>{
        if(props.type === 'update'){
            console.log(props.selectedEvent);
            
            setFormData({
                id: props.selectedEvent.id,
                name: props.selectedEvent.name,
                categorie: props.selectedEvent.category,
                description:props.selectedEvent.description,
                places: props.selectedEvent.places, 
                location : props.selectedEvent.location,
                illustration : props.selectedEvent.image_link,
                date: props.selectedEvent.date,
                hour: props.selectedEvent.hour,
            })
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setButtonContent('Chargement ...');

        if(props.type === 'add') await addEvent(formData)
        else await updatedEventAdmin(formData)
    
        setIsLoading(false);
        setButtonContent('Suivant');
        props.closeForm('add')
    };

    
    return (
        <div className='admin__form'>
            
            <form onSubmit={handleSubmit}>
                <button className='close' onClick={() => props.closeForm('add')}>Fermer</button>
                {props.type === 'add' ? <h2>Ajouter un évènement</h2> : <h2>Modifier l'évènement</h2> }

                <label>
                    <span>Nom de l'évènement :</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Catégorie de l’évenement :</span>
                    <input
                        type="text"
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Description : </span>
                    <input
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Nombre de places : </span>
                    <input
                        type="number"
                        name="places"
                        value={formData.places}
                        onChange={handleChange}
                        required
                    />
                </label>

                <div>
                    <label>
                        <span>Date : </span>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Heure : </span>
                        <input
                            type="time"
                            name="hour"
                            value={formData.hour}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <label>
                    <span>Lieu :</span>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Illustration :</span>
                    <input
                        type="text"
                        name="illustration"
                        placeholder="Lien de l'image"
                        value={formData.illustration}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button className='mainButton' type="submit">Valider</button>
            </form>
        </div>
    )
}

export default AdminForm
