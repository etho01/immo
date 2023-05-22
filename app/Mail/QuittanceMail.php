<?php

namespace App\Mail;

use App\Models\Agence;
use App\Models\Appart;
use App\Models\Contrat;
use App\Models\Locataire;
use App\Models\Paiement;
use App\Pdf\QuittancePdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;

class QuittanceMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct( // definie les varaibles en tant que variable de classe
        public Appart $appart,
        public Locataire $locataire,
        public Agence $agence,
        public QuittancePdf $pdf
    )
    {

    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Quittance Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.quittance',
            with: [
                'locataire' => $this->locataire,
                'appart' => $this->appart,
                'agence' => $this->agence,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $pdf = $this->pdf->pdf;
        return [
            Attachment::fromData( function() use ($pdf) {
                return $pdf->output();
            } , 'quittance.pdf')
        ];
    }
}
