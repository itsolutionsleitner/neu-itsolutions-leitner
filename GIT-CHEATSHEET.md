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
git revert HEAD
```

---

## D) WICHTIGE HINWEISE

- Die `warning: LF will be replaced by CRLF` Meldungen sind **kein Fehler** — einfach ignorieren, das ist normal auf Windows.
- `git push -u origin main` nur beim **ersten Mal** nötig — danach reicht `git push`.
- Vercel braucht ca. **30–60 Sekunden** nach dem Push bis die Seite live aktualisiert ist.
- Den GitHub-Link immer von GitHub kopieren (grüner "Code"-Button → HTTPS) — nie den Platzhalter-Link verwenden.

## GIT aufwecken
git commit --allow-empty -m "Trigger Vercel deploy"
git push
