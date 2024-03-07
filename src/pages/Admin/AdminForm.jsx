import React, { useState } from 'react'

const AdminForm = (props) => {
    const [buttonContent, setButtonContent] = useState('Valider')
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setButtonContent('Chargement ...');

        console.log(formData);
    
        // const data = await login(formData.email, formData.password);
        // if(data){
        //   console.log(data);
        // }
        // if(error){
        //   console.log(error);
        //   setErrorMessage("Email or Password Incorrect");
        // }
    
        setIsLoading(false);
        setButtonContent('Me connecter');
      };
    return (
        <div className='admin__form'>
            
            <form onSubmit={handleSubmit}>
                <button className='close' onClick={props.closeForm}>Fermer</button>
                <h2>Ajouter un évènement</h2>

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
                            type="text"
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
