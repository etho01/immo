<div>

    <h1>Bonjour @if ($locataire->genre == 'homme')
        M.
    @else
        Mme.
    @endif {{ $locataire->nom }}</h1><br>
    Nous vous envoyons votre quittance de concernant l'appartement {{ $appart->adresse }}<br>
    <br>
    Cordialement<br>
    L'agence {{ $agence->nom }}

</div>