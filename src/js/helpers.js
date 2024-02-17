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