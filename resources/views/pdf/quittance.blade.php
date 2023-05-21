<head>
    
</head>

<body style="display: flex, flex-direction: column;">
    <h1 style="text-align: center;">
        Quittance de loyer
    </h1>
    <div style="text-align: start;">
        Nom, prénom du bailleur: {{ $proprietaire->getNom() }} <br>
        Adresse du bailleur<br>
    </div>
    <div style="display: flex; justify-content: end;">
        Nom, prénom du locataire : {{ $locataire->getNom() }}<br>
        Adresse du locataire<br>
    </div>

    <h4>Adresse de la location:</h4>
    {{ $appart->getAdresse() }}<br><br><br><br>

    Je soussigné {{ $proprietaire->getNom() }} propriétaire du logement désigné ci-dessus,
    déclare avoir reçu de 
    @if ($locataire->genre == 'homme') Monsieur
    @else 
    Madame
    @endif    
    {{ $locataire->getNom() }}, 
    le(s) virements cités ci dessous
    au titre du paiement du loyer et des charges pour la période de location du {{ $date_debut }} au {{ $date_fin }} et lui en donne quittance,
    sous réserve de tous mes droits.
    <ul>
        @foreach ($paiements as $paiement)
            <li>
                un virement de {{ $paiement->montant_paiement }} euros effectuer le {{ $paiement->date_paiement }}
            </li>
        @endforeach
    </ul>
    Pour un total de {{ $paiements->sum('montant_paiement') }} euros 
    <br><br><br>
    Le loyer de l'appartement etant de {{ $appart->loyer }} euros et les charges de {{ $appart->charge }} euros soit pour un total de {{ ($appart->loyer + $appart->charge) }} euros par mois.
    La periode s'ettalant sur {{ $nbMois }} mois, le montant dû etait de {{ $sommeDu }} euros
    Le montant dû a donc était entierement reglé
    <br>

</body>