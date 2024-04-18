import { supabase } from "../supabase/client";
import {toast, Bounce } from 'react-toastify';

export async function getAllEvents() {
    try {
        const today = new Date().toISOString().split('T')[0];
        let { data, errors } = await supabase.from('events').select('*').gte('date', today).order('date', { ascending: true })

        if (errors) {
            console.error(errors);
        }
        else {
            return data
        } 
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
    }
}

export async function getAllInscriptions(){
    try {
        let { data, errors } = await supabase.from('inscriptions').select('*')

        if (errors) {
            console.error(errors);
        }
        else {
            return data
        } 
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
    }
}

export async function getAllProfils(){
    try {
        let { data, errors } = await supabase.from('profils').select('*')

        if (errors) {
            console.error(errors);
        }
        else {
            return data
        } 
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
    }
}

export function formatterDate(inputDate) {
    if(!inputDate) return inputDate
    var partiesDate = inputDate.split('-');
    var dateFormatee = new Date(partiesDate[0], partiesDate[1] - 1, partiesDate[2]);

    var moisEnFrancais = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', '1oût', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    var jour = dateFormatee.getDate();
    var mois = moisEnFrancais[dateFormatee.getMonth()];
    var annee = dateFormatee.getFullYear();

    var dateFormateeString = (jour < 10 ? '0' : '') + jour + ' ' + mois + ' ' + annee;

    return dateFormateeString;
}

export async function subscribeEvent(userId, userEmail, eventData) {
    let dataSubscribe = {
        idUser: userId,
        mailUser: userEmail,
        idEvent: eventData.id,
        isOnWaitingList: (eventData.isFull || (eventData.places === eventData.reservations)) ? true : false
    }

    try {
        console.log(userId, userEmail, eventData);
        const { data, error } = await supabase.from('inscriptions').insert([dataSubscribe]).select()

        if (error) {
            console.error(error);
            throw new Error('Une erreur est survenue lors de l\'insertion des données.');
        } else {
            const updatedEvent = await updateEvent('AddReservation', eventData)
            if (updatedEvent) {
                return { data, updateEvent };
            }
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la publication des données :', error);
        throw new Error('Une erreur est survenue lors de la publication des données.');
    }
}


export async function unsubscribeEvent(inscriptionData, eventData){
    
    try {
        const { error } = await supabase.from('inscriptions').delete().eq('id', inscriptionData.id)

        if (error) {
            console.error(error);
            throw new Error('Une erreur est survenue');
        }
        else {
            const updatedEvent = await updateEvent('DeleteReservation', eventData, inscriptionData)
            
            if(updatedEvent){
                return {updateEvent}
            }
            
        } 
    } catch (error) {
        console.error('An error occurred while deleting data:', error);
    }
}

async function updateEvent(action, eventData, inscriptionData){
    if(action === "AddReservation"){        
        let dataToUpdate = {
            reservations: eventData.reservations,
            waiting: eventData.waiting,
            isFull: (eventData.isFull || (eventData.places === (eventData.reservations + 1))) ? true : false,
        }
        if(eventData.places === eventData.reservations)dataToUpdate.waiting = dataToUpdate.waiting + 1
        else {dataToUpdate.reservations = dataToUpdate.reservations + 1}

        try {
            
            const { data, error } = await supabase.from('events').update(dataToUpdate).eq('id', eventData.id).select()
        
            if (error) {
                console.error(error);
                throw new Error('Une erreur est survenue lors de la publication des données.');
            }
            else {
                return data
            } 
        } catch (error) {
            console.error('An error occurred while posting data:', error);
            throw new Error('Une erreur est survenue lors de la publication des données.');
        }
    }
    else if (action === "DeleteReservation"){
        let dataToUpdate = {
            reservations: eventData.reservations,
            waiting: eventData.waiting
        }
        if(eventData.places === eventData.reservations){
            if(inscriptionData.isOnWaitingList === true){
                dataToUpdate.waiting = dataToUpdate.waiting - 1
            }
            else{
                dataToUpdate.reservations = dataToUpdate.reservations - 1
            }
        }
        else {dataToUpdate.reservations = dataToUpdate.reservations - 1}

        try {
            
            const { data, error } = await supabase.from('events').update(dataToUpdate).eq('id', eventData.id).select()
        
            if (error) {
                console.error(error);
                throw new Error('Une erreur est survenue');
            }
            else {
                return data
            } 
        } catch (error) {
            console.error('An error occurred while posting data:', error);
            throw new Error('Une erreur est survenue lors de la publication des données.');
        }
    }
}

export async function addEvent(dataForm){
    console.log(dataForm)

    const { data, error } = await supabase
    .from('events')
    .insert([
        { 
            name : dataForm.name,
            description : dataForm.description,
            date : dataForm.date,
            hour : dataForm.hour,
            places : dataForm.places,
            reservations : 0,
            waiting : 0,
            image_link: dataForm.illustration,
            category: dataForm.categorie,
            location: dataForm.location,
        }
    ])
    .select()    
}

export async function updatedEventAdmin(dataForm){
    console.log(dataForm)

    const { data, error } = await supabase
    .from('events')
    .update(
        { 
            name : dataForm.name,
            description : dataForm.description,
            date : dataForm.date,
            hour : dataForm.hour,
            places : dataForm.places,
            image_link: dataForm.illustration,
            category: dataForm.categorie,
            location: dataForm.location,
        }
    )
    .eq('id', dataForm.id)
    .select()    
}

export function successToast(message){
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export function errorToast(message){
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}
          