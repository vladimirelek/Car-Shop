ONLINE PRODAJA AUTOMOBILA

Web aplikacija koja služi za prodaju vlastitih i kupovinu novih automobila.

INSTALACIJA

Potrebno se pozicinirati u direktorijum olx/API,a zatim komandom “dotnet watch run” pokrenuti backend. U novom terminalu potrebno se pozicionirati u direktorijum olx/client i pokrenuti komandu “npm i” i “npm start”

TEHNOLOGIJE

React za klijentsku aplikaciju ili frontend

Redux Toolkit za upravljanje stanjem klijentske strane

Material UI stilski okvir za React, CSS i Flexbox

React Router

TypeScript

.NET za backend kod

Entity Framework

ASP.NET Core Identity za autentifikaciju

JWT Tokens

SignalR

SQLite

FUKNCIONALNOSTI I KORIŠTENJE

Aplikacija u osnovi sadrži navigacionu traku (navbar) koja ima tri osnovne stranice:

Izdvojeni automobili: Ova stranica prikazuje samo izdvojene automobile.

Svi automobili: Na ovoj stranici korisnici mogu pregledati sve dostupne automobile.

Inbox: Ova stranica omogućava korisnicima pregled primljenih obavještenja i poruka.

Osnovna funkcionalnost aplikacije je prikazivanje aktivnih automobila za prodaju sa osnovnim podacima o automobilima i imenom korisnika na kartici. Na početnoj stranici prikazuju se samo izdvojeni automobili, dok na stranici sa svim automobilima postoje sortiranja po najjeftinijoj i po najskupljoj cijeni. Takođe, postoje filteri na osnovu proizvođača, goriva i raspona godine proizvodnje. Postoji dugme koje sve filtere vraća na početno stanje. Za pregledniji i efikasniji prikaz automobila koristi se "pagination", gde se pozivaju samo oni automobili koje korisnik zahtijeva u tom trenutku, a ne svi. Klikom na karticu automobila dobijamo detaljniji prikaz svakog automobila, sa svim podacima o njemu. Postoji sekcija za komentare, gde možete komentarisati objavu ako ste ulogovani. Komentare možete brisati ako je vaš komentar ili ako ste postavili objavu. Klikom na korisnika dobijamo sve informacije o korisniku i kojim objavama trenutno raspolaže. Postoje dvije role u sistemu: administrator i korisnik. U zavisnosti od role, ponuđene su različite funkcionalnosti pri korišćenju aplikacije. Kao korisnik možete da postavljate svoj automobil na prodaju i da ga brišete. Primate i brišete obavještenja od strane administratora. Administrator ima mogućnost da izdvaja automobile, šalje obavještenja svim korisnicima. Kod registracije neka polja su obavezna i zahtijevaju kombinaciju različitih karaktera.Aplikacija je dizajnirana da bude responzivna, prilagođavajući se različitim veličinama ekrana i uređajima kako bi pružila optimalno iskustvo korisnicima. 

Administrator:

username:vladimir
password:Pa$$w0rd

Korisnik:

username:milan2001
password:Pa$$w0rd
