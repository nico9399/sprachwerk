// Sprachwerk – Aussprache-Trainer Englisch
// pairs: [Wort A, Deutsch A, Wort B, Deutsch B]  say: [Wort, Deutsch]  stress: [Wort, [Silben], betonte Silbe (Index), Deutsch]
window.SW_SOUNDS = window.SW_SOUNDS || {};
window.SW_SOUNDS.en = [
{ id: "th-hard", title: "„th“ wie in think", emoji: "👅", sum: "Stimmloses th – nicht s, nicht f, nicht t.",
  tip: [
    ["So geht's", "Zungenspitze <b>leicht zwischen die Zähne</b> legen und Luft vorbeiblasen – wie ein leises Zischen, aber mit der Zunge vorne. Kein „s“ wie in <i>sink</i>, kein „t“ wie in <i>tank</i>."],
    ["Typischer Fehler", "Deutsche sagen oft <i>„I sink so“</i> statt <b>I think so</b> – dann versteht man „Ich sinke so“."]],
  pairs: [
    ["think", "denken", "sink", "sinken"], ["thank", "danken", "tank", "Tank"], ["three", "drei", "tree", "Baum"],
    ["mouth", "Mund", "mouse", "Maus"], ["thin", "dünn", "tin", "Dose"], ["path", "Weg", "pass", "Pass"],
    ["thought", "Gedanke", "taught", "gelehrt"], ["faith", "Glaube", "face", "Gesicht"], ["thick", "dick", "sick", "krank"]],
  say: [["think", "denken"], ["three", "drei"], ["thank you", "danke"], ["Thursday", "Donnerstag"], ["health", "Gesundheit"], ["month", "Monat"], ["nothing", "nichts"], ["birthday", "Geburtstag"]],
  twister: ["I think three thin thieves thought a thousand thoughts.", "Ich glaube, drei dünne Diebe dachten tausend Gedanken."] },
{ id: "th-soft", title: "„th“ wie in this", emoji: "🗣️", sum: "Stimmhaftes th – nicht d und nicht z.",
  tip: [
    ["So geht's", "Gleiche Zungenposition wie bei <i>think</i>, aber jetzt <b>mit Stimme</b> – es summt leicht. Kommt in ganz häufigen Wörtern vor: <b>the, this, that, they, there, with, mother</b>."],
    ["Typischer Fehler", "<i>„Ze“</i> oder <i>„de“</i> statt <b>the</b>. Kleine Wörter zählen hier am meisten, weil sie ständig vorkommen."]],
  pairs: [
    ["they", "sie", "day", "Tag"], ["then", "dann", "den", "Höhle"], ["though", "obwohl", "dough", "Teig"],
    ["breathe", "atmen", "breed", "züchten"], ["those", "jene", "doze", "dösen"], ["there", "dort", "dare", "wagen"], ["worthy", "würdig", "wordy", "wortreich"]],
  say: [["the", "der/die/das"], ["this", "dies"], ["mother", "Mutter"], ["weather", "Wetter"], ["together", "zusammen"], ["clothes", "Kleidung"], ["although", "obwohl"], ["with them", "mit ihnen"]],
  twister: ["This is the thing they brought with them.", "Das ist das Ding, das sie mitgebracht haben."] },
{ id: "w-v", title: "w oder v?", emoji: "🌬️", sum: "Englisches w ist kein deutsches w.",
  tip: [
    ["So geht's", "<b>w</b>: Lippen rund machen wie bei „u“ – die Zähne berühren die Lippe <b>nicht</b>. Wie ein kurzes „u-e“: <i>west</i> ≈ „u-est“.<br><b>v</b>: Oberzähne auf die Unterlippe – wie das deutsche w."],
    ["Typischer Fehler", "Deutsche sagen <i>„vine“</i> für <b>wine</b> und manchmal aus Übereifer <i>„wery“</i> für <b>very</b>."]],
  pairs: [
    ["west", "Westen", "vest", "Weste"], ["wine", "Wein", "vine", "Weinrebe"], ["wet", "nass", "vet", "Tierarzt"],
    ["worse", "schlechter", "verse", "Vers"], ["wheel", "Rad", "veal", "Kalbfleisch"], ["wiper", "Scheibenwischer", "viper", "Viper"], ["wail", "jammern", "veil", "Schleier"]],
  say: [["water", "Wasser"], ["work", "Arbeit"], ["very well", "sehr gut"], ["Wednesday", "Mittwoch"], ["window", "Fenster"], ["video", "Video"], ["we were", "wir waren"], ["view", "Aussicht"]],
  twister: ["We went west in a very wet van.", "Wir fuhren in einem sehr nassen Transporter nach Westen."] },
{ id: "i-ee", title: "ship oder sheep?", emoji: "🐑", sum: "Kurzes i und langes ee unterscheiden.",
  tip: [
    ["So geht's", "<b>i</b> (ship, sit, live) ist <b>kurz und locker</b>, fast wie ein kurzes deutsches „i“ in <i>bitte</i>.<br><b>ee/ea</b> (sheep, seat, leave) ist <b>lang und gespannt</b>, wie in <i>Biene</i> – Mundwinkel leicht breit ziehen."],
    ["Warum wichtig?", "<i>I live here</i> = Ich wohne hier.<br><i>I leave here</i> = Ich gehe hier weg."]],
  pairs: [
    ["ship", "Schiff", "sheep", "Schaf"], ["live", "leben", "leave", "verlassen"], ["sit", "sitzen", "seat", "Sitz"],
    ["fill", "füllen", "feel", "fühlen"], ["bit", "Stück", "beat", "schlagen"], ["chip", "Chip", "cheap", "billig"],
    ["still", "noch", "steal", "stehlen"], ["hit", "schlagen", "heat", "Hitze"], ["fit", "fit", "feet", "Füße"]],
  say: [["live", "leben"], ["leave", "verlassen"], ["cheap", "billig"], ["big", "groß"], ["green", "grün"], ["sleep", "schlafen"], ["fish", "Fisch"], ["meeting", "Besprechung"]],
  twister: ["Please sit in this seat and keep the ship clean.", "Bitte setz dich auf diesen Sitz und halte das Schiff sauber."] },
{ id: "e-ae", title: "bed oder bad?", emoji: "🛏️", sum: "Das offene „ä“ (æ) – für Deutsche oft schwer.",
  tip: [
    ["So geht's", "<b>e</b> (bed, men, pen) wie das deutsche „e“ in <i>Bett</i>.<br><b>a</b> (bad, man, pan) = <b>æ</b>: Mund weit öffnen, Kiefer runter – zwischen „ä“ und „a“, etwas „gequetscht“."],
    ["Warum wichtig?", "<i>men</i> = Männer, <i>man</i> = Mann. <i>I said</i> vs. <i>I'm sad</i>."]],
  pairs: [
    ["bed", "Bett", "bad", "schlecht"], ["men", "Männer", "man", "Mann"], ["pen", "Stift", "pan", "Pfanne"],
    ["said", "sagte", "sad", "traurig"], ["bet", "wetten", "bat", "Fledermaus"], ["send", "senden", "sand", "Sand"], ["beg", "betteln", "bag", "Tasche"], ["head", "Kopf", "had", "hatte"]],
  say: [["man", "Mann"], ["men", "Männer"], ["black", "schwarz"], ["happy", "glücklich"], ["bad", "schlecht"], ["bed", "Bett"], ["map", "Karte"], ["cat", "Katze"]],
  twister: ["The bad man had a black bag.", "Der böse Mann hatte eine schwarze Tasche."] },
{ id: "endings", title: "Endlaute: bag oder back?", emoji: "🔚", sum: "Im Englischen bleiben b, d, g, z am Wortende weich.",
  tip: [
    ["Das deutsche Problem", "Im Deutschen wird am Wortende hart: <i>Hund</i> klingt wie „Hunt“. Im Englischen <b>nicht</b>: <b>dog</b> ≠ <b>dock</b>, <b>bag</b> ≠ <b>back</b>."],
    ["So geht's", "Den Vokal davor <b>etwas länger</b> sprechen und den Endlaut weich lassen: <i>ba-ag</i>, <i>do-og</i>. Bei <b>eyes</b> summt das z am Ende."]],
  pairs: [
    ["bag", "Tasche", "back", "zurück"], ["dog", "Hund", "dock", "Dock"], ["eyes", "Augen", "ice", "Eis"],
    ["prize", "Preis (Gewinn)", "price", "Preis (Kosten)"], ["had", "hatte", "hat", "Hut"], ["cab", "Taxi", "cap", "Mütze"],
    ["rise", "steigen", "rice", "Reis"], ["peas", "Erbsen", "peace", "Frieden"], ["leave", "verlassen", "leaf", "Blatt"]],
  say: [["dog", "Hund"], ["bag", "Tasche"], ["eyes", "Augen"], ["good", "gut"], ["is", "ist"], ["was", "war"], ["friend", "Freund"], ["job", "Job"]],
  twister: ["His dog had a big bag of peas.", "Sein Hund hatte eine große Tüte Erbsen."] },
{ id: "j-y", title: "j oder y?", emoji: "🧃", sum: "Englisches j ist „dsch“, englisches y ist das deutsche j.",
  tip: [
    ["So geht's", "<b>j</b> wie in <i>job, juice</i> = <b>„dsch“</b> (wie in <i>Dschungel</i>).<br><b>y</b> wie in <i>yes, year</i> = das deutsche <b>j</b> in <i>ja</i>."],
    ["Typischer Fehler", "<i>„Yob“</i> statt <b>job</b> oder <i>„Dschess“</i> statt <b>yes</b>."]],
  pairs: [
    ["jet", "Düsenjet", "yet", "noch"], ["jam", "Marmelade", "yam", "Süßkartoffel"], ["jello", "Wackelpudding", "yellow", "gelb"],
    ["jeer", "verhöhnen", "year", "Jahr"], ["Jess", "Jess (Name)", "yes", "ja"], ["joke", "Witz", "yolk", "Eigelb"]],
  say: [["job", "Job"], ["yes", "ja"], ["just", "nur, gerade"], ["year", "Jahr"], ["juice", "Saft"], ["yesterday", "gestern"], ["January", "Januar"], ["young", "jung"]],
  twister: ["Yes, Jack just got a new job this year.", "Ja, Jack hat dieses Jahr gerade einen neuen Job bekommen."] },
{ id: "stress", title: "Wortbetonung", emoji: "🎯", sum: "Die falsche Silbe betont – und keiner versteht's.",
  tip: [
    ["Warum wichtig?", "Englisch betont oft anders als Deutsch: <b>HO</b>tel (Deutsch) → ho<b>TEL</b> (Englisch). Falsch betonte Wörter werden schlechter verstanden als ein falscher Laut."],
    ["Faustregeln", "Viele zweisilbige Nomen vorne: <b>TA</b>ble, <b>WIN</b>dow.<br>Viele zweisilbige Verben hinten: de<b>CIDE</b>, re<b>LAX</b>.<br>Wörter auf -tion, -ic, -ity: Silbe davor: infor<b>MA</b>tion, e<b>CO</b>nomic, uni<b>VER</b>sity."]],
  stress: [
    ["hotel", ["ho", "tel"], 1, "Hotel"], ["photograph", ["pho", "to", "graph"], 0, "Foto"], ["photographer", ["pho", "to", "gra", "pher"], 1, "Fotograf"],
    ["comfortable", ["com", "for", "ta", "ble"], 0, "bequem"], ["vegetable", ["ve", "ge", "ta", "ble"], 0, "Gemüse"], ["interesting", ["in", "te", "res", "ting"], 0, "interessant"],
    ["important", ["im", "por", "tant"], 1, "wichtig"], ["develop", ["de", "ve", "lop"], 1, "entwickeln"], ["technology", ["tech", "no", "lo", "gy"], 1, "Technologie"],
    ["engineer", ["en", "gi", "neer"], 2, "Ingenieur"], ["chocolate", ["cho", "co", "late"], 0, "Schokolade"], ["police", ["po", "lice"], 1, "Polizei"],
    ["information", ["in", "for", "ma", "tion"], 2, "Information"], ["economy", ["e", "co", "no", "my"], 1, "Wirtschaft"], ["university", ["u", "ni", "ver", "si", "ty"], 2, "Universität"],
    ["decide", ["de", "cide"], 1, "entscheiden"], ["computer", ["com", "pu", "ter"], 1, "Computer"], ["necessary", ["ne", "ces", "sa", "ry"], 0, "nötig"],
    ["hospital", ["hos", "pi", "tal"], 0, "Krankenhaus"], ["mechanic", ["me", "cha", "nic"], 1, "Mechaniker"]] }
];
