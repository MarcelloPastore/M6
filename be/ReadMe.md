
## Method find()

    Il metodo find restituisce TUTTi i documenti presenti in una collection,

## Method find() with query

    Al metodo find() possiamo passare un oggetto contenente altre query 
    ES: AuthorModel.find({age: 18})

    Oppure possiamo anche effettuare query all'interno di nested objects.
    ES: AuthorModel.find({"Author.name": valore})

## Method find.() with operators

    Al metodo find() possiamo anche passare operatori che consentono di effettuare query in appositi "range"
    ES:
        $gt: greater than
        $lt: less than
        $gte: greater than or equal to
        $lte: less than or equal to
        $regex: operatore al quale passare una "regular expression"

    ES: AuthorModel.find({ age: {$gt: 18 } })
    ES: AuthorModel.find({ age: {$lt: 18 } })

## Method find() with sorting and pagination

    Al metodo find possiamo passare ache altri metodi (concatenandoli) per far si che il risultato sia in linea con quanto ci serve a frontend.
    ES: 
        const post = await PostModel.find()
                            .sort({createdAt: 1 } // o -1 )
                            .limit(pageSize)
                            .skip((page -1) * pageSize);

## Flusso Blog

    - Utente si registra tramite AuthorsModel
    - Utente effettua il login (Verificheremo lato FE che l'utente abbia diritto ad utilizzare le nostre API ricevendo un TOKEN)
    - Il token viene salvato in localStorage
    - Il token viene letto e decodificato dal LocalStorage -> otteniamo i dati dell'utente loggato
    - Utente clicca sul pulsante CREA POST
    - Viene aggiunto già l'ID del creatore nel campo Author
    
## Backtilde:
    ````````````````````````````````````````````````````````````````
