# FinanzMentor ( https://nimble-dieffenbachia-77cd4d.netlify.app/ )

**FinanzMentor** ist eine Web-App zur Verwaltung persönlicher Finanzen. Die App ermöglicht es Nutzern, ihren Kontostand zu aktualisieren, Budgets zu setzen, den Fortschritt zu verfolgen und aktuelle Aktienkurse abzurufen. Alle Finanzdaten werden übersichtlich mit Diagrammen dargestellt, um die Entwicklung der Finanzen einfach nachvollziehbar zu machen.


## Funktionen

- **Kontostands-Verwaltung**: Nutzer können ihren Kontostand durch Hinzufügen oder Entfernen von Beträgen aktualisieren.
- **Graphische Darstellung mit Chart.js**: Alle Änderungen im Kontostand werden mit Chart.js als Diagramm visualisiert, um die Finanzentwicklung zu zeigen.
- **Budget-Erstellung und -Verwaltung**: Benutzer können Budgets für spezifische Zwecke festlegen und ihren Fortschritt in einer Fortschrittsleiste überwachen, die anzeigt, wie viel Zeit bis zur Erreichung des Ziels verbleibt.
- **Aktienkurs-Updates**: Durch die Fetch API werden aktuelle Aktienkurse abgerufen und angezeigt.
- **Modernes UI mit React und Bootstrap**: Die Benutzeroberfläche wurde mit React und Bootstrap gestaltet, um eine saubere und responsive Benutzererfahrung zu bieten.

## Technologien im Einsatz

- **React**: Die Grundstruktur und die Benutzeroberfläche wurden in React umgesetzt.
- **Bootstrap**: Bootstrap sorgt für ein ansprechendes und responsives Layout.
- **Chart.js**: Die Finanzdaten und der Fortschritt bei Budgets werden mithilfe von Chart.js visualisiert.
- **Fetch API**: Zur Anzeige von Echtzeit-Aktienkursen wird die Fetch API genutzt.
- **Canva**: Das Logo der App wurde mit Canva erstellt.

## Herausforderungen

Während der Entwicklung von FinanzMentor gab es einige Herausforderungen:
- **Finanzlogik**: Die Implementierung der Finanzlogik erforderte Einarbeitung, da dies das erste Finanzprojekt war.
- **Chart.js-Integration**: Die Einbindung und Konfiguration von Chart.js war anfangs anspruchsvoll, da die Bibliothek neu war.
- **Projektstruktur und Funktionen**: Dank ChatGPT konnten die Graphen und die Budgetfortschrittsanzeige effizienter implementiert werden.

## Installation und Verwendung

1. **Repository klonen**:
   ```bash
   git clone https://github.com/dominicBurfeind/FinanzMentor.git
   cd FinanzMentor
2. **Abhängigkeiten installieren:**
   npm install
3. **App starten**:
   npm start
   Die App wird lokal auf http://localhost:3000 verfügbar sein.
4. **Live-Version**:
    FinanzMentor ist auf Netlify gehostet und kann hier aufgerufen werden.


## Dateistruktur

```plaintext
FinanzMentor/
├── public/
│   └── logo.png          # App-Logo erstellt mit Canva
├── src/
│   ├── components/       # Enthält React-Komponenten
│   ├── services/         # Fetch-API für Aktienkurse
│   ├── App.js            # Hauptkomponente der Anwendung
│   └── index.js          # Einstiegspunkt der App
└── README.md

Geplante Verbesserungen

**Intuitiveres UI** : Das Benutzerinterface soll benutzerfreundlicher und einfacher zu bedienen werden.
**Verbesserung der Funktionen**: Optimierung und Erweiterung bestehender Funktionen, um eine noch bessere Nutzererfahrung zu bieten.
**Animationen hinzufügen**: Einführung von Animationen für eine dynamischere und ansprechendere Benutzeroberfläche.
**Login-Funktion**: Implementierung einer Benutzeranmeldung, um personalisierte Funktionen und Daten zu ermöglichen.
