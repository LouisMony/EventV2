import React from 'react'
import GoBack from '../../components/GoBack/GoBack';
//STYLE
import '../../style/StyleSettings.scss';
import { motion } from 'framer-motion';
import { fadeOpacity, anim } from '../../js/animation';

const Rgpd = () => {
  return (
    <motion.div {...anim(fadeOpacity)} className='settings'>
        <GoBack link={'/settings'}/>
        <h2 style={{marginTop: "12px"}}>Utilisation des données</h2>

        <p>Les informations recueillies dans le questionnaire sont enregistrées dans un fichier informatisé par <strong>le gérants des Fous du Roy</strong>. La base légale du traitement est le contrat. <br/><br/>

        Les données marquées par un astérisque dans le questionnaire doivent obligatoirement être fournies. Dans le cas contraire, nous ne pouvons pas vous compter parmi les participants à nos évènements.<br/><br/>

        Les données collectées seront communiquées aux seuls destinataires suivants : <strong>Les Fous du Roy.</strong><br/><br/>

        Elles sont conservées pendant<strong> 5 ans.</strong><br/><br/>

        Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données. (en fonction de la base légale du traitement, mentionner également : Vous pouvez retirer à tout moment votre consentement au traitement de vos données ; Vous pouvez également vous opposer au traitement de vos données ; Vous pouvez également exercer votre droit à la portabilité de vos données)<br/><br/>

        Consultez le site cnil.fr pour plus d’informations sur vos droits.<br/><br/>

        Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter (le cas échéant, notre délégué à la protection des données ou le service chargé de l’exercice de ces droits) : <strong>contact@lesfousduroy.fr.</strong> <br/><br/>

        Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne
        sont pas respectés, vous pouvez adresser une réclamation à la CNIL.</p><br/><br/><br/><br/>
    </motion.div>
  )
}

export default Rgpd
