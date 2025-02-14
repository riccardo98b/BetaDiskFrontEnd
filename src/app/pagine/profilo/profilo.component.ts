import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profilo',
  standalone: false,
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css',
})
export class ProfiloComponent implements OnInit {
  clienteId: number = 1;
  clienteForm!: FormGroup;
  editMode: boolean = false;
  constructor(private clienteService: ClienteService) {}
  ngOnInit(): void {
    // this.clienteService.listAllCliente().subscribe((response: any) => {
    //   console.log(response);
    // });
    this.clienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      immagineCliente: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      via: new FormControl('', [Validators.required]),
      comune: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      cap: new FormControl('', [Validators.required]),
    });

    //getCliente
    this.clienteService.getCliente(this.clienteId).subscribe(
      (response: any) => {
        const clienteData = response.dati; // Questo è il dato cliente che ti interessa

        // this.cliente = response;
        //console.log(this.cliente);
        this.clienteForm.patchValue({
          nome: clienteData.nome,
          cognome: clienteData.cognome,
          immagineCliente: clienteData.immagineCliente,
          email: clienteData.utente?.email || '',
          password: clienteData.utente?.password || '',
          via: clienteData.via,
          comune: clienteData.comune,
          provincia: clienteData.provincia,
          cap: clienteData.cap,
          dataRegistrazione: clienteData.dataRegistrazione,
        });
        console.log(response);
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }
  // Creazione oggetto
  cliente: {
    nome: string;
    cognome: string;
    email: string;
    immagineCliente: string;
    password: string;
    dataRegistrazione: string;
    via: string;
    comune: string;
    provincia: string;
    cap: string;
  } = {
    nome: '',
    cognome: '',
    email: '',
    immagineCliente: '',
    password: '',
    dataRegistrazione: '',
    via: '',
    comune: '',
    provincia: '',
    cap: '',
  };

  onEditUser() {
    this.editMode = !this.editMode;
  }

  // TODO: Da implementare
  onSubmit() {
    console.log('Dati inviati');
  }
}
