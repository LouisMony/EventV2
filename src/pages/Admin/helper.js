import { supabase } from "../../supabase/client";

export const handleDeleteEvent = async (id) => {
    console.log(id);
    
    try {
        const { error: errorInscriptions } = await supabase.from('inscriptions').delete().eq('idEvent', id);
        if (errorInscriptions) {
            throw new Error(`Erreur lors de la suppression des inscriptions: ${errorInscriptions.message}`);
        }
        
        const { error: errorEvent } = await supabase.from('events').delete().eq('id', id);
        if (errorEvent) {
            throw new Error(`Erreur lors de la suppression de l'événement: ${errorEvent.message}`);
        }
        
        console.log("Suppression réussie.");
    } catch (error) {
        console.error("Une erreur est survenue lors de la suppression :", error);
    }
};
