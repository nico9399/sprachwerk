// Sprachwerk – Dialoge Englisch (einer je Einheit)
// lines: [Sprecher, Englisch, Deutsch]   questions: [Frage, richtige Antwort, [falsche Antworten]]
window.SW_DIALOGS = window.SW_DIALOGS || {};
window.SW_DIALOGS.en = {
u01: { title: "Neu im Team", people: ["Tom", "Lisa"], lines: [
  ["Tom", "Hi, I'm Tom. Are you new here?", "Hi, ich bin Tom. Bist du neu hier?"],
  ["Lisa", "Yes, I am. My name is Lisa. Nice to meet you.", "Ja. Ich heiße Lisa. Schön, dich kennenzulernen."],
  ["Tom", "Nice to meet you too. Where are you from?", "Freut mich auch. Woher kommst du?"],
  ["Lisa", "I'm from Germany, from a small town near Frankfurt.", "Ich komme aus Deutschland, aus einer kleinen Stadt bei Frankfurt."],
  ["Tom", "Oh, cool. I'm from Manchester. How are you today?", "Oh, cool. Ich bin aus Manchester. Wie geht's dir heute?"],
  ["Lisa", "I'm fine, thanks. A bit nervous!", "Gut, danke. Ein bisschen nervös!"]],
  questions: [
  ["Woher kommt Lisa?", "Aus Deutschland", ["Aus Manchester", "Aus Frankfurt-Stadt", "Aus London"]],
  ["Woher kommt Tom?", "Aus Manchester", ["Aus Deutschland", "Aus London", "Aus Irland"]],
  ["Wie fühlt sich Lisa?", "Gut, aber etwas nervös", ["Müde", "Krank", "Sehr entspannt"]]] },

u02: { title: "Familienfotos", people: ["Emma", "Ben"], lines: [
  ["Emma", "Is that a photo of your family?", "Ist das ein Foto von deiner Familie?"],
  ["Ben", "Yes. That's my mother, and that's my father next to her.", "Ja. Das ist meine Mutter und daneben mein Vater."],
  ["Emma", "And who is the girl?", "Und wer ist das Mädchen?"],
  ["Ben", "That's my sister Mia. She's sixteen.", "Das ist meine Schwester Mia. Sie ist sechzehn."],
  ["Emma", "Do you have any brothers?", "Hast du Brüder?"],
  ["Ben", "No, just one sister. But I have lots of cousins!", "Nein, nur eine Schwester. Aber ich habe viele Cousins!"]],
  questions: [
  ["Wie heißt Bens Schwester?", "Mia", ["Emma", "Lisa", "Anna"]],
  ["Wie alt ist sie?", "Sechzehn", ["Sechs", "Sechzig", "Zwölf"]],
  ["Wie viele Brüder hat Ben?", "Keinen", ["Einen", "Zwei", "Drei"]]] },

u03: { title: "Fundsachen", people: ["Mann", "Frau"], lines: [
  ["Mann", "Excuse me, is this your bag?", "Entschuldigung, ist das Ihre Tasche?"],
  ["Frau", "No, my bag is black. That one is blue.", "Nein, meine Tasche ist schwarz. Die da ist blau."],
  ["Mann", "Oh, sorry. And is that your phone on the table?", "Oh, Entschuldigung. Und ist das Ihr Handy auf dem Tisch?"],
  ["Frau", "Yes, it is! Thank you. And my keys?", "Ja! Danke. Und meine Schlüssel?"],
  ["Mann", "Two keys? Here they are, under the chair.", "Zwei Schlüssel? Hier sind sie, unter dem Stuhl."]],
  questions: [
  ["Welche Farbe hat die Tasche der Frau?", "Schwarz", ["Blau", "Rot", "Weiß"]],
  ["Wo liegt das Handy?", "Auf dem Tisch", ["Unter dem Stuhl", "In der Tasche", "Auf dem Boden"]],
  ["Wo sind die Schlüssel?", "Unter dem Stuhl", ["Auf dem Tisch", "In der Jacke", "Im Auto"]]] },

u04: { title: "Wohnungsbesichtigung", people: ["Vermieter", "Nico"], lines: [
  ["Vermieter", "So, this is the flat. There's a big living room here.", "So, das ist die Wohnung. Hier ist ein großes Wohnzimmer."],
  ["Nico", "It's nice. Is there a balcony?", "Schön. Gibt es einen Balkon?"],
  ["Vermieter", "Yes, there is. And there are two bedrooms.", "Ja. Und es gibt zwei Schlafzimmer."],
  ["Nico", "Great. How much is the rent?", "Super. Wie hoch ist die Miete?"],
  ["Vermieter", "It's 750 euros a month, with heating.", "750 Euro im Monat, mit Heizung."],
  ["Nico", "Is there a washing machine?", "Gibt es eine Waschmaschine?"],
  ["Vermieter", "Not in the flat, but there's one in the cellar.", "Nicht in der Wohnung, aber eine im Keller."]],
  questions: [
  ["Wie viele Schlafzimmer hat die Wohnung?", "Zwei", ["Eins", "Drei", "Keins"]],
  ["Wie hoch ist die Miete?", "750 € mit Heizung", ["570 €", "750 € ohne Heizung", "850 €"]],
  ["Wo ist die Waschmaschine?", "Im Keller", ["In der Küche", "Im Bad", "Es gibt keine"]]] },

u05: { title: "Ein normaler Tag", people: ["Sarah", "Mark"], lines: [
  ["Sarah", "What time do you get up?", "Wann stehst du auf?"],
  ["Mark", "At half past four. My shift starts at six.", "Um halb fünf. Meine Schicht beginnt um sechs."],
  ["Sarah", "Wow, that's early! When do you finish?", "Wow, früh! Wann hast du Feierabend?"],
  ["Mark", "At two. Then I go home and have lunch.", "Um zwei. Dann fahre ich heim und esse zu Mittag."],
  ["Sarah", "And in the evening?", "Und abends?"],
  ["Mark", "I usually watch TV and go to bed at nine.", "Meistens schaue ich fern und gehe um neun ins Bett."]],
  questions: [
  ["Wann steht Mark auf?", "Um halb fünf", ["Um sechs", "Um fünf", "Um halb sechs"]],
  ["Wann hat er Feierabend?", "Um zwei", ["Um sechs", "Um neun", "Um zwölf"]],
  ["Was macht er meistens abends?", "Fernsehen", ["Sport", "Kochen", "Lesen"]]] },

u06: { title: "Im Restaurant", people: ["Kellner", "Gast"], lines: [
  ["Kellner", "Good evening. Are you ready to order?", "Guten Abend. Möchten Sie bestellen?"],
  ["Gast", "Yes. Do you have any vegetarian dishes?", "Ja. Haben Sie vegetarische Gerichte?"],
  ["Kellner", "Yes, we have a vegetable curry. It's a bit spicy.", "Ja, ein Gemüsecurry. Es ist etwas scharf."],
  ["Gast", "Perfect, I'll have the curry with rice.", "Perfekt, ich nehme das Curry mit Reis."],
  ["Kellner", "And to drink?", "Und zu trinken?"],
  ["Gast", "Just water, please. I don't drink alcohol.", "Nur Wasser, bitte. Ich trinke keinen Alkohol."]],
  questions: [
  ["Was bestellt der Gast?", "Gemüsecurry mit Reis", ["Hähnchen mit Reis", "Fisch mit Kartoffeln", "Nudeln"]],
  ["Wie ist das Curry?", "Etwas scharf", ["Sehr süß", "Kalt", "Ohne Gewürze"]],
  ["Was trinkt der Gast?", "Wasser", ["Bier", "Wein", "Saft"]]] },

u07: { title: "An der Kasse", people: ["Kassiererin", "Kunde"], lines: [
  ["Kassiererin", "Hello. Do you need a bag?", "Hallo. Brauchen Sie eine Tüte?"],
  ["Kunde", "No, thanks. I have one. How much is it?", "Nein danke, ich habe eine. Was macht das?"],
  ["Kassiererin", "That's twenty-three euros forty.", "Das macht dreiundzwanzig Euro vierzig."],
  ["Kunde", "Can I pay by card?", "Kann ich mit Karte zahlen?"],
  ["Kassiererin", "Sorry, the card machine isn't working. Only cash today.", "Tut mir leid, das Kartengerät geht nicht. Heute nur bar."],
  ["Kunde", "No problem. Here's thirty euros.", "Kein Problem. Hier sind dreißig Euro."]],
  questions: [
  ["Wie viel kostet der Einkauf?", "23,40 €", ["30,00 €", "32,40 €", "13,40 €"]],
  ["Warum zahlt der Kunde bar?", "Das Kartengerät funktioniert nicht", ["Er hat keine Karte", "Es ist billiger", "Der Laden nimmt nie Karte"]],
  ["Braucht der Kunde eine Tüte?", "Nein, er hat eine", ["Ja, eine große", "Ja, zwei", "Er kauft eine Tasche"]]] },

u08: { title: "Was ziehe ich an?", people: ["Anna", "Max"], lines: [
  ["Anna", "What are you doing?", "Was machst du gerade?"],
  ["Max", "I'm looking for my jacket. It's raining outside.", "Ich suche meine Jacke. Draußen regnet es."],
  ["Anna", "It's on the chair. And take an umbrella.", "Sie liegt auf dem Stuhl. Und nimm einen Schirm mit."],
  ["Max", "Is it cold?", "Ist es kalt?"],
  ["Anna", "Yes, it's only five degrees. Wear your boots too.", "Ja, nur fünf Grad. Zieh auch deine Stiefel an."]],
  questions: [
  ["Was sucht Max?", "Seine Jacke", ["Seine Stiefel", "Seinen Schirm", "Seine Schlüssel"]],
  ["Wie ist das Wetter?", "Es regnet, 5 Grad", ["Sonnig, 15 Grad", "Es schneit", "Windig, aber warm"]],
  ["Wo ist die Jacke?", "Auf dem Stuhl", ["Im Schrank", "Im Auto", "An der Tür"]]] },

u09: { title: "Freizeitpläne", people: ["Jack", "Mia"], lines: [
  ["Jack", "What do you like doing in your free time?", "Was machst du gern in deiner Freizeit?"],
  ["Mia", "I love swimming and reading. And you?", "Ich schwimme und lese total gern. Und du?"],
  ["Jack", "I play football on Fridays, and I like cooking.", "Freitags spiele ich Fußball und ich koche gern."],
  ["Mia", "Can you cook Italian food?", "Kannst du italienisch kochen?"],
  ["Jack", "Yes, I can make really good pizza!", "Ja, ich mache richtig gute Pizza!"],
  ["Mia", "Great, invite me some time!", "Super, lad mich mal ein!"]],
  questions: [
  ["Was macht Mia gern?", "Schwimmen und Lesen", ["Fußball und Kochen", "Tanzen und Singen", "Laufen"]],
  ["Wann spielt Jack Fußball?", "Freitags", ["Sonntags", "Montags", "Jeden Tag"]],
  ["Was kann Jack gut kochen?", "Pizza", ["Curry", "Suppe", "Fisch"]]] },

u10: { title: "Nach dem Weg fragen", people: ["Tourist", "Passantin"], lines: [
  ["Tourist", "Excuse me, is there a pharmacy near here?", "Entschuldigung, gibt es hier in der Nähe eine Apotheke?"],
  ["Passantin", "Yes. Go straight on and turn left at the traffic lights.", "Ja. Geradeaus und an der Ampel links."],
  ["Tourist", "Left at the traffic lights. And then?", "An der Ampel links. Und dann?"],
  ["Passantin", "The pharmacy is on the right, next to the bank.", "Die Apotheke ist rechts, neben der Bank."],
  ["Tourist", "Is it far?", "Ist es weit?"],
  ["Passantin", "No, it's only five minutes to walk.", "Nein, nur fünf Minuten zu Fuß."]],
  questions: [
  ["Was sucht der Tourist?", "Eine Apotheke", ["Eine Bank", "Den Bahnhof", "Ein Hotel"]],
  ["Wo muss er abbiegen?", "An der Ampel links", ["An der Kirche rechts", "Nach der Brücke links", "Gar nicht"]],
  ["Wo ist sie genau?", "Rechts, neben der Bank", ["Links, gegenüber der Bank", "Hinter dem Bahnhof", "Neben der Kirche"]]] },

u11: { title: "Schichtplan", people: ["Schichtleiter", "Nico"], lines: [
  ["Schichtleiter", "Nico, can you work the late shift next week?", "Nico, kannst du nächste Woche Spätschicht machen?"],
  ["Nico", "Next week? I usually work early shifts.", "Nächste Woche? Normalerweise habe ich Frühschicht."],
  ["Schichtleiter", "I know, but Paul is on sick leave.", "Ich weiß, aber Paul ist krankgeschrieben."],
  ["Nico", "Okay, no problem. But I need Friday off.", "Okay, kein Problem. Aber ich brauche Freitag frei."],
  ["Schichtleiter", "That's fine. Thanks, you're always helpful.", "Das passt. Danke, du hilfst immer."]],
  questions: [
  ["Welche Schicht soll Nico nächste Woche machen?", "Spätschicht", ["Frühschicht", "Nachtschicht", "Keine"]],
  ["Warum?", "Ein Kollege ist krank", ["Ein Kollege hat Urlaub", "Es gibt mehr Aufträge", "Nico will es so"]],
  ["Was möchte Nico dafür?", "Freitag frei", ["Mehr Geld", "Montag frei", "Überstunden"]]] },

u12: { title: "Wie war das Wochenende?", people: ["Kate", "Sam"], lines: [
  ["Kate", "How was your weekend?", "Wie war dein Wochenende?"],
  ["Sam", "It was nice. On Saturday I visited my parents.", "Schön. Am Samstag habe ich meine Eltern besucht."],
  ["Kate", "And on Sunday?", "Und am Sonntag?"],
  ["Sam", "I stayed at home. It rained all day, so I watched films.", "Ich bin zu Hause geblieben. Es hat den ganzen Tag geregnet, also habe ich Filme geschaut."],
  ["Kate", "Sounds relaxing!", "Klingt entspannt!"],
  ["Sam", "It was. And I cooked a big dinner.", "War es. Und ich habe ein großes Abendessen gekocht."]],
  questions: [
  ["Was hat Sam am Samstag gemacht?", "Seine Eltern besucht", ["Fußball gespielt", "Gearbeitet", "Eingekauft"]],
  ["Wie war das Wetter am Sonntag?", "Es hat geregnet", ["Es war sonnig", "Es hat geschneit", "Es war windig"]],
  ["Was hat Sam am Sonntag gemacht?", "Filme geschaut und gekocht", ["Einen Ausflug gemacht", "Lange geschlafen", "Freunde getroffen"]]] },

u13: { title: "Der Urlaub", people: ["Lena", "Chris"], lines: [
  ["Lena", "You look tanned! Where did you go?", "Du bist ja braun! Wo warst du?"],
  ["Chris", "We went to Spain for a week.", "Wir waren eine Woche in Spanien."],
  ["Lena", "Lovely! What did you do there?", "Schön! Was habt ihr gemacht?"],
  ["Chris", "We swam a lot and ate great food. We also saw a football game in Barcelona.", "Wir sind viel geschwommen und haben super gegessen. Wir haben auch ein Fußballspiel in Barcelona gesehen."],
  ["Lena", "Did you fly?", "Seid ihr geflogen?"],
  ["Chris", "Yes. The flight was cheap, but I lost my suitcase!", "Ja. Der Flug war billig, aber ich habe meinen Koffer verloren!"]],
  questions: [
  ["Wo war Chris im Urlaub?", "In Spanien", ["In Italien", "In Frankreich", "In Portugal"]],
  ["Wie lange?", "Eine Woche", ["Zwei Wochen", "Ein Wochenende", "Einen Monat"]],
  ["Was ist schiefgelaufen?", "Sein Koffer ging verloren", ["Der Flug war teuer", "Es hat geregnet", "Er war krank"]]] },

u14: { title: "Am Telefon nachfragen", people: ["Kundin", "Mitarbeiter"], lines: [
  ["Mitarbeiter", "Your order number is B-four-seven-two.", "Ihre Bestellnummer ist B-vier-sieben-zwei."],
  ["Kundin", "Sorry, could you repeat that, please?", "Entschuldigung, könnten Sie das bitte wiederholen?"],
  ["Mitarbeiter", "Of course. B-four-seven-two.", "Natürlich. B-vier-sieben-zwei."],
  ["Kundin", "And what does 'dispatched' mean?", "Und was bedeutet 'dispatched'?"],
  ["Mitarbeiter", "It means we sent the parcel yesterday.", "Es bedeutet, dass wir das Paket gestern verschickt haben."],
  ["Kundin", "I see. Thank you very much!", "Ach so. Vielen Dank!"]],
  questions: [
  ["Wie lautet die Bestellnummer?", "B-472", ["B-427", "D-472", "B-742"]],
  ["Was bedeutet „dispatched“?", "Verschickt", ["Storniert", "Bezahlt", "Angekommen"]],
  ["Wann wurde das Paket verschickt?", "Gestern", ["Heute", "Vor einer Woche", "Noch gar nicht"]]] },

u15: { title: "Pläne fürs Wochenende", people: ["Tim", "Julia"], lines: [
  ["Tim", "Are you free on Saturday?", "Hast du am Samstag Zeit?"],
  ["Julia", "In the morning I'm going to clean the flat. Why?", "Vormittags werde ich die Wohnung putzen. Warum?"],
  ["Tim", "We're going to have a barbecue in the afternoon. Do you want to come?", "Wir grillen am Nachmittag. Willst du kommen?"],
  ["Julia", "I'd love to! Shall I bring something?", "Sehr gern! Soll ich was mitbringen?"],
  ["Tim", "Maybe a salad?", "Vielleicht einen Salat?"],
  ["Julia", "Sure. See you on Saturday!", "Klar. Bis Samstag!"]],
  questions: [
  ["Was macht Julia am Samstagvormittag?", "Die Wohnung putzen", ["Arbeiten", "Einkaufen", "Schlafen"]],
  ["Was ist am Nachmittag geplant?", "Grillen", ["Kino", "Fußball", "Ein Ausflug"]],
  ["Was bringt Julia mit?", "Einen Salat", ["Getränke", "Kuchen", "Fleisch"]]] },

u16: { title: "Am Bahnhof", people: ["Reisender", "Schalter"], lines: [
  ["Reisender", "A return ticket to London, please.", "Eine Hin- und Rückfahrkarte nach London, bitte."],
  ["Schalter", "That's forty-five pounds. The next train leaves at ten fifteen.", "Das macht 45 Pfund. Der nächste Zug fährt um 10:15."],
  ["Reisender", "Which platform?", "Welches Gleis?"],
  ["Schalter", "Platform six. But it's delayed by twenty minutes.", "Gleis sechs. Aber er hat zwanzig Minuten Verspätung."],
  ["Reisender", "Oh no. I'll miss my meeting!", "Oh nein. Ich verpasse mein Meeting!"],
  ["Schalter", "Don't worry. I'll check if there's a faster train.", "Keine Sorge. Ich schaue, ob es einen schnelleren Zug gibt."]],
  questions: [
  ["Was für eine Fahrkarte kauft er?", "Hin und zurück nach London", ["Einfache Fahrt", "Monatskarte", "Für zwei Personen"]],
  ["Von welchem Gleis fährt der Zug?", "Gleis 6", ["Gleis 16", "Gleis 2", "Gleis 10"]],
  ["Was ist das Problem?", "20 Minuten Verspätung", ["Der Zug fällt aus", "Das Ticket ist teuer", "Falscher Bahnhof"]]] },

u17: { title: "Welches Handy?", people: ["Verkäufer", "Kundin"], lines: [
  ["Kundin", "Which phone is better, this one or that one?", "Welches Handy ist besser, das hier oder das da?"],
  ["Verkäufer", "This one is cheaper, but that one has a better camera.", "Das hier ist billiger, aber das da hat eine bessere Kamera."],
  ["Kundin", "Is the battery bigger too?", "Ist der Akku auch größer?"],
  ["Verkäufer", "Yes, it's the best battery in the shop. But it's also the most expensive.", "Ja, der beste Akku im Laden. Aber es ist auch das teuerste."],
  ["Kundin", "Hmm. The camera isn't so important for me. I'll take the cheaper one.", "Hm. Die Kamera ist mir nicht so wichtig. Ich nehme das billigere."]],
  questions: [
  ["Was ist der Vorteil des teureren Handys?", "Bessere Kamera und Akku", ["Es ist leichter", "Es ist größer", "Es ist billiger"]],
  ["Welches Handy nimmt die Kundin?", "Das billigere", ["Das teurere", "Keins", "Beide"]],
  ["Warum?", "Die Kamera ist ihr nicht wichtig", ["Der Akku ist zu klein", "Die Farbe gefällt ihr", "Der Verkäufer rät dazu"]]] },

u18: { title: "Beim Arzt", people: ["Ärztin", "Patient"], lines: [
  ["Ärztin", "What's the problem?", "Was fehlt Ihnen?"],
  ["Patient", "I've got a sore throat and a fever.", "Ich habe Halsschmerzen und Fieber."],
  ["Ärztin", "How long have you had it?", "Seit wann?"],
  ["Patient", "Since Monday. And I have to work on Thursday.", "Seit Montag. Und ich muss am Donnerstag arbeiten."],
  ["Ärztin", "You shouldn't work this week. You must rest. I'll give you a sick note.", "Sie sollten diese Woche nicht arbeiten. Sie müssen sich ausruhen. Ich schreibe Sie krank."],
  ["Patient", "Do I have to take any tablets?", "Muss ich Tabletten nehmen?"],
  ["Ärztin", "Yes, take one tablet three times a day.", "Ja, nehmen Sie dreimal täglich eine Tablette."]],
  questions: [
  ["Welche Beschwerden hat der Patient?", "Halsschmerzen und Fieber", ["Rückenschmerzen", "Kopfschmerzen und Husten", "Bauchschmerzen"]],
  ["Was sagt die Ärztin?", "Er soll sich ausruhen und nicht arbeiten", ["Er kann normal arbeiten", "Er muss ins Krankenhaus", "Er braucht nichts"]],
  ["Wie oft soll er die Tablette nehmen?", "Dreimal täglich", ["Einmal täglich", "Zweimal täglich", "Nur abends"]]] },

u19: { title: "Termin verschieben", people: ["Praxis", "Nico"], lines: [
  ["Praxis", "Dr Miller's office, good morning.", "Praxis Dr. Miller, guten Morgen."],
  ["Nico", "Good morning. I have an appointment on Tuesday at ten, but I can't come.", "Guten Morgen. Ich habe am Dienstag um zehn einen Termin, kann aber nicht kommen."],
  ["Praxis", "No problem. Can you come on Thursday at three?", "Kein Problem. Können Sie am Donnerstag um drei?"],
  ["Nico", "I'm at work until two, so three is fine.", "Ich arbeite bis zwei, also passt drei."],
  ["Praxis", "Great. Thursday, the twelfth, at three o'clock.", "Prima. Donnerstag, der Zwölfte, um drei Uhr."]],
  questions: [
  ["Wann war der alte Termin?", "Dienstag um 10", ["Donnerstag um 3", "Dienstag um 3", "Montag um 10"]],
  ["Wann ist der neue Termin?", "Donnerstag um 15 Uhr", ["Donnerstag um 14 Uhr", "Freitag um 15 Uhr", "Dienstag um 15 Uhr"]],
  ["Bis wann arbeitet Nico?", "Bis 14 Uhr", ["Bis 15 Uhr", "Bis 12 Uhr", "Bis 10 Uhr"]]] },

u20: { title: "Smalltalk in der Pause", people: ["Olivia", "Daniel"], lines: [
  ["Olivia", "Hi! How long have you worked here?", "Hi! Wie lange arbeitest du schon hier?"],
  ["Daniel", "About three years. What about you?", "Ungefähr drei Jahre. Und du?"],
  ["Olivia", "Only two months. Where do you live?", "Erst zwei Monate. Wo wohnst du?"],
  ["Daniel", "In a village nearby. I come by bike.", "In einem Dorf hier in der Nähe. Ich komme mit dem Rad."],
  ["Olivia", "Really? Even in winter?", "Wirklich? Sogar im Winter?"],
  ["Daniel", "It depends on the weather!", "Kommt aufs Wetter an!"]],
  questions: [
  ["Wie lange arbeitet Daniel schon dort?", "Etwa drei Jahre", ["Zwei Monate", "Ein Jahr", "Zehn Jahre"]],
  ["Wie kommt Daniel zur Arbeit?", "Mit dem Fahrrad", ["Mit dem Bus", "Mit dem Auto", "Zu Fuß"]],
  ["Fährt er im Winter auch mit dem Rad?", "Kommt aufs Wetter an", ["Ja, immer", "Nein, nie", "Nur montags"]]] },

u21: { title: "Ein stressiger Tag", people: ["Hannah", "Leo"], lines: [
  ["Hannah", "You look stressed. Are you okay?", "Du siehst gestresst aus. Alles okay?"],
  ["Leo", "Not really. The machine broke down and the boss was angry.", "Nicht wirklich. Die Maschine ist ausgefallen und der Chef war sauer."],
  ["Hannah", "Oh no. Was it your fault?", "Oh nein. War es deine Schuld?"],
  ["Leo", "No, but I had to work really quickly to finish the order.", "Nein, aber ich musste richtig schnell arbeiten, um den Auftrag fertigzumachen."],
  ["Hannah", "Well, you did it! Let's have a coffee and relax.", "Na ja, du hast es geschafft! Lass uns einen Kaffee trinken und entspannen."]],
  questions: [
  ["Was ist passiert?", "Die Maschine ist ausgefallen", ["Leo war krank", "Der Auftrag wurde storniert", "Leo kam zu spät"]],
  ["War es Leos Schuld?", "Nein", ["Ja", "Teilweise", "Weiß er nicht"]],
  ["Was schlägt Hannah vor?", "Einen Kaffee trinken", ["Nach Hause gehen", "Mit dem Chef reden", "Überstunden machen"]]] },

u22: { title: "Schon mal …?", people: ["Ella", "Noah"], lines: [
  ["Ella", "Have you ever been to the USA?", "Warst du schon mal in den USA?"],
  ["Noah", "No, never. But I've been to Canada twice.", "Nein, noch nie. Aber ich war zweimal in Kanada."],
  ["Ella", "Have you ever seen a bear?", "Hast du schon mal einen Bären gesehen?"],
  ["Noah", "Yes! Once, in a national park. It was amazing.", "Ja! Einmal, in einem Nationalpark. Es war unglaublich."],
  ["Ella", "I've never travelled outside Europe.", "Ich war noch nie außerhalb Europas."],
  ["Noah", "Then it's time for an adventure!", "Dann wird es Zeit für ein Abenteuer!"]],
  questions: [
  ["Wie oft war Noah in Kanada?", "Zweimal", ["Einmal", "Noch nie", "Dreimal"]],
  ["Was hat er dort gesehen?", "Einen Bären", ["Einen Wal", "Einen Elch", "Nichts Besonderes"]],
  ["Wo war Ella schon?", "Nur in Europa", ["In den USA", "In Kanada", "In Asien"]]] },

u23: { title: "Neue Arbeitszeiten", people: ["Paul", "Sophie"], lines: [
  ["Paul", "What do you think about the new shift times?", "Was hältst du von den neuen Schichtzeiten?"],
  ["Sophie", "In my opinion, starting at seven is better than at six.", "Meiner Meinung nach ist sieben besser als sechs."],
  ["Paul", "I agree. But we finish later now.", "Stimmt. Aber wir haben jetzt später Feierabend."],
  ["Sophie", "That's true. On the other hand, the traffic is worse in the afternoon.", "Das stimmt. Andererseits ist nachmittags mehr Verkehr."],
  ["Paul", "Exactly. I've been in traffic jams every day since Monday!", "Genau. Seit Montag stehe ich jeden Tag im Stau!"]],
  questions: [
  ["Was findet Sophie besser?", "Um sieben anzufangen", ["Um sechs anzufangen", "Nachtschichten", "Früher Feierabend"]],
  ["Was ist der Nachteil laut Sophie?", "Nachmittags mehr Verkehr", ["Weniger Geld", "Mehr Arbeit", "Längere Pausen"]],
  ["Seit wann steht Paul im Stau?", "Seit Montag", ["Seit einem Monat", "Seit gestern", "Nie"]]] },

u24: { title: "Ein Missgeschick", people: ["Grace", "Ryan"], lines: [
  ["Grace", "What happened to your arm?", "Was ist mit deinem Arm passiert?"],
  ["Ryan", "I fell while I was carrying boxes down the stairs.", "Ich bin hingefallen, als ich Kisten die Treppe runtergetragen habe."],
  ["Grace", "Ouch! Is it broken?", "Autsch! Ist er gebrochen?"],
  ["Ryan", "Luckily not. But the boxes were full of glasses…", "Zum Glück nicht. Aber die Kisten waren voller Gläser …"],
  ["Grace", "Oh no! Were they all broken?", "Oh nein! Waren alle kaputt?"],
  ["Ryan", "Most of them. I was talking on the phone and didn't notice the step.", "Die meisten. Ich habe telefoniert und die Stufe nicht bemerkt."]],
  questions: [
  ["Was hat Ryan getragen?", "Kisten mit Gläsern", ["Eine Leiter", "Einen Koffer", "Einkäufe"]],
  ["Ist sein Arm gebrochen?", "Nein, zum Glück nicht", ["Ja", "Er weiß es noch nicht", "Nur der Finger"]],
  ["Warum ist er gefallen?", "Er hat telefoniert und die Stufe übersehen", ["Die Treppe war nass", "Er war müde", "Es war dunkel"]]] },

u25: { title: "Falls es regnet", people: ["Mutter", "Sohn"], lines: [
  ["Sohn", "Can we go to the lake tomorrow?", "Können wir morgen an den See?"],
  ["Mutter", "If the weather is good, we'll go.", "Wenn das Wetter gut ist, fahren wir."],
  ["Sohn", "And if it rains?", "Und wenn es regnet?"],
  ["Mutter", "If it rains, we'll go to the swimming pool instead.", "Wenn es regnet, gehen wir stattdessen ins Schwimmbad."],
  ["Sohn", "Cool! Can Tom come too?", "Cool! Darf Tom mitkommen?"],
  ["Mutter", "Yes, unless his parents say no.", "Ja, es sei denn, seine Eltern sagen nein."]],
  questions: [
  ["Wohin wollen sie bei gutem Wetter?", "An den See", ["Ins Kino", "Ins Schwimmbad", "In die Berge"]],
  ["Was ist der Plan B bei Regen?", "Schwimmbad", ["Zu Hause bleiben", "Museum", "Einkaufen"]],
  ["Darf Tom mit?", "Ja, wenn seine Eltern einverstanden sind", ["Nein", "Nur bei Regen", "Nur zum See"]]] },

u26: { title: "Lotto-Träume", people: ["Amy", "Joe"], lines: [
  ["Amy", "What would you do if you won the lottery?", "Was würdest du tun, wenn du im Lotto gewinnen würdest?"],
  ["Joe", "I'd buy a house with a big garden.", "Ich würde ein Haus mit großem Garten kaufen."],
  ["Amy", "Would you stop working?", "Würdest du aufhören zu arbeiten?"],
  ["Joe", "No, I'd get bored. But I'd work less.", "Nein, mir wäre langweilig. Aber ich würde weniger arbeiten."],
  ["Amy", "If I were rich, I'd travel the world for a year.", "Wenn ich reich wäre, würde ich ein Jahr die Welt bereisen."],
  ["Joe", "Take me with you!", "Nimm mich mit!"]],
  questions: [
  ["Was würde Joe kaufen?", "Ein Haus mit Garten", ["Ein Auto", "Ein Boot", "Eine Wohnung am Meer"]],
  ["Würde Joe aufhören zu arbeiten?", "Nein, aber weniger arbeiten", ["Ja, sofort", "Ja, nach einem Jahr", "Er weiß es nicht"]],
  ["Was würde Amy tun?", "Ein Jahr um die Welt reisen", ["Ein Haus kaufen", "Alles spenden", "Eine Firma gründen"]]] },

u27: { title: "Besuch in der Produktion", people: ["Meister", "Besucher"], lines: [
  ["Besucher", "How are the parts made?", "Wie werden die Teile hergestellt?"],
  ["Meister", "The raw material is delivered from Sweden and stored in the warehouse.", "Der Rohstoff wird aus Schweden geliefert und im Lager gelagert."],
  ["Meister", "Then the parts are cut and assembled on this line.", "Dann werden die Teile an dieser Linie geschnitten und montiert."],
  ["Besucher", "Is every part checked?", "Wird jedes Teil geprüft?"],
  ["Meister", "Yes, every part is measured twice. Faulty parts are sorted out.", "Ja, jedes Teil wird zweimal gemessen. Fehlerhafte Teile werden aussortiert."],
  ["Meister", "Finally, they're packed and loaded onto trucks.", "Zum Schluss werden sie verpackt und auf LKW geladen."]],
  questions: [
  ["Woher kommt der Rohstoff?", "Aus Schweden", ["Aus Polen", "Aus Deutschland", "Aus China"]],
  ["Wie oft wird jedes Teil gemessen?", "Zweimal", ["Einmal", "Dreimal", "Nur stichprobenartig"]],
  ["Was passiert ganz am Ende?", "Verpacken und auf LKW laden", ["Lagern", "Messen", "Schneiden"]]] },

u28: { title: "Die neue Kollegin", people: ["Ben", "Clara"], lines: [
  ["Ben", "Have you met the new colleague?", "Kennst du schon die neue Kollegin?"],
  ["Clara", "Which one? The woman who started on Monday?", "Welche? Die Frau, die am Montag angefangen hat?"],
  ["Ben", "Yes, the one with glasses who works in quality control.", "Ja, die mit der Brille, die in der Qualitätskontrolle arbeitet."],
  ["Clara", "Oh, Maria! She's really friendly and very experienced.", "Ach, Maria! Sie ist echt nett und sehr erfahren."],
  ["Ben", "Is she the one whose husband works at the bakery?", "Ist das die, deren Mann in der Bäckerei arbeitet?"],
  ["Clara", "Exactly. The bakery where we buy our rolls!", "Genau. Die Bäckerei, wo wir unsere Brötchen kaufen!"]],
  questions: [
  ["Wann hat die neue Kollegin angefangen?", "Am Montag", ["Gestern", "Letzte Woche", "Am Freitag"]],
  ["In welcher Abteilung arbeitet sie?", "Qualitätskontrolle", ["Lager", "Büro", "Versand"]],
  ["Wo arbeitet ihr Mann?", "In der Bäckerei", ["Im Lager", "In derselben Firma", "Im Krankenhaus"]]] },

u29: { title: "Neuigkeiten aus der Firma", people: ["Mike", "Laura"], lines: [
  ["Mike", "Did you hear the news? The boss said they would build a new hall.", "Hast du's gehört? Der Chef hat gesagt, sie würden eine neue Halle bauen."],
  ["Laura", "Really? When?", "Echt? Wann?"],
  ["Mike", "He told us it would start next spring.", "Er sagte uns, es würde nächstes Frühjahr losgehen."],
  ["Laura", "Did he say if they need more workers?", "Hat er gesagt, ob sie mehr Leute brauchen?"],
  ["Mike", "Yes, he said they were looking for twenty new people.", "Ja, er sagte, sie suchen zwanzig neue Leute."],
  ["Laura", "Great! My brother is looking for a job.", "Super! Mein Bruder sucht einen Job."]],
  questions: [
  ["Was soll gebaut werden?", "Eine neue Halle", ["Eine Kantine", "Ein Parkhaus", "Ein Büro"]],
  ["Wann soll es losgehen?", "Nächstes Frühjahr", ["Nächsten Monat", "Im Sommer", "Sofort"]],
  ["Wie viele neue Leute werden gesucht?", "Zwanzig", ["Zwölf", "Zwei", "Zweihundert"]]] },

u30: { title: "Gute Vorsätze", people: ["Nina", "Alex"], lines: [
  ["Nina", "Have you managed to stop smoking?", "Hast du es geschafft, mit dem Rauchen aufzuhören?"],
  ["Alex", "Yes! I stopped smoking three months ago.", "Ja! Ich habe vor drei Monaten aufgehört."],
  ["Nina", "Well done! Was it hard?", "Super! War es schwer?"],
  ["Alex", "At first. Now I enjoy running instead.", "Am Anfang. Jetzt gehe ich stattdessen gern laufen."],
  ["Nina", "I keep wanting to start running, but I always find an excuse.", "Ich will dauernd mit dem Laufen anfangen, finde aber immer eine Ausrede."],
  ["Alex", "Why don't you come with me on Saturday? I promise to go slowly.", "Komm doch am Samstag mit. Ich verspreche, langsam zu laufen."]],
  questions: [
  ["Wann hat Alex aufgehört zu rauchen?", "Vor drei Monaten", ["Vor drei Wochen", "Vor einem Jahr", "Gestern"]],
  ["Was macht er jetzt stattdessen?", "Laufen", ["Schwimmen", "Fitnessstudio", "Radfahren"]],
  ["Was schlägt Alex vor?", "Am Samstag zusammen laufen", ["Zusammen rauchen aufhören", "Ins Fitnessstudio gehen", "Eine Ausrede finden"]]] },

u31: { title: "Früher und heute", people: ["Opa", "Enkel"], lines: [
  ["Enkel", "Grandpa, what did you use to do after school?", "Opa, was hast du früher nach der Schule gemacht?"],
  ["Opa", "I used to help on my parents' farm.", "Ich habe früher auf dem Hof meiner Eltern geholfen."],
  ["Enkel", "Did you use to have a phone?", "Hattest du früher ein Telefon?"],
  ["Opa", "No! We didn't use to have a phone at home until I was fifteen.", "Nein! Bis ich fünfzehn war, hatten wir kein Telefon zu Hause."],
  ["Enkel", "That's crazy. I can't imagine life without a smartphone.", "Verrückt. Ich kann mir ein Leben ohne Smartphone nicht vorstellen."],
  ["Opa", "You'd get used to it!", "Du würdest dich daran gewöhnen!"]],
  questions: [
  ["Was hat Opa nach der Schule gemacht?", "Auf dem Hof geholfen", ["Fußball gespielt", "Gearbeitet in einer Fabrik", "Ferngesehen"]],
  ["Bis wann hatten sie kein Telefon?", "Bis er 15 war", ["Bis er 10 war", "Bis er 20 war", "Sie hatten immer eins"]],
  ["Was meint Opa zum Leben ohne Smartphone?", "Man würde sich daran gewöhnen", ["Es wäre unmöglich", "Es wäre langweilig", "Er vermisst es"]]] },

u32: { title: "Ein verrückter Morgen", people: ["Tom", "Kollegin"], lines: [
  ["Kollegin", "Why were you so late today?", "Warum warst du heute so spät?"],
  ["Tom", "When I got to the car, I realised I had left my keys inside the flat.", "Als ich beim Auto war, merkte ich, dass ich die Schlüssel in der Wohnung gelassen hatte."],
  ["Kollegin", "Oh no! And then?", "Oh nein! Und dann?"],
  ["Tom", "By the time I had found them, the bus had already left.", "Bis ich sie gefunden hatte, war der Bus schon weg."],
  ["Kollegin", "So how did you get here?", "Und wie bist du hergekommen?"],
  ["Tom", "In the end, my neighbour drove me. Nevertheless, I missed the meeting.", "Am Ende hat mich mein Nachbar gefahren. Trotzdem habe ich die Besprechung verpasst."]],
  questions: [
  ["Was hatte Tom vergessen?", "Seine Schlüssel", ["Sein Handy", "Seinen Ausweis", "Seine Tasche"]],
  ["Wer hat ihn gefahren?", "Sein Nachbar", ["Seine Kollegin", "Ein Taxi", "Der Bus"]],
  ["Was hat er verpasst?", "Die Besprechung", ["Den Zug", "Die Mittagspause", "Nichts"]]] },

u33: { title: "Hätte ich doch …", people: ["Jana", "Felix"], lines: [
  ["Felix", "I didn't get the job.", "Ich habe die Stelle nicht bekommen."],
  ["Jana", "Oh, I'm sorry. What happened?", "Oh, das tut mir leid. Was ist passiert?"],
  ["Felix", "I wish I had prepared better. They asked a lot of questions in English.", "Hätte ich mich bloß besser vorbereitet. Sie haben viele Fragen auf Englisch gestellt."],
  ["Jana", "If you had told me, I would have practised with you.", "Wenn du es mir gesagt hättest, hätte ich mit dir geübt."],
  ["Felix", "I know. I should have asked.", "Ich weiß. Ich hätte fragen sollen."],
  ["Jana", "Don't blame yourself. Learn from it and try again.", "Mach dir keine Vorwürfe. Lern daraus und versuch es nochmal."]],
  questions: [
  ["Was ist Felix passiert?", "Er hat die Stelle nicht bekommen", ["Er wurde befördert", "Er hat gekündigt", "Er war krank"]],
  ["Was bereut Felix?", "Sich nicht besser vorbereitet zu haben", ["Zu spät gekommen zu sein", "Zu viel geredet zu haben", "Die Stelle angenommen zu haben"]],
  ["Was hätte Jana getan?", "Mit ihm geübt", ["Ihn hingefahren", "Mit dem Chef geredet", "Nichts"]]] },

u34: { title: "Schichttausch", people: ["Lukas", "Eva"], lines: [
  ["Lukas", "Could you take over my shift on Friday?", "Könntest du am Freitag meine Schicht übernehmen?"],
  ["Eva", "Hmm, I was going to pick up my sister from the airport.", "Hm, ich wollte meine Schwester vom Flughafen abholen."],
  ["Lukas", "Oh. Could you put it off until Saturday?", "Oh. Könntest du das auf Samstag verschieben?"],
  ["Eva", "No, but let me find out when her flight lands. Maybe it works out.", "Nein, aber ich finde raus, wann ihr Flug landet. Vielleicht klappt es."],
  ["Lukas", "Thanks! I'll look after your plants when you're on holiday.", "Danke! Ich kümmere mich um deine Pflanzen, wenn du im Urlaub bist."],
  ["Eva", "Deal!", "Abgemacht!"]],
  questions: [
  ["Was möchte Lukas?", "Dass Eva seine Schicht übernimmt", ["Dass Eva ihn abholt", "Einen Tag Urlaub", "Pflanzen gießen"]],
  ["Was hatte Eva am Freitag vor?", "Ihre Schwester vom Flughafen abholen", ["Arbeiten", "In Urlaub fahren", "Zum Arzt gehen"]],
  ["Was bietet Lukas an?", "Sich um ihre Pflanzen kümmern", ["Sie zum Flughafen fahren", "Ihre Samstagsschicht", "Ein Abendessen"]]] },

u35: { title: "Das Vorstellungsgespräch", people: ["Personalerin", "Bewerber"], lines: [
  ["Personalerin", "What are your strengths?", "Was sind Ihre Stärken?"],
  ["Bewerber", "I'm reliable and flexible with shifts, and I'm good at solving problems.", "Ich bin zuverlässig, flexibel bei den Schichten und kann gut Probleme lösen."],
  ["Personalerin", "Have you ever led a team?", "Haben Sie schon mal ein Team geleitet?"],
  ["Bewerber", "Not officially, but I train new colleagues.", "Nicht offiziell, aber ich arbeite neue Kollegen ein."],
  ["Personalerin", "That must be useful experience. Why do you want this job?", "Das muss nützliche Erfahrung sein. Warum wollen Sie diese Stelle?"],
  ["Bewerber", "I'd like to take more responsibility and develop further.", "Ich möchte mehr Verantwortung übernehmen und mich weiterentwickeln."]],
  questions: [
  ["Welche Stärke nennt der Bewerber NICHT?", "Kreativität", ["Zuverlässigkeit", "Flexibilität", "Probleme lösen"]],
  ["Hat er schon ein Team geleitet?", "Nicht offiziell, er arbeitet Neue ein", ["Ja, zehn Leute", "Ja, ein Jahr lang", "Nein, nie mit anderen gearbeitet"]],
  ["Warum will er die Stelle?", "Mehr Verantwortung übernehmen", ["Mehr Geld", "Kürzerer Arbeitsweg", "Weniger Schichten"]]] },

u36: { title: "Anruf beim Kundenservice", people: ["Service", "Kundin"], lines: [
  ["Service", "Good afternoon, how can I help you?", "Guten Tag, wie kann ich Ihnen helfen?"],
  ["Kundin", "I'm calling regarding my order. Could you tell me when it will arrive?", "Ich rufe wegen meiner Bestellung an. Könnten Sie mir sagen, wann sie ankommt?"],
  ["Service", "Of course. Do you know your order number?", "Natürlich. Kennen Sie Ihre Bestellnummer?"],
  ["Kundin", "Yes, it's 5-8-1-3. I was wondering if it had been sent yet.", "Ja, 5-8-1-3. Ich wollte fragen, ob sie schon verschickt wurde."],
  ["Service", "I'm afraid there's a delay. We apologise for the inconvenience. It will arrive on Monday.", "Leider gibt es eine Verzögerung. Wir entschuldigen uns. Sie kommt am Montag."],
  ["Kundin", "Would you mind sending me a confirmation by email?", "Würden Sie mir bitte eine Bestätigung per E-Mail schicken?"]],
  questions: [
  ["Warum ruft die Kundin an?", "Wegen ihrer Bestellung", ["Wegen einer Rechnung", "Für eine Reklamation", "Für einen Termin"]],
  ["Wann kommt die Lieferung?", "Am Montag", ["Heute", "Morgen", "Nächste Woche Freitag"]],
  ["Worum bittet die Kundin am Ende?", "Eine Bestätigung per E-Mail", ["Einen Rabatt", "Einen Rückruf", "Eine Rückerstattung"]]] },

u37: { title: "Fortschritte", people: ["Lehrerin", "Nico"], lines: [
  ["Lehrerin", "Your English has improved a lot. How long have you been learning?", "Dein Englisch ist viel besser geworden. Wie lange lernst du schon?"],
  ["Nico", "I've been learning for about six months now.", "Ich lerne jetzt seit ungefähr sechs Monaten."],
  ["Lehrerin", "And how often do you practise?", "Und wie oft übst du?"],
  ["Nico", "Every day, usually fifteen minutes in my break.", "Jeden Tag, meistens fünfzehn Minuten in der Pause."],
  ["Lehrerin", "That's the secret. Small steps every day.", "Das ist das Geheimnis. Jeden Tag kleine Schritte."],
  ["Nico", "I've also been watching films in English lately.", "In letzter Zeit schaue ich auch Filme auf Englisch."]],
  questions: [
  ["Wie lange lernt Nico schon?", "Etwa sechs Monate", ["Ein Jahr", "Sechs Wochen", "Zwei Jahre"]],
  ["Wann übt er meistens?", "In der Pause, 15 Minuten", ["Abends eine Stunde", "Am Wochenende", "Morgens vor der Arbeit"]],
  ["Was macht er in letzter Zeit zusätzlich?", "Filme auf Englisch schauen", ["Einen Kurs besuchen", "Bücher lesen", "Nach England reisen"]]] }
};
