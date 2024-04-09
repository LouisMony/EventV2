import { supabase } from "../../supabase/client";

export const handleDeleteEvent = async (id) => {
    console.log(id);
    
    try {
        const { error: errorInscriptions } = await supabase.from('inscriptions').delete().eq('idEvent', id);
        if (errorInscriptions) {
            throw new Error(`Erreur lors de la suppression des inscriptions: ${errorInscriptions.message}`);
            return false
        }
        
        const { error: errorEvent } = await supabase.from('events').delete().eq('id', id);
        if (errorEvent) {
            throw new Error(`Erreur lors de la suppression de l'événement: ${errorEvent.message}`);
            return false
        }
        console.log("Suppression réussie.");
        return true
    } catch (error) {
        console.error("Une erreur est survenue lors de la suppression :", error);
        return false
    }
};
