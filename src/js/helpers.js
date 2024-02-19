import { supabase } from "../supabase/client";

export async function getAllEvents() {
    try {
        let { data, errors } = await supabase.from('events').select('*')

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

export async function subscribeEvent(userId, userEmail, eventData){
    console.log(userId, userEmail, eventData);
    
    let dataSubscribe = {
        idUser : userId,
        mailUser: userEmail,
        idEvent: eventData.id,
        isOnWaitingList: eventData.places === eventData.reservations ? true : false
    }

    try {
        const { data, error } = await supabase.from('inscriptions').insert([dataSubscribe]).select()

        if (error) {
            console.error(error);
        }
        else {
            const updatedEvent = await updateEvent('AddReservation', eventData)
            if(updatedEvent){
                return {data, updateEvent}
            }
            
        } 
    } catch (error) {
        console.error('An error occurred while posting data:', error);
    }
}

export async function unsubscribeEvent(inscriptionData, eventData){
    console.log(inscriptionData, eventData);
    
    try {
        const { error } = await supabase.from('inscriptions').delete().eq('id', inscriptionData.id)

        if (error) {
            console.error(error);
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
            waiting: eventData.waiting
        }
        if(eventData.places === eventData.reservations)dataToUpdate.waiting = dataToUpdate.waiting + 1
        else {dataToUpdate.reservations = dataToUpdate.reservations + 1}

        try {
            
            const { data, error } = await supabase.from('events').update(dataToUpdate).eq('id', eventData.id).select()
        
            if (error) {
                console.error(error);
            }
            else {
                return data
            } 
        } catch (error) {
            console.error('An error occurred while posting data:', error);
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
            }
            else {
                return data
            } 
        } catch (error) {
            console.error('An error occurred while posting data:', error);
        }
    }
    
}