# GIT CHEATSHEET — Erstmaliges Setup & Änderungen hochladen

---

## A) ERSTMALIGES SETUP (einmalig pro neuem Projekt)

```bash
# 1. In den Projektordner navigieren
cd pfad/zu/deinem/projektordner
# Beispiel: cd C:/Users/Christoph/neuburger-metalltechnik

# 2. Git initialisieren
git init

# 3. Mit GitHub-Repository verbinden
# (Link von GitHub: grüner "Code"-Button → HTTPS kopieren)
git remote add origin https://github.com/itsolutionsleitner/DEIN-REPO-NAME.git

# 4. Alles hochladen (nur beim allerersten Mal)
git add .
git commit -m "v1.0 Projektname Initial Commit"
git branch -M main
git push -u origin main
```

→ Danach auf Vercel: Repository importieren → Framework "Other" → Deploy.
→ Ab jetzt deployed Vercel automatisch bei jedem Push.

---

## B) ÄNDERUNGEN HOCHLADEN (ab dem zweiten Mal, immer gleich)

```bash
git add .
git commit -m "Kurze Beschreibung was geändert wurde"
git push
```

**Beispiele für Commit-Nachrichten:**
```bash
git commit -m "Footer Telefonnummer aktualisiert"
git commit -m "FAQ Sektion auf Startseite ergänzt"
git commit -m "Neue Leistung hinzugefügt"
git commit -m "Kontaktformular Formspree eingebunden"
git commit -m "v1.1 Farbanpassung Buttons"
```

---

## C) FALLS ETWAS SCHIEFLÄUFT

**Falschen Remote-Link korrigieren:**
```bash
git remote remove origin
git remote add origin https://github.com/itsolutionsleitner/DEIN-REPO-NAME.git
git push -u origin main
```

**Aktuellen Status prüfen (welche Dateien wurden geändert?):**
```bash
git status
```

**Letzten Commit rückgängig machen (falls nötig):**
```bash
git revert HEAD --no-edit

git push
```

---

## D) WICHTIGE HINWEISE

- Die `warning: LF will be replaced by CRLF` Meldungen sind **kein Fehler** — einfach ignorieren, das ist normal auf Windows.
- `git push -u origin main` nur beim **ersten Mal** nötig — danach reicht `git push`.
- Vercel braucht ca. **30–60 Sekunden** nach dem Push bis die Seite live aktualisiert ist.
- Den GitHub-Link immer von GitHub kopieren (grüner "Code"-Button → HTTPS) — nie den Platzhalter-Link verwenden.

### Empfohlen: `.gitignore` gleich zu Beginn anlegen

Diese Datei verhindert, dass lokale Editor- oder Betriebssystem-Dateien versehentlich auf GitHub landen. Im Projekt-Ordner eine Datei namens `.gitignore` anlegen und Folgendes eintragen:

```gitignore
# Lokale Editor-Einstellungen
.vscode/

# Betriebssystem-Dateien
.DS_Store
Thumbs.db

# Lokale Umgebungsvariablen / Zugangsdaten
.env
.env.*
!.env.example
```

⚠️ Zugangsdaten, API-Keys, Formspree-Keys oder Passwörter niemals in `index.html`, `script.js` oder in einen Git-Commit schreiben. Alles, was im Frontend steht, kann von Besuchern eingesehen werden.

## GIT aufwecken
```bash

git commit --allow-empty -m "Trigger Vercel deploy"
git push
```

## Cookies zurücksetzen
```javascript
localStorage.removeItem("cookieConsent");
location.reload();
```

## C) Git Verbindung

## Git Verbindung überprüfen
```bash

git remote -v

```

## Letzte Gitänderung abfragen
```bash

git log -1 --oneline

```

## Git Verbindung ändern
```bash

git remote set-url origin https://github.com/itsolutionsleitner/NEUES-REPOSITORY.git

```



## D) Git ersetzten einer kompletten Webseite mit bestehenden Git Repository

## Git Klonen
```bash

git clone https://github.com/itsolutionsleitner/DEIN-REPO.git
```

Dann ersetzt du im geklonten Ordner die alten Dateien durch die neuen und machst:
```bash
git add .
git commit -m "Neue Website-Version"
git push
```

**Wichtig bei einer bestehenden Website:** Den geklonten `.git`-Ordner nicht löschen. Er enthält die Verbindung zum Repository und die komplette Versionsgeschichte. Nur die eigentlichen Website-Dateien ersetzen.

---

## E) NÜTZLICHE SICHERHEITSBEFEHLE

**Vor dem Hochladen prüfen, was tatsächlich übertragen wird:**
```bash
git status
git diff
```

**Letzten Stand von GitHub holen, bevor auf zwei Geräten gearbeitet wird:**
```bash
git pull
```

Wenn `git pull` einen Konflikt meldet: Nicht wahllos Dateien löschen oder überschreiben. Zuerst den Konflikt klären bzw. die betroffene Datei prüfen.
