# ADR 04: Projekt-Setup

* **Status:** Akzeptiert
* **Datum:** 2026-10-18
* **Beteiligte:** Christian Fally, Jakob Pronebner

---

## 1. Kontext

Für Linie F wird ein Projekt-Setup benötigt, welches Routing für drei Seitentypen (Programmübersicht, Session-Detailseite, persönliches Programm) unterstützt und in den Schritten 2 bis 4 erweiterbar bleibt. Die Entscheidung betrifft ausschließlich Setup und Tooling, die Rendering-Strategie wird in Schritt 2 festgelegt.

Folgende Kriterien wurden herangezogen:

* **Routing-Bedarf:** drei Routen, davon eine mit Parameter (`/session/:id`)
* **Team-Erfahrung:** Beide Teammitglieder kennen Vue und Vite aus dem Kurs, mit Nuxt bestehen keine Vorkenntnisse.
* **Nachvollziehbarkeit:** Das Team muss jede Entscheidung im Code erklären können.
* **Spätere Anforderungen:** In Schritt 2 werden Rendering-Strategien betrachtet.

## 2. Betrachtete Optionen

### Option A: Vue 3 + Vite + vue-router (via `create-vue`)

* **Vorteile:** Geringe Einstiegshürde und kein verstecktes Verhalten, da Routen explizit in `src/router/index.ts` definiert werden. Composables mit Modul-Scope-State und `localStorage` funktionieren ohne Einschränkung, da die Anwendung ausschließlich im Browser läuft. TypeScript, ESLint und Prettier sind direkt integriert.
* **Nachteile:** Routing und Seitenstruktur müssen selbst gepflegt werden. Server-Side Rendering oder Static Site Generation sind nicht eingebaut und müssten bei Bedarf ergänzt werden.

### Option B: Nuxt

* **Vorteile:** Dateibasiertes Routing, Auto-Imports und eingebaute Rendering-Modi (SSR, SSG, hybrid). Dies wäre für Schritt 2 ein Vorteil.
* **Nachteile:** Höhere Komplexität durch Konventionen, welche das Team erst erlernen müsste. Bei SSR wird Modul-Scope-State zwischen Anfragen verschiedener Nutzer:innen geteilt, weshalb stattdessen `useState()` verwendet werden müsste. Weiters ist `localStorage` am Server nicht verfügbar, wodurch das State-Konzept aus Dokument 03 angepasst werden müsste.

## 3. Entscheidung

Wir entscheiden uns für **Option A (Vue 3 + Vite + vue-router)**. Ausschlaggebend sind die Team-Erfahrung und die Nachvollziehbarkeit: Jede Route und jeder geteilte Zustand ist explizit im Code sichtbar. Für den aktuellen Routing-Bedarf von drei Routen bringt dateibasiertes Routing keinen nennenswerten Vorteil. Auf Pinia wird bewusst verzichtet, da der geteilte Zustand gemäß Dokument 03 über Composables abgebildet wird.

## 4. Konsequenzen

* **Positiv:** Schneller Start, keine Abweichung zwischen Konzept und Umsetzung. Detail- und „Mein Programm“-Seite werden per Lazy Loading als eigene Chunks geladen.
* **Negativ / Risiko:** Sollte sich in Schritt 2 SSR oder SSG als sinnvoll herausstellen, ist zusätzlicher Aufwand nötig, entweder durch Ergänzung (z. B. Vite-SSR) oder durch eine Migration zu Nuxt. Der Migrationsaufwand wird als begrenzt eingeschätzt, da Komponenten und Composables weitgehend übernommen werden könnten. Angepasst werden müssten vor allem der Router und der Zugriff auf `localStorage`.
