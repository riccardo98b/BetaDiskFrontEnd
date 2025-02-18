export const messaggiErroreCliente = {
  nome: [{ type: 'required', message: 'Il nome è obbligatorio.' }],
  cognome: [{ type: 'required', message: 'Il cognome è obbligatorio.' }],
  email: [
    { type: 'required', message: "L'email è obbligatoria." },
    { type: 'email', message: "Inserisci un'email valida." },
  ],
  telefono: [{ type: 'required', message: 'Il telefono è obbligatorio.' }],
  username: [{ type: 'required', message: 'Lo username è obbligatorio.' }],
  password: [
    { type: 'required', message: 'La password è obbligatoria.' },
    {
      type: 'minlength',
      message: 'La password deve contenere almeno 8 caratteri.',
    },
  ],
  passwordDiConferma: [
    {
      type: 'required',
      message: 'La conferma della password è obbligatoria.',
    },
    {
      type: 'minlength',
      message: 'La conferma della password deve contenere almeno 8 caratteri.',
    },
    { type: 'mismatch', message: 'Le password non corrispondono.' },
  ],
  via: [{ type: 'required', message: 'La via è obbligatoria.' }],
  comune: [{ type: 'required', message: 'Il comune è obbligatorio.' }],
  provincia: [{ type: 'required', message: 'La provincia è obbligatoria.' }],
  cap: [{ type: 'required', message: 'Il CAP è obbligatorio.' }],
};
