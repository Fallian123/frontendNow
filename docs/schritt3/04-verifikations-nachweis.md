# 04 – Verifikations-Nachweis

## Methode

- Produktions-Build (`npm run build`, `npm run preview`) auf localhost:4173, Chrome unter macOS, private Fenster.
- Offline-Test mit Chrome DevTools → Network → „Offline“ und Filter auf vom Service Worker beantwortete Anfragen.
- Cache-Inhalt über Application → Cache Storage, Installierbarkeit über Application → Manifest.

## Zuordnung der Nachweise zu den Szenarien

| Szenario | Nachweis |
|---|---|
| 1 Programm offline | assets/s1-offline-uebersicht.png, s1-cache-storage.png, s1-lazy-chunks-offline.png |
| 2 Mein Programm offline | assets/s2-mein-programm-offline.png, s2-local-storage.png |
| 3 Erstbesuch offline | assets/s3-fehlerseite.png, s3-keine-registrierung.png |
| Installierbarkeit | assets/e-manifest.png, assets/e-manifest-icons.png |

## Einordnung

Getestet wurde der Produktions-Build (npm run build, npm run preview) auf localhost:4173 in Chrome unter macOS, die Szenarien aus Dokument 03 wurden in einem privaten Fenster durchgeführt. Mit dem Network-Tab im Offline-Modus wurde geprüft, welche Anfragen der Service Worker beantwortet, der Cache Storage zeigte 18 vorab gecachte Dateien, darunter den Daten-Chunk und die Chunks der lazy geladenen Views. Jedem Szenario aus Dokument 03 sind Screenshots im Ordner assets zugeordnet, wodurch die Beobachtungen nachvollziehbar belegt sind. Das Manifest-Panel zeigt Name, start_url, display, Farben und Icons wie konfiguriert, die Installierbarkeitsprüfung war im privaten Fenster jedoch nicht möglich, da das Panel dort eine Meldung zum Inkognito-Fenster ausgibt, weshalb die Installierbarkeit nicht belegt ist. Die Tests zeigen, dass die in Dokument 02 beschriebenen Regeln im Build umgesetzt sind. Lücken bestehen beim Erstbesuch ohne Netz, bei einer nicht erklärten Beobachtung im normalen Profil nach einem Update sowie bei der Abdeckung, da nur Chrome auf einem Rechner getestet wurde und eine zweite Person fehlte. Ein Chunk-Mismatch nach einem Deployment wurde nicht getestet.