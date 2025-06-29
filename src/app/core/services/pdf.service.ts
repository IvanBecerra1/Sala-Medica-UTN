import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // Simulación de datos de historia clínica
  example: any[] = [
    {
      fechaTurno: '20-05-2025',
      nombre: 'Iván',
      apellido: 'Becerra',
      dni: '4372965',
      altura: '170',
      peso: '70',
      presion: '120/80',
      temperatura: '36.5',
      dinamicos: [
        { clave: 'ojos', valor: '2' },
        { clave: 'piernas', valor: '4' }
      ]
    },
    {
      fechaTurno: '09-10-2025',
      nombre: 'Iván',
      apellido: 'Becerra',
      dni: '4372965',
      altura: '171',
      peso: '72',
      presion: '130/85',
      temperatura: '36.7',
      dinamicos: [{ clave: 'ojos', valor: '1' }]
    }
  ];
/*
fechaTurno: turno.fechaTurno,
          nombreEsp : turno.especialistaNombre,
          apellidoEsp : turno.especialistaApellido,
          especialidad: turno.especialidad,
          dniEsp: turno.especialistaDni,
          estado: turno.estado,
          hora : turno.hora,
          obraSocial: turno.obraSocial,
          nombre: turno.pacienteNombre,
          apellido: turno.pacienteApellido,
          dni: turno.pacienteDni,
*/
  generarPDF(historial : any[]) {
    const doc = new jsPDF();

    const img = new Image();
    img.src = '../../../../assets/imagenes/icono.png';

    img.onload = () => {
      // Dibujar el logo en el PDF (x=150, y=5 para esquina superior derecha)
      doc.addImage(img, 'PNG', 150, 5, 40, 20);

      doc.setFontSize(18);
      doc.text('Historia Clínica del Paciente', 10, 15);
      doc.setFontSize(12);
      doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 10, 23);

      let yActual = 30;

      historial.forEach((registro) => {
        autoTable(doc, {
          startY: yActual,
          head: [['Campo', 'Valor']],
          body: [
            ['Fecha del turno', `${registro.fechaTurno} - hora: ${registro.hora}`],
            ['Especialidad', registro.especialidad],  
            ['Nombre doctor', `${registro.nombreEsp} ${registro.apellidoEsp}`],
            ['Nombre completo', `${registro.nombre} ${registro.apellido}`],
            ['Obra social', registro.obraSocial],
            ['DNI', registro.dni],
            ['Altura', `${registro.altura} cm`],
            ['Peso', `${registro.peso} kg`],
            ['Presión', registro.presion],
            ['Temperatura', `${registro.temperatura} °C`]
          ],
          theme: 'striped'
        });

        yActual = (doc as any).lastAutoTable.finalY + 5;

        if (registro.dinamicos?.length) {
          autoTable(doc, {
            startY: yActual,
            head: [['Dato dinámico', 'Valor']],
            body: registro.dinamicos.map((d: any) => [d.clave, d.valor]),
            theme: 'grid'
          });

          yActual = (doc as any).lastAutoTable.finalY + 10;
        }
      });

      doc.save('historia_clinica.pdf');
    };
  }
}