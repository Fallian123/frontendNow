# 03 – Entscheidungsprotokoll Schritt 3 (Offline und Caching)

## Kontext

Linie F wird im Vortragssaal mit überlastetem WLAN oder im Flugmodus zwischen zwei Sessions verwendet. Die Konferenzdaten liegen laut docs/schritt1/03-state-management-konzept.md als JSON im Bundle und werden per dynamischem Import geladen, „Mein Programm“ ist im localStorage gespeichert, und laut docs/schritt2/01-rendering-strategie-adr.md ist der Zeitplan nach der Veröffentlichung stabil. Es gibt kein Backend und keine Webfonts.

## Optionen

- **A: Precache (Cache-First)** für App-Shell, Daten und Routen-Chunks mit Workbox (vite-plugin-pwa, generateSW).
- **B: Runtime-Caching beim ersten Aufruf.** Nicht besuchte Lazy-Routen wären offline nicht verfügbar.
- **C: Stale-While-Revalidate (SWR)** für die Daten. Nur sinnvoll bei einer separaten JSON-Datei, was eine Änderung am Datenzugriff erfordern würde. Nur konzeptionell verglichen.

## Entscheidung

Option A. Alle Dateien liegen nach dem ersten Laden lokal vor, sodass jede Route offline erreichbar ist. Option B hätte nie besuchte Routen offline nicht verfügbar gemacht, Option C hat aktuell keine Datei, auf die sie wirken könnte.

## Konsequenzen

- Positiv: Die App startet in jedem Netzwerkzustand mit gleicher Geschwindigkeit, ohne Datenverbrauch.
- Negativ: Der Datenstand ändert sich nur durch ein neues Deployment. Eine bereits geöffnete Seite zeigt den neuen Stand erst nach dem nächsten Laden.
- Negativ: Ein Erstbesuch ohne Netz ist nicht möglich.
- Nicht getestet: Chunk-Mismatch nach einem Deployment, wenn eine alte Seite einen nicht mehr vorhandenen Chunk nachlädt.

## Testszenarien

Getestet wurde in Chrome unter macOS, `npm run build` und `npm run preview` auf localhost:4173.

### Szenario 1: Programm online geladen, dann offline, Übersicht erneut geöffnet

Ausgangslage war der Produktions-Build (npm run build, npm run preview) auf localhost:4173 in einem privaten Chrome-Fenster unter macOS. Der Service Worker war laut Application-Tab „activated and is running“, die Seite zuvor online geladen. Anschließend wurde das Throttling im Network-Tab auf „Offline“ gestellt und die Übersicht neu geladen. Die Seite wurde vollständig dargestellt (20 Sessions, 18 Speaker:innen, 5 Linien). Die Skripte wurden mit Status 200 vom Service Worker beantwortet. Auch /session/s05 wurde per Neuladen offline geöffnet. Der Cache „workbox-precache“ enthält 18 Einträge, darunter die Chunks der drei lazy geladenen Views. Die Console zeigte keinen Fehler. Ergebnis: bestanden.

Belege: assets/s1-offline-uebersicht.png, assets/s1-cache-storage.png, assets/s1-lazy-chunks-offline.png

### Szenario 2: „Mein Programm“ offline, nachdem Sessions hinzugefügt wurden

Ausgangslage war der Produktions-Build auf localhost:4173 in einem privaten Chrome-Fenster, der Service Worker war aktiv und die Seite zuvor online geladen. Online wurden drei Sessions über den Merken-Button zu „Mein Programm“ hinzugefügt. Anschließend wurde das Throttling auf „Offline“ gestellt und die Route /mein-programm direkt neu geladen, um den Navigations-Fallback zu prüfen. Die Seite wurde vollständig dargestellt, die Anzeige „3 Sessions gemerkt“ stimmte mit dem Eintrag frontendnow:schedule:v1 im Local Storage überein. Die Skripte wurde mit Status 200 vom Service Worker beantwortet. Ergebnis: bestanden.

Belege: assets/s2-mein-programm-offline.png, assets/s2-local-storage.png

### Szenario 3: Erstbesuch offline (bewusster Grenzfall)

Ausgangslage war der Zustand ohne Service Worker (Site-Daten gelöscht, Registrierung entfernt), der Build lief weiterhin auf localhost:4173. Im Network-Tab wurde das Throttling auf „Offline“ gestellt und die Adresse neu geladen. Chrome zeigte die Fehlerseite mit der Meldung ERR_INTERNET_DISCONNECTED, die App wurde nicht geladen. Die Anfragenliste blieb leer (0 von 6 Anfragen). Das Verhalten entspricht der Erwartung: Ohne vorherigen Online-Besuch existiert weder ein Service Worker noch ein Cache, wodurch keine Instanz vorhanden ist, welche die Anfrage beantworten könnte. Akzeptabel ist dies, da sich das Problem bei einer Web-App technisch nicht lösen lässt. Ergebnis: wie erwartet, bewusster Grenzfall.

Belege: assets/s3-fehlerseite.png, assets/s3-keine-registrierung.png

## Zusätzliche Beobachtungen und Lücken

- Im normalen Chrome-Profil zeigte Offline nach einem Update (Version #121 auf #122, `skipWaiting`, Neuladen) die Fehlerseite, im privaten Fenster funktionierte es. Die Ursache wurde nicht geklärt, vermutlich Altlasten im Profil, nachgewiesen ist das nicht.
- Das Panel zeigte `#122` als „waiting to activate“, obwohl `dist/sw.js` `skipWaiting` und `clientsClaim` enthält und keinen `SKIP_WAITING`-Handler. Auch das wurde nicht erklärt.
- Der Abruf von favicon.ico schlug offline fehl, nachdem das Icon auf favicon.svg umgestellt wurde, ist der Fehler verschwunden.
- Das Team bestand ursprünglich aus zwei Personen, die Tests wurden daher nur von einer Person und in einer Umgebung durchgeführt.