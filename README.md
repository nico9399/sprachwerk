# Sprachwerk

Eigene App zum Sprachenlernen – zuerst Englisch. Läuft im Browser (iPhone: Safari → Teilen → Zum Home-Bildschirm), offline nutzbar.

- Einstufungstest (A1–C1, 5 von 15 Fragen je Stufe zufällig), danach Schnellcheck für bekannte Stufen
- Lernpfad mit 45 Einheiten (A1–C1), 3.523 Wörter: Grammatik, Wörter, Einheitentest
- 61 Grammatik-Lektionen (973 Übungen), Übersicht unter Pfad → Alle Grammatik-Lektionen
- 7 Themenpakete (391 Wörter, davon 257 neu), frei zuschaltbar unter Pfad → Themenpakete
- 45 Lesetexte (1 je Einheit) mit Antipp-Übersetzung, Vorlesen und Verständnisfragen
- Fehlertrainer „Typisch deutsch“: 10 Lektionen, 130 Übungen (falsche Freunde, seit/since, Satzstellung, make/do …), unter Pfad → Fehlertrainer
- Aussprache-Trainer: 8 Lektionen (th, w/v, ship/sheep, bed/bad, Endlaute, j/y, Wortbetonung) mit Hör-Unterscheidung und Nachsprechen
- Schreibwerkstatt: 20 Schreibaufgaben (A1–C1) mit Bausteinen, Musterlösung und Checkliste (teils automatisch erkannt)
- 135 Dialoge (3 je Einheit) mit Hörverständnis, Diktat und Satz-Übersetzung
- Vokabeltrainer mit Lernfächern, Sprechübungen (abschaltbar), Fehler melden
- Übungen: Bedeutung wählen, Hören, Schreiben, Sätze bauen
- Aussprache über die Sprachausgabe des Geräts
- Alle Daten bleiben auf dem Gerät (localStorage), Sicherung als JSON-Datei

Inhalte: `data/en.js` (Einheiten + Wörter), `data/en-grammar.js` (Grammatik), `data/en-dialogs.js` (Dialoge), `data/en-packs.js` (Themenpakete), `data/en-reading.js` (Lesetexte + Mini-Wörterbuch), `data/en-mistakes.js` (Fehlertrainer), `data/en-sounds.js` (Aussprache), `data/en-writing.js` (Schreibwerkstatt).
Schrift: Bricolage Grotesque (SIL Open Font License).
