# Linie F – Konferenzplattform für FrontendNow 2026

Teamprojekt im Kurs „NextGen Web Frontends“ (2026).
Team: Christian Fally, Jakob Pronebner

Linie F stellt das Programm der Konferenz FrontendNow als Liniennetz dar: Jeder Track ist eine Linie, jede Session eine Station, „Mein Programm“ die persönliche Route.

## Voraussetzungen

- Node.js `^22.18.0` oder `>=24.12.0`
- npm
- Git

## Setup

```bash
git clone https://github.com/Fallian123/frontendNow.git
cd frontendnow
npm install
npm run dev
```

Die Anwendung läuft danach unter der Adresse, die Vite im Terminal ausgibt (standardmäßig http://localhost:5173).

## Projektstruktur

```text
docs/schritt1/          Planungs- und Architekturdokumente (01–04)
tokens/tokens.css       Design Tokens (primitiv + semantisch)
src/
├── components/
│   ├── base/           generische UI-Primitives
│   ├── features/       Komponenten mit Konferenzlogik
│   └── layout/         Header, Footer
├── composables/        useConferenceData, useSchedule
├── data/               conference-data.json
├── types/              Typen des Datensatzes
├── utils               Format Helper
├── views/              eine Komponente je Route
└── router/             Routendefinitionen
```

## Dokumentation (Schritt 1)

1. [Branding & Design Tokens](docs/schritt1/01-branding-design-tokens.md)
2. [ADR Komponenten- und Ordnerarchitektur](docs/schritt1/02-architektur-adr.md)
3. [State-Management-Konzept](docs/schritt1/03-state-management-konzept.md)
4. [ADR Projekt-Setup](docs/schritt1/04-technologie-adr.md)

## Rendering-Strategie (Schritt 2)

Begründete Zuordnung je Anwendungsteil: [ADR Rendering-Strategie](docs/schritt2/01-rendering-strategie-adr.md)

| Teil | Ziel-Strategie | Stand in Schritt 2 |
| :--- | :--- | :--- |
| Speaker-Profile `/speaker/:id` | SSG | CSR-Route je ID (simuliert) |
| Session-Detail `/session/:id` | SSG | CSR-Route je ID (simuliert) |
| Übersicht `/` | SSG + clientseitiger Filter (Szenario: SSR/ISR) | CSR |
| Mein Programm `/mein-programm` | CSR | CSR |

Start- und Build-Befehle sind unverändert (`npm run dev`, `npm run build`).

## Arbeitsweise

- `main` enthält nur reviewte Stände.
- Jede Änderung erfolgt auf einem eigenen Branch (`feat/…`, `docs/…`) und wird per Pull Request gemerged.
