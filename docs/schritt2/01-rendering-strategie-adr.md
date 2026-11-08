# ADR 01 (Schritt 2): Rendering-Strategie je Anwendungsteil

* **Status:** Entwurf
* **Datum:** 2026-11-08
* **Beteiligte:** Christian Fally, Jakob Pronebner

---

## Einleitung und Auswahlkriterien

Diese ADR legt für die vier Anwendungsteile von Linie F fest, wann und wo HTML entsteht: zur Build-Zeit (SSG), im Browser (CSR), pro Anfrage auf einem Server (SSR) oder statisch mit zeitgesteuerter Neuerzeugung (ISR). Maßgeblich sind die tatsächlichen Dateneigenschaften: Änderungshäufigkeit, Personalisierung und Datenquelle (localStorage existiert nur im Browser), Bedarf an sofort sichtbarem Inhalt und teilbaren URLs, vorhandene Infrastruktur (laut Szenario kein Backend), Offline-Fähigkeit für Schritt 3 sowie Aufwand und Nachvollziehbarkeit im Zweierteam. Die Zuordnung aus dem Szenario ist Ausgangspunkt, nicht Vorgabe; Abweichungen sind ausdrücklich begründet. Jeder Punkt folgt dem Schema Kontext, Optionen, Entscheidung, Konsequenzen.

---

## 1. Speaker-Profile (`/speaker/:id`, 18 Seiten)

**Kontext.** Ein Profil zeigt Name, Titel, Firma, Bio und die gehaltenen Sessions. Die Daten stammen aus der schreibgeschützten `conference-data.json`, sind für alle Besucher:innen identisch und enthalten nichts Personalisiertes. Die Session-Liste wird aus `session.speakerIds` abgeleitet (Dokument 03). Der Inhalt ändert sich nur, wenn eine neue Version des Datensatzes ausgeliefert wird.

**Optionen.**

* **A: SSG.** Alle 18 Seiten entstehen einmalig beim Build. Vorteil: Inhalt ist ohne JavaScript sichtbar, die URL liefert eine Link-Vorschau, statisches Hosting genügt, die Dateien sind offline cachebar. Nachteil: Datenänderungen brauchen einen neuen Build, ein Prerendering-Werkzeug ist nötig.
* **B: CSR.** Der Browser rendert nach dem Laden von JavaScript und JSON. Vorteil: keine Zusatzinfrastruktur. Nachteil: leere Seite, bis der Code läuft; schwächere Link-Vorschau.
* **C: SSR.** Ein Server rendert pro Anfrage. Vorteil: immer aktuell. Nachteil: Serverbetrieb für Inhalte, die sich nie ändern.

**Entscheidung.** SSG, wie im Szenario nahegelegt. Die Daten sind zur Laufzeit unveränderlich: SSR (C) würde bei jeder Anfrage dasselbe Ergebnis berechnen, CSR (B) verschenkt den sofort sichtbaren Inhalt.

**Konsequenzen.** Positiv: schnelle Erstansicht, kein Server, gute Grundlage für die Offline-Strategie. Negativ: Jede Änderung an Bio oder Zuordnung erfordert Build und Deploy. Zur Umsetzung in Schritt 2 siehe „Umsetzungsstand“.

---

## 2. Session-Detailseiten (`/session/:id`, 20 Seiten)

**Kontext.** Jede Seite zeigt Titel, Abstract, Tag, Zeit, Raum, Track, Level, Format und Links zu den Speakern. Titel, Abstract und Zuordnungen sind stabil. Tag, Zeit und Raum sind jedoch genau die Felder, die sich bei einer Zeitplanänderung ändern würden; die Detailseite teilt diese Veränderlichkeit also mit der Übersicht (Punkt 3). Personalisiert ist nur der Merken-Button, der erst im Browser auf den localStorage zugreift.

**Optionen.**

* **A: SSG.** Vorteile wie in Punkt 1. Nachteil: Eine Zeitplanänderung erfordert einen Rebuild.
* **B: ISR.** Statische Seiten, die nach Ablauf eines Zeitfensters neu erzeugt werden. Vorteil: aktuell ohne manuellen Rebuild. Nachteil: braucht eine Laufzeitumgebung, widerspricht „kein Backend“ und lässt sich schwerer offline cachen.
* **C: CSR.** Vorteil: einfach. Nachteil: wie in Punkt 1.

**Entscheidung.** SSG. Der Zeitplan steht vor der Konferenz fest und bleibt zwei Tage stabil; ein Rebuild über CI dauert Minuten. ISR löst ein Problem, das erst bei veränderlichen Serverdaten entsteht, und setzt Infrastruktur voraus, die das Projekt bewusst nicht hat.

**Konsequenzen.** Positiv: Vorteile wie in Punkt 1, die Detailseiten bleiben als statische Dateien offline verfügbar. Negativ: Wird der Zeitplan während der Konferenz geändert, sind die Seiten bis zum nächsten Deploy veraltet; in diesem Fall wechseln wir auf ISR (Punkt 3). Der Merken-Button ist der einzige clientseitige Teil der Seite.

---

## 3. Session-Übersicht mit Filtern (`/`)

**Kontext.** Die Übersicht listet alle 20 Sessions und filtert nach Track, Tag und Level (UND-Verknüpfung). Das Szenario legt SSR oder ISR nahe, weil sich der Zeitplan ändern könnte. Tatsächlich sind die Daten schreibgeschützt und winzig (der Datensatz wiegt im Build 10 kB, 3,4 kB gzip). Der Filterzustand ist rein clientseitig und wechselt bei jedem Klick.

**Optionen.**

* **A: SSR.** Filter als Query-Parameter, Server rendert pro Anfrage. Vorteil: immer aktuell. Nachteil: Server und Request je Filteränderung; der Modul-Scope-State aus Dokument 03 würde zwischen Anfragen geteilt (ADR 04).
* **B: ISR.** Statische Seite mit zeitgesteuerter Neuerzeugung. Nachteil: Laufzeitumgebung nötig, die Filterlogik bliebe trotzdem im Browser.
* **C: SSG mit clientseitigem Filter.** Die Liste wird gebaut, gefiltert wird im Browser.
* **D: reines CSR.**

**Entscheidung.** C, eine Abweichung vom Szenario. SSR und ISR lösen veränderliche Serverdaten, die wir nicht haben; das Filtern von 20 Einträgen dauert Mikrosekunden. Für einen veränderlichen Zeitplan würden wir ISR mit 1 bis 5 Minuten Revalidierung wählen, der Filter bliebe clientseitig. Simulation: Wird s05 von 11:15 auf 11:30 verschoben, ist die Änderung bei SSG nach Rebuild und Deploy sichtbar, bei ISR beim ersten Aufruf nach Ablauf des Zeitfensters, bei SSR sofort. „Mein Programm“ speichert nur IDs und zeigt die neue Zeit automatisch (Dokument 03).

**Konsequenzen.** Positiv: sofortiges Filtern ohne Netzwerk, keine Infrastruktur, offline nutzbar. Negativ: Zeitplanänderungen brauchen einen Rebuild; gefilterte Ansichten haben keine eigene, teilbare URL (Query-Parameter wären eine mögliche Erweiterung).

---

## 4. „Mein Programm“ (`/mein-programm`)

**Kontext.** Die Seite zeigt die gemerkten Sessions einer Person. Quelle sind die Session-IDs im localStorage (`frontendnow:schedule:v1`); es gibt keinen Login und keinen Server-State. Die Daten existieren nur im Browser der jeweiligen Person und ändern sich mit jedem Klick. Die Seite soll offline funktionieren (Schritt 3).

**Optionen.**

* **A: CSR.** Der Browser liest die IDs und leitet die vollständigen Sessions aus dem Datensatz ab. Vorteil: passt zur Datenquelle, offline-fähig. Nachteil: nicht vorgerendert, bei einer privaten Seite ohne Belang.
* **B: SSR.** Der Server hat keinen Zugriff auf den localStorage und müsste das Programm per Cookie oder Server-Session kennen. Das erfordert ein Backend, und geteilter Modul-State könnte Programme verschiedener Personen vermischen (ADR 04).
* **C: SSG.** Liefert nur eine leere Hülle, die der Client füllt. Das ist CSR mit zusätzlichem Build-Aufwand.

**Entscheidung.** CSR, wie im Szenario. Der einzige Ort, an dem die Daten existieren, ist der Browser.

**Konsequenzen.** Positiv: offline-fähig, keine Serverkosten, kein Datenschutzrisiko. Negativ: Die Seite ist erst nach Laden des Datensatzes und Rehydration korrekt; sonst erschiene kurz „Noch keine Sessions gemerkt“. `App.vue` rendert die Views deshalb erst nach `loadData()` und `init()`. Wird der Browser-Speicher gelöscht, geht das Programm verloren; das akzeptieren wir, weil es keinen Login gibt.

---

## Umsetzungsstand und Abweichungen (Schritt 2)

* **Vite statt Nuxt:** Das Szenario empfiehlt Nuxt, ADR 04 hat Vue 3 + Vite + vue-router gewählt und die Rendering-Frage ausdrücklich auf diese ADR vertagt.
* **SSG-Teile (Punkt 1 und 2) sind in Schritt 2 simuliert:** Die Anwendung wird als clientseitig gerenderte SPA ausgeliefert, es gibt kein Prerendering. Umgesetzt sind die Voraussetzungen für SSG: eine Route je ID (18 Speaker, 20 Sessions), Daten, die zur Build-Zeit feststehen (JSON im Bundle, kein Laufzeit-Fetch), und Views ohne Browser-Zugriff außer dem Merken-Button. Ein Prerender-Skript für 39 statische Routen (Übersicht, 20 Sessions, 18 Speaker) wäre die nächste Ausbaustufe.
* **Übersicht (Punkt 3)** weicht bewusst vom Szenario (SSR/ISR) ab, siehe dort.
* **CSR (Punkt 4)** ist wie entschieden umgesetzt.