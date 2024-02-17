import { supabase } from "../supabase/client";

export async function getAllEvents() {
    try {
        let { data, errors } = await supabase.from('events').select('*')

        if (errors) {
            console.error(errors);
        }
        else {
            console.log(data);
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