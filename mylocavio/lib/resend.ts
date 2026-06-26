// Resend email integration — add RESEND_API_KEY in .env.local
// Usage: import { Resend } from 'resend'
// export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_FROM = 'Mylocavio <noreply@mylocavio.fr>';

export const emailTemplates = {
  quittance: (locataire: string, mois: string) => ({
    subject: `Votre quittance de loyer — ${mois}`,
    text: `Bonjour ${locataire},\n\nVeuillez trouver ci-joint votre quittance de loyer pour ${mois}.\n\nCordialement,\nVotre bailleur via Mylocavio`,
  }),
  relanceJ3: (locataire: string, montant: number) => ({
    subject: 'Rappel : loyer en attente de règlement',
    text: `Bonjour ${locataire},\n\nNous n'avons pas encore reçu votre loyer de ${montant}€. Merci de procéder au règlement dans les plus brefs délais.\n\nCordialement`,
  }),
  relanceJ7: (locataire: string, montant: number) => ({
    subject: 'Mise en demeure : loyer impayé',
    text: `Bonjour ${locataire},\n\nMalgré notre précédent rappel, le loyer de ${montant}€ n'a pas été réglé. Nous vous mettons en demeure de payer sous 8 jours.\n\nCordialement`,
  }),
  relanceJ15: (locataire: string, montant: number) => ({
    subject: 'Mise en demeure formelle — loyer impayé',
    text: `Bonjour ${locataire},\n\nVotre loyer de ${montant}€ est impayé depuis 15 jours. Sans règlement sous 8 jours, nous serons contraints d'engager une procédure de recouvrement.\n\nCordialement`,
  }),
};
