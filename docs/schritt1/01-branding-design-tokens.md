# 01 – Branding-Konzept & Design Tokens

## 1. Markenkonzept „Linie F“

**Teamname / Plattform:** Linie F

**Positionierung:** Linie F versteht die Konferenz FrontendNow als Liniennetz, in welchem jeder Track eine eigene Linie und jede Session eine Station ist. Besucher:innen stellen sich über „Mein Programm“ ihre persönliche Route durch die zwei Konferenztage zusammen, wodurch die Plattform eher wie ein Fahrplan als wie eine klassische Konferenz-Website funktioniert. Grundsätzlich steht dabei Orientierung im Vordergrund: Wer gerade wo ist und was als Nächstes kommt, soll auf einen Blick erkennbar sein.

Das zentrale gestalterische Element ist daher die **Linie**: Jeder Track erhält eine eigene Linienfarbe, welche durchgängig an Session-Karten, Badges und in der Programmübersicht verwendet wird. Ergänzt wird dies durch einen hellen, papierähnlichen Hintergrund und eine dunkle, gut lesbare Schrift, wie man sie von gedruckten Fahrplänen kennt.

## 2. Design-Tokens-Set

Die Tokens liegen als CSS Custom Properties in `/tokens/tokens.css` und werden in `src/main.ts` global eingebunden.

### 2.1 Farbpalette und Kontrastprüfung

Für Fließtext fordert WCAG 2.1 (Kriterium 1.4.3, Contrast Minimum) auf Stufe AA ein Kontrastverhältnis von mindestens 4,5 : 1. Alle unten angeführten Text/Hintergrund-Paare erfüllen diesen Wert. Die Verhältnisse wurden nach der WCAG-Formel berechnet und mit dem WebAIM Contrast Checker gegengeprüft.

| Verwendung (semantischer Token) | Vordergrund | Hintergrund | Kontrast  | AA |
| :--- | :--- | :--- |:----------| :--- |
| Fließtext (`color-text-primary` auf `color-surface`) | `#1F2328` | `#F7F3EA` | 14,26 : 1 | ✅ |
| Sekundärtext (`color-text-secondary` auf `color-surface`) | `#5C6370` | `#F7F3EA` | 5,45 : 1  | ✅ |
| Link / Akzent (`color-link` auf `color-surface`) | `#B3122E` | `#F7F3EA` | 6,23 : 1  | ✅ |
| Button-Text (`color-text-on-accent` auf `color-accent`) | `#FFFFFF` | `#B3122E` | 6,90 : 1  | ✅ |
| Hover (`color-text-on-accent` auf `color-accent-hover`) | `#FFFFFF` | `#8E0E24` | 9,38 : 1  | ✅ |
| Track Frontend Architecture (Weiß auf Linie) | `#FFFFFF` | `#6B3FA0` | 7,38 : 1  | ✅ |
| Track Rendering & Performance (Weiß auf Linie) | `#FFFFFF` | `#B5440F` | 5,52 : 1  | ✅ |
| Track AI & DX (Weiß auf Linie) | `#FFFFFF` | `#1E7346` | 5,83 : 1  | ✅ |
| Track Design Systems (Weiß auf Linie) | `#FFFFFF` | `#1F5FAD` | 6,36 : 1  | ✅ |

Alle Linienfarben erreichen auch direkt auf dem Papier-Hintergrund mindestens 4,99 : 1 und können somit ebenfalls als Textfarbe verwendet werden. Die Farbe `sand-300` (`#D8CFBE`) erreicht auf dem Papier-Hintergrund nur 1,39 : 1 und ist daher ausschließlich für dekorative Trennlinien vorgesehen. Für Rahmen von Bedienelementen wird `color-border-strong` verwendet, welcher die für Nicht-Text-Elemente geforderten 3 : 1 (WCAG 1.4.11) deutlich übertrifft.

### 2.2 Spacing-Skala

Die Abstände basieren auf einem 4px-Raster (`space-xs` 4px bis `space-3xl` 64px). Ein festes Raster sorgt für gleichmäßige Abstände, ohne dass bei jeder Komponente neu über Pixelwerte entschieden werden muss.

### 2.3 Typografie-Skala

Die Schriftgrößen folgen einer Modular Scale mit Faktor 1,25 (Major Third) ausgehend von 16px: 12,8 / 16 / 20 / 25 / 31,25 / 39px. Als Schrift wird der System-Font-Stack verwendet, da dieser ohne zusätzliche Ladezeit auskommt und auf jedem Gerät gut lesbar ist.

## 3. Begründung der Token-Architektur

Die Tokens sind in zwei Ebenen aufgebaut. **Primitive Tokens** (`--primitive-color-red-700`) enthalten ausschließlich Rohwerte ohne Verwendungszweck. **Semantische Tokens** (`--color-accent`, `--color-surface`) beschreiben den Zweck und verweisen auf einen primitiven Wert. Komponenten verwenden ausschließlich die semantische Ebene. Diese Trennung wurde aus folgenden Gründen gewählt:

1. **Theming-Erweiterbarkeit:** Ein späterer Dark Mode überschreibt unter `[data-theme='dark']` nur die semantischen Tokens. Weder die primitiven Werte noch die Komponenten müssen dafür angepasst werden, wodurch kein Strukturbruch entsteht. Die Stelle dafür ist in `tokens.css` bereits vorgesehen, aber noch nicht befüllt.
2. **Wartbarkeit:** Soll beispielsweise der Akzent dunkler werden, wird nur eine Zuordnung geändert. Weiters ist an jedem Token-Namen ablesbar, wofür er gedacht ist, was die Einarbeitung erleichtert.
3. **Konsistenz:** Da Komponenten keine Rohwerte kennen, können keine „fast gleichen“ Farben oder Abstände entstehen. Die Track-Farben sind direkt nach den `trackId`-Werten aus `conference-data.json` benannt, womit die Zuordnung Daten zu Darstellung eindeutig ist.
4. **Barrierefreiheit:** Die Kontrastprüfung erfolgt einmalig auf Ebene der semantischen Paare. Solange Komponenten diese Paare verwenden, bleiben die AA-Werte automatisch eingehalten.

## Quellen

- W3C (2023). *Understanding Success Criterion 1.4.3: Contrast (Minimum).* https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- W3C (2023). *Understanding Success Criterion 1.4.11: Non-text Contrast.* https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- WebAIM (o. J.). *Contrast Checker.* https://webaim.org/resources/contrastchecker/
