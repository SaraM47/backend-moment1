# Laboration 1 – Server-baserad webbutveckling

Syftet med laborationen är att skapa en serverbaserad webbapplikation som tillåter användare att lägga till och hantera kurser i ett CV-system. Applikationen är byggd med Node.js, Express, SQLite och EJS som vy-motor.

## Om projektet

Webbapplikationen består av tre huvudsidor: en startsida där alla sparade kurser visas i tabellform, en formulärsida där nya kurser kan läggas till, samt en informationssida där syftet och tekniken bakom projektet beskrivs. För varje kurs visas kurskod, namn, länk till kursplan och progression. Användaren kan även ta bort kurser via en raderingslänk med bekräftelseruta.

## Teknik och verktyg

Servern är byggd med Node.js och Express. Databasen är en relationsdatabas skapad med SQLite och ansluts via npm-paketet `sqlite3`. Applikationen använder EJS som vy-motor för att rendera HTML-sidor med dynamiskt innehåll. Alla SQL-kommandon som krävs för att skapa databasen och lägga in initiala exempelkurser finns i installationsfilen `create_db.sql`.

## Databasanvändning och struktur

En SQLite-databas (`cv.db`) används för att lagra kursdata. Den innehåller en tabell kallad `courses`, som har kolumnerna `courseid`, `coursecode`, `coursename`, `syllabus` och `progression`. Ett ER-diagram som beskriver strukturen finns bifogat i projektmappen. Databasen skapas via ett installationsskript och fylls med initial data.

## Validering och säkerhet

Formulärdata valideras både på klientsidan och serversidan. Användaren får felmeddelanden om obligatorisk information saknas. Det är inte möjligt att lagra tomma värden i databasen. Validering sker genom enkel kontroll i serverns POST-routelogik innan SQL INSERT-kommandot körs.

## Gränssnitt 

Webbplatsen är responsiv och fungerar bra både på stor och liten skärm. Designen är enkelt som är anpassad med hjälp av CSS och media queries för att göra formulär, tabeller och navigering användarvänliga. 

## Databasinstallation
Eftersom denna applikation använder SQLite, behövs ingen databas-server eller inloggningsuppgifter. All data sparas lokalt i en fil: ./db/cv.db.
För att skapa och fylla databasen med exempeldata, kör följande kommando i terminalen (från projektets rotmapp):
```bash
sqlite3 ./db/cv.db < ./db/create_db.sql

Saker som bör tänka på är att filen create_db.sql innehåller både tabellstruktur och exempelkurser, vilket betyder att mappen db måste finnas innan du kör kommandot – annars uppstår fel. Efter detta är databasen klar att användas av servern (server.js).
