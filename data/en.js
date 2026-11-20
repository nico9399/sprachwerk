// Sprachwerk – Inhalte Englisch (Lernpfad)
// Wort: [englisch, deutsch, Beispiel EN, Beispiel DE]. grammar → id in data/en-grammar.js
window.SW_LANGS = window.SW_LANGS || {};
window.SW_LANGS.en = {
  code: "en", name: "Englisch", flag: "🇬🇧", voices: { us: "en-US", uk: "en-GB" },
  units: [
    { id: "u01", level: "A1", title: "Hallo & Vorstellen", emoji: "👋", grammar: "be", words: [
      ["hello", "hallo", "Hello, how are you?", "Hallo, wie geht es dir?"],
      ["good morning", "guten Morgen", "Good morning, everyone!", "Guten Morgen zusammen!"],
      ["goodbye", "auf Wiedersehen", "Goodbye, see you tomorrow.", "Auf Wiedersehen, bis morgen."],
      ["yes", "ja", "Yes, I understand.", "Ja, ich verstehe."],
      ["no", "nein", "No, thank you.", "Nein, danke."],
      ["please", "bitte", "Can you help me, please?", "Kannst du mir bitte helfen?"],
      ["thank you", "danke", "Thank you for your help.", "Danke für deine Hilfe."],
      ["sorry", "Entschuldigung", "Sorry, I am late.", "Entschuldigung, ich bin spät dran."],
      ["name", "der Name", "My name is Nico.", "Mein Name ist Nico."],
      ["to be", "sein", "I want to be ready.", "Ich will bereit sein."],
      ["How are you?", "Wie geht's dir?", "Hi Tom, how are you?", "Hi Tom, wie geht's dir?"],
      ["I'm fine, thanks.", "Mir geht's gut, danke.", "I'm fine, thanks. And you?", "Mir geht's gut, danke. Und dir?"],
      ["Nice to meet you.", "Schön, dich kennenzulernen.", "Hi, I'm Nico. Nice to meet you.", "Hi, ich bin Nico. Schön, dich kennenzulernen."],
      ["Where are you from?", "Woher kommst du?", "Where are you from originally?", "Woher kommst du ursprünglich?"],
      ["I'm from Germany.", "Ich komme aus Deutschland.", "I'm from Germany, near Frankfurt.", "Ich komme aus Deutschland, aus der Nähe von Frankfurt."]
    ]},
    { id: "u02", level: "A1", title: "Familie & Freunde", emoji: "👨‍👩‍👧", grammar: "pronouns", words: [
      ["family", "die Familie", "My family lives nearby.", "Meine Familie wohnt in der Nähe."],
      ["friend", "der Freund / die Freundin", "She is my best friend.", "Sie ist meine beste Freundin."],
      ["child", "das Kind", "The child is sleeping.", "Das Kind schläft."],
      ["to have", "haben", "We have two cats.", "Wir haben zwei Katzen."],
      ["mother", "die Mutter", "My mother lives in Frankfurt.", "Meine Mutter wohnt in Frankfurt."],
      ["father", "der Vater", "His father is a teacher.", "Sein Vater ist Lehrer."],
      ["brother", "der Bruder", "I have one brother.", "Ich habe einen Bruder."],
      ["sister", "die Schwester", "Her sister is very funny.", "Ihre Schwester ist sehr lustig."],
      ["parents", "die Eltern", "We visit our parents on Sunday.", "Wir besuchen unsere Eltern am Sonntag."],
      ["son", "der Sohn", "Their son is three years old.", "Ihr Sohn ist drei Jahre alt."],
      ["daughter", "die Tochter", "My daughter loves music.", "Meine Tochter liebt Musik."],
      ["husband", "der Ehemann", "Her husband works at night.", "Ihr Mann arbeitet nachts."],
      ["wife", "die Ehefrau", "His wife is from Italy.", "Seine Frau kommt aus Italien."],
      ["grandparents", "die Großeltern", "My grandparents live in the country.", "Meine Großeltern wohnen auf dem Land."],
      ["baby", "das Baby", "The baby is sleeping.", "Das Baby schläft."]
    ]},
    { id: "u03", level: "A1", title: "Dinge & Zahlen", emoji: "🔢", grammar: "articles", words: [
      ["big", "groß", "That is a big house.", "Das ist ein großes Haus."],
      ["small", "klein", "The room is small.", "Das Zimmer ist klein."],
      ["new", "neu", "I have a new phone.", "Ich habe ein neues Handy."],
      ["old", "alt", "My car is old.", "Mein Auto ist alt."],
      ["good", "gut", "The food is good.", "Das Essen ist gut."],
      ["bad", "schlecht", "The weather is bad.", "Das Wetter ist schlecht."],
      ["number", "die Zahl / Nummer", "What's your phone number?", "Wie ist deine Telefonnummer?"],
      ["car", "das Auto", "My car is in the garage.", "Mein Auto ist in der Werkstatt."],
      ["bike", "das Fahrrad", "I go to work by bike.", "Ich fahre mit dem Fahrrad zur Arbeit."],
      ["phone", "das Handy / Telefon", "My phone is broken.", "Mein Handy ist kaputt."],
      ["box", "die Kiste / Schachtel", "Put the parts in the box.", "Leg die Teile in die Kiste."],
      ["people", "die Leute / Menschen", "Many people work here.", "Hier arbeiten viele Leute."],
      ["city", "die Stadt", "London is a big city.", "London ist eine große Stadt."],
      ["first", "erste(r)", "This is my first day.", "Das ist mein erster Tag."],
      ["half", "halb / die Hälfte", "Half the team is on holiday.", "Das halbe Team ist im Urlaub."]
    ]},
    { id: "u04", level: "A1", title: "Zuhause", emoji: "🏠", grammar: "there", words: [
      ["house", "das Haus", "Their house has a garden.", "Ihr Haus hat einen Garten."],
      ["flat", "die Wohnung", "I live in a small flat.", "Ich wohne in einer kleinen Wohnung."],
      ["kitchen", "die Küche", "The kitchen is very clean.", "Die Küche ist sehr sauber."],
      ["bedroom", "das Schlafzimmer", "The bedroom is upstairs.", "Das Schlafzimmer ist oben."],
      ["bathroom", "das Badezimmer", "Where is the bathroom?", "Wo ist das Badezimmer?"],
      ["door", "die Tür", "Please close the door.", "Bitte mach die Tür zu."],
      ["window", "das Fenster", "Open the window, please.", "Mach bitte das Fenster auf."],
      ["table", "der Tisch", "The keys are on the table.", "Die Schlüssel liegen auf dem Tisch."],
      ["chair", "der Stuhl", "Take a chair and sit down.", "Nimm dir einen Stuhl und setz dich."],
      ["bed", "das Bett", "I go to bed at ten.", "Ich gehe um zehn ins Bett."],
      ["key", "der Schlüssel", "I can't find my key.", "Ich finde meinen Schlüssel nicht."],
      ["cupboard", "der Schrank", "The cups are in the cupboard.", "Die Tassen sind im Schrank."],
      ["light", "das Licht", "Turn off the light, please.", "Mach bitte das Licht aus."],
      ["neighbour", "der Nachbar", "Our neighbour is very nice.", "Unser Nachbar ist sehr nett."],
      ["rent", "die Miete", "The rent is due on Monday.", "Die Miete ist am Montag fällig."]
    ]},
    { id: "u05", level: "A1", title: "Tagesablauf", emoji: "⏰", grammar: "present-simple", words: [
      ["to wake up", "aufwachen", "I wake up at five.", "Ich wache um fünf auf."],
      ["to sleep", "schlafen", "I slept badly last night.", "Ich habe letzte Nacht schlecht geschlafen."],
      ["to go", "gehen / fahren", "I go to work by car.", "Ich fahre mit dem Auto zur Arbeit."],
      ["to come", "kommen", "Can you come tomorrow?", "Kannst du morgen kommen?"],
      ["morning", "der Morgen", "I drink tea in the morning.", "Morgens trinke ich Tee."],
      ["evening", "der Abend", "What are you doing this evening?", "Was machst du heute Abend?"],
      ["week", "die Woche", "I work five days a week.", "Ich arbeite fünf Tage pro Woche."],
      ["hour", "die Stunde", "The film is two hours long.", "Der Film ist zwei Stunden lang."],
      ["today", "heute", "It is cold today.", "Heute ist es kalt."],
      ["tomorrow", "morgen", "I work tomorrow.", "Ich arbeite morgen."],
      ["yesterday", "gestern", "I was tired yesterday.", "Ich war gestern müde."],
      ["now", "jetzt", "I have time now.", "Ich habe jetzt Zeit."],
      ["to cook", "kochen", "Who cooks tonight?", "Wer kocht heute Abend?"],
      ["to clean", "putzen / sauber machen", "We clean the flat on Saturday.", "Wir putzen die Wohnung am Samstag."],
      ["to wash", "waschen", "I need to wash my clothes.", "Ich muss meine Kleidung waschen."],
      ["weekend", "das Wochenende", "Have a nice weekend!", "Schönes Wochenende!"]
    ]},
    { id: "u06", level: "A1", title: "Essen & Trinken", emoji: "🍽️", grammar: "do-does", words: [
      ["bread", "das Brot", "We need bread and milk.", "Wir brauchen Brot und Milch."],
      ["milk", "die Milch", "Do you take milk in your coffee?", "Nimmst du Milch in den Kaffee?"],
      ["water", "das Wasser", "A glass of water, please.", "Ein Glas Wasser, bitte."],
      ["meat", "das Fleisch", "I don't eat much meat.", "Ich esse nicht viel Fleisch."],
      ["vegetables", "das Gemüse", "Vegetables are healthy.", "Gemüse ist gesund."],
      ["fruit", "das Obst", "I eat fruit every day.", "Ich esse jeden Tag Obst."],
      ["egg", "das Ei", "I have two eggs for breakfast.", "Ich esse zwei Eier zum Frühstück."],
      ["cheese", "der Käse", "This cheese is from France.", "Dieser Käse ist aus Frankreich."],
      ["breakfast", "das Frühstück", "Breakfast is ready.", "Das Frühstück ist fertig."],
      ["lunch", "das Mittagessen", "Let's have lunch together.", "Lass uns zusammen zu Mittag essen."],
      ["dinner", "das Abendessen", "Dinner is at seven.", "Das Abendessen ist um sieben."],
      ["hungry", "hungrig", "I am really hungry.", "Ich habe richtig Hunger."],
      ["thirsty", "durstig", "Are you thirsty?", "Hast du Durst?"],
      ["to eat", "essen", "We eat at home tonight.", "Wir essen heute Abend zu Hause."],
      ["to drink", "trinken", "What do you want to drink?", "Was möchtest du trinken?"],
      ["delicious", "lecker", "The soup is delicious.", "Die Suppe ist lecker."],
      ["Enjoy your meal!", "Guten Appetit!", "Here is your pizza. Enjoy your meal!", "Hier ist Ihre Pizza. Guten Appetit!"]
    ]},
    { id: "u07", level: "A1", title: "Einkaufen", emoji: "🛒", grammar: "some-any", words: [
      ["to buy", "kaufen", "I want to buy new shoes.", "Ich will neue Schuhe kaufen."],
      ["to pay", "bezahlen", "Can I pay by card?", "Kann ich mit Karte bezahlen?"],
      ["price", "der Preis", "The price is too high.", "Der Preis ist zu hoch."],
      ["cheap", "billig / günstig", "This shop is cheap.", "Dieser Laden ist günstig."],
      ["expensive", "teuer", "The hotel was expensive.", "Das Hotel war teuer."],
      ["shop", "der Laden", "The shop opens at eight.", "Der Laden öffnet um acht."],
      ["bill", "die Rechnung", "Could we have the bill, please?", "Könnten wir bitte die Rechnung haben?"],
      ["receipt", "der Kassenbon / die Quittung", "Do you need the receipt?", "Brauchen Sie den Kassenbon?"],
      ["bag", "die Tüte / die Tasche", "Do you need a bag?", "Brauchen Sie eine Tüte?"],
      ["How much is it?", "Wie viel kostet das?", "How much is the ticket?", "Wie viel kostet das Ticket?"],
      ["money", "das Geld", "I don't have much money.", "Ich habe nicht viel Geld."],
      ["supermarket", "der Supermarkt", "The supermarket is open until ten.", "Der Supermarkt hat bis zehn offen."]
    ]},
    { id: "u08", level: "A1", title: "Kleidung & Wetter", emoji: "🧥", grammar: "present-continuous", words: [
      ["clothes", "die Kleidung", "Your clothes are in the cupboard.", "Deine Kleidung ist im Schrank."],
      ["warm", "warm", "It is warm in here.", "Hier drin ist es warm."],
      ["cold", "kalt", "The water is cold.", "Das Wasser ist kalt."],
      ["weather", "das Wetter", "The weather is great today.", "Das Wetter ist heute super."],
      ["jacket", "die Jacke", "Take a jacket, it's cold.", "Nimm eine Jacke mit, es ist kalt."],
      ["shoes", "die Schuhe", "These shoes are new.", "Diese Schuhe sind neu."],
      ["to wear", "tragen (Kleidung)", "She's wearing a red dress.", "Sie trägt ein rotes Kleid."],
      ["rain", "der Regen", "The rain is very heavy today.", "Der Regen ist heute sehr stark."],
      ["sun", "die Sonne", "The sun is shining.", "Die Sonne scheint."],
      ["snow", "der Schnee", "There's snow on the roads.", "Auf den Straßen liegt Schnee."],
      ["windy", "windig", "It's very windy outside.", "Draußen ist es sehr windig."],
      ["umbrella", "der Regenschirm", "Don't forget your umbrella.", "Vergiss deinen Regenschirm nicht."]
    ]},
    { id: "u09", level: "A1", title: "Freizeit & Hobbys", emoji: "⚽", grammar: "can-like", words: [
      ["to like", "mögen", "I like this song.", "Ich mag dieses Lied."],
      ["to want", "wollen", "I want a coffee.", "Ich will einen Kaffee."],
      ["always", "immer", "He is always on time.", "Er ist immer pünktlich."],
      ["never", "nie", "I never drink coffee.", "Ich trinke nie Kaffee."],
      ["often", "oft", "We often go for a walk.", "Wir gehen oft spazieren."],
      ["hobby", "das Hobby", "Cooking is my hobby.", "Kochen ist mein Hobby."],
      ["football", "der Fußball", "We play football on Fridays.", "Freitags spielen wir Fußball."],
      ["music", "die Musik", "What music do you like?", "Welche Musik magst du?"],
      ["film", "der Film", "Let's watch a film tonight.", "Lass uns heute Abend einen Film schauen."],
      ["to swim", "schwimmen", "Can you swim?", "Kannst du schwimmen?"],
      ["to play", "spielen", "The kids are playing outside.", "Die Kinder spielen draußen."],
      ["to read", "lesen", "I read before I go to sleep.", "Ich lese vor dem Einschlafen."],
      ["free time", "die Freizeit", "What do you do in your free time?", "Was machst du in deiner Freizeit?"]
    ]},
    { id: "u10", level: "A1", title: "In der Stadt", emoji: "🗺️", grammar: "prepositions-place", words: [
      ["left", "links", "Turn left at the corner.", "Bieg an der Ecke links ab."],
      ["right", "rechts", "The bank is on the right.", "Die Bank ist rechts."],
      ["straight on", "geradeaus", "Go straight on for 200 metres.", "Geh 200 Meter geradeaus."],
      ["far", "weit", "Is it far from here?", "Ist es weit von hier?"],
      ["near", "nah / in der Nähe", "Is there a pharmacy near here?", "Gibt es hier in der Nähe eine Apotheke?"],
      ["street", "die Straße", "I live on this street.", "Ich wohne in dieser Straße."],
      ["map", "die Karte / der Stadtplan", "Can you show me on the map?", "Kannst du es mir auf der Karte zeigen?"],
      ["Where is …?", "Wo ist …?", "Where is the toilet?", "Wo ist die Toilette?"],
      ["corner", "die Ecke", "The shop is on the corner.", "Der Laden ist an der Ecke."],
      ["bus stop", "die Bushaltestelle", "The bus stop is over there.", "Die Bushaltestelle ist da drüben."],
      ["pharmacy", "die Apotheke", "Is there a pharmacy near here?", "Gibt es hier in der Nähe eine Apotheke?"],
      ["post office", "die Post", "The post office closes at six.", "Die Post schließt um sechs."]
    ]},
    { id: "u11", level: "A2", title: "Arbeit", emoji: "🏭", grammar: "adverbs-frequency", words: [
      ["job", "der Job / die Stelle", "I like my job.", "Ich mag meinen Job."],
      ["colleague", "der Kollege / die Kollegin", "My colleague is on holiday.", "Mein Kollege ist im Urlaub."],
      ["boss", "der Chef / die Chefin", "My boss wants to talk to me.", "Mein Chef will mit mir reden."],
      ["shift", "die Schicht", "I work the early shift this week.", "Diese Woche arbeite ich Frühschicht."],
      ["break", "die Pause", "We have a break at ten.", "Wir haben um zehn Pause."],
      ["machine", "die Maschine", "The machine is not working.", "Die Maschine funktioniert nicht."],
      ["production", "die Produktion", "Production starts at six.", "Die Produktion beginnt um sechs."],
      ["warehouse", "das Lager", "The parts are in the warehouse.", "Die Teile sind im Lager."],
      ["salary", "das Gehalt", "The salary is paid monthly.", "Das Gehalt wird monatlich gezahlt."],
      ["overtime", "die Überstunden", "I did overtime yesterday.", "Ich habe gestern Überstunden gemacht."],
      ["holiday", "der Urlaub", "I have two weeks of holiday.", "Ich habe zwei Wochen Urlaub."],
      ["to earn", "verdienen", "He earns good money.", "Er verdient gutes Geld."]
    ]},
    { id: "u12", level: "A2", title: "Was war los?", emoji: "📖", grammar: "past-regular", words: [
      ["to start", "anfangen / starten", "When do we start?", "Wann fangen wir an?"],
      ["to finish", "fertig machen / beenden", "I finish work at two.", "Ich habe um zwei Feierabend."],
      ["to wait", "warten", "Please wait here.", "Bitte warten Sie hier."],
      ["to help", "helfen", "Can I help you?", "Kann ich Ihnen helfen?"],
      ["to call", "anrufen", "I'll call you later.", "Ich ruf dich später an."],
      ["to open", "öffnen", "The shop opens at nine.", "Der Laden öffnet um neun."],
      ["to close", "schließen", "Close the door behind you.", "Schließ die Tür hinter dir."],
      ["to answer", "antworten", "Please answer the question.", "Bitte beantworte die Frage."],
      ["to ask", "fragen", "Can I ask you something?", "Kann ich dich etwas fragen?"],
      ["to try", "versuchen / probieren", "Try it again.", "Versuch es noch mal."],
      ["to learn", "lernen", "I'm learning English.", "Ich lerne Englisch."],
      ["to need", "brauchen", "I need more time.", "Ich brauche mehr Zeit."],
      ["to look for", "suchen", "I'm looking for my phone.", "Ich suche mein Handy."]
    ]},
    { id: "u13", level: "A2", title: "Erlebnisse", emoji: "🎉", grammar: "past-irregular", words: [
      ["to make", "machen / herstellen", "We make car parts.", "Wir stellen Autoteile her."],
      ["to do", "tun / machen", "What are you doing?", "Was machst du gerade?"],
      ["to take", "nehmen", "Take the bus, it's faster.", "Nimm den Bus, der ist schneller."],
      ["to give", "geben", "Can you give me the pen?", "Kannst du mir den Stift geben?"],
      ["to get", "bekommen / holen", "I got a message from her.", "Ich habe eine Nachricht von ihr bekommen."],
      ["to see", "sehen", "Did you see the game?", "Hast du das Spiel gesehen?"],
      ["to find", "finden", "I can't find the file.", "Ich finde die Datei nicht."],
      ["to think", "denken / glauben", "I think it's a good idea.", "Ich finde, das ist eine gute Idee."],
      ["to say", "sagen", "What did he say?", "Was hat er gesagt?"],
      ["to tell", "erzählen / sagen", "Tell me about your day.", "Erzähl mir von deinem Tag."],
      ["to meet", "treffen", "Let's meet at six.", "Lass uns um sechs treffen."],
      ["to bring", "bringen / mitbringen", "Can you bring some drinks?", "Kannst du ein paar Getränke mitbringen?"],
      ["to forget", "vergessen", "Don't forget the meeting.", "Vergiss die Besprechung nicht."],
      ["to know", "wissen / kennen", "I don't know the answer.", "Ich weiß die Antwort nicht."]
    ]},
    { id: "u14", level: "A2", title: "Nachfragen", emoji: "❓", grammar: "past-questions", words: [
      ["Could you repeat that?", "Kannst du das wiederholen?", "Sorry, could you repeat that?", "Entschuldigung, kannst du das wiederholen?"],
      ["Could you speak more slowly?", "Kannst du langsamer sprechen?", "Could you speak more slowly, please?", "Kannst du bitte langsamer sprechen?"],
      ["I don't understand.", "Ich verstehe das nicht.", "Sorry, I don't understand.", "Entschuldigung, ich verstehe das nicht."],
      ["What does … mean?", "Was bedeutet …?", "What does 'shift' mean?", "Was bedeutet 'shift'?"],
      ["to understand", "verstehen", "Do you understand me?", "Verstehst du mich?"],
      ["to remember", "sich erinnern", "I can't remember his name.", "Ich kann mich nicht an seinen Namen erinnern."],
      ["to explain", "erklären", "Can you explain that again?", "Kannst du das noch mal erklären?"]
    ]},
    { id: "u15", level: "A2", title: "Pläne", emoji: "📅", grammar: "going-to", words: [
      ["Do you have any plans?", "Hast du schon Pläne?", "Do you have any plans for the weekend?", "Hast du schon Pläne fürs Wochenende?"],
      ["See you later!", "Bis später!", "I have to go. See you later!", "Ich muss los. Bis später!"],
      ["Have a nice day!", "Schönen Tag noch!", "Thanks for your help. Have a nice day!", "Danke für die Hilfe. Schönen Tag noch!"],
      ["holiday trip", "die Urlaubsreise", "We are planning a holiday trip.", "Wir planen eine Urlaubsreise."],
      ["to book", "buchen", "Did you book the hotel?", "Hast du das Hotel gebucht?"],
      ["plan", "der Plan", "What's the plan for today?", "Was ist der Plan für heute?"],
      ["next week", "nächste Woche", "I'm on holiday next week.", "Nächste Woche habe ich Urlaub."],
      ["soon", "bald", "See you soon!", "Bis bald!"],
      ["to visit", "besuchen", "We're going to visit friends.", "Wir werden Freunde besuchen."]
    ]},
    { id: "u16", level: "A2", title: "Reisen", emoji: "✈️", grammar: "will", words: [
      ["airport", "der Flughafen", "How do I get to the airport?", "Wie komme ich zum Flughafen?"],
      ["train station", "der Bahnhof", "The train station is near here.", "Der Bahnhof ist hier in der Nähe."],
      ["ticket", "die Fahrkarte / das Ticket", "I need a ticket to London.", "Ich brauche ein Ticket nach London."],
      ["luggage", "das Gepäck", "My luggage is too heavy.", "Mein Gepäck ist zu schwer."],
      ["passport", "der Reisepass", "Don't forget your passport.", "Vergiss deinen Reisepass nicht."],
      ["flight", "der Flug", "Our flight is delayed.", "Unser Flug hat Verspätung."],
      ["delayed", "verspätet", "The train is delayed again.", "Der Zug hat schon wieder Verspätung."],
      ["hotel", "das Hotel", "The hotel is next to the beach.", "Das Hotel liegt direkt am Strand."],
      ["room", "das Zimmer", "I booked a double room.", "Ich habe ein Doppelzimmer gebucht."],
      ["to arrive", "ankommen", "We arrive at noon.", "Wir kommen mittags an."],
      ["to leave", "abfahren / verlassen", "The bus leaves in five minutes.", "Der Bus fährt in fünf Minuten ab."],
      ["beach", "der Strand", "Let's go to the beach.", "Lass uns an den Strand gehen."]
    ]},
    { id: "u17", level: "A2", title: "Vergleichen", emoji: "⚖️", grammar: "comparison", words: [
      ["easy", "einfach / leicht", "This exercise is easy.", "Diese Übung ist einfach."],
      ["difficult", "schwierig", "The exam was difficult.", "Die Prüfung war schwierig."],
      ["important", "wichtig", "This is very important.", "Das ist sehr wichtig."],
      ["fast", "schnell", "The new machine is very fast.", "Die neue Maschine ist sehr schnell."],
      ["slow", "langsam", "The internet is slow today.", "Das Internet ist heute langsam."],
      ["long", "lang", "It was a long day.", "Es war ein langer Tag."],
      ["short", "kurz", "The break is too short.", "Die Pause ist zu kurz."],
      ["heavy", "schwer (Gewicht)", "This box is heavy.", "Diese Kiste ist schwer."],
      ["quiet", "leise / ruhig", "Our street is very quiet.", "Unsere Straße ist sehr ruhig."],
      ["loud", "laut", "The music is too loud.", "Die Musik ist zu laut."]
    ]},
    { id: "u18", level: "A2", title: "Gesundheit", emoji: "🩺", grammar: "modals-must", words: [
      ["doctor", "der Arzt / die Ärztin", "I need to see a doctor.", "Ich muss zum Arzt."],
      ["ill", "krank", "I'm ill today.", "Ich bin heute krank."],
      ["headache", "die Kopfschmerzen", "I've got a headache.", "Ich habe Kopfschmerzen."],
      ["medicine", "das Medikament", "Take this medicine twice a day.", "Nimm dieses Medikament zweimal täglich."],
      ["healthy", "gesund", "Vegetables are healthy.", "Gemüse ist gesund."],
      ["pain", "der Schmerz", "I have pain in my back.", "Ich habe Rückenschmerzen."],
      ["sick note", "die Krankmeldung", "I need a sick note for work.", "Ich brauche eine Krankmeldung für die Arbeit."],
      ["to rest", "sich ausruhen", "You should rest for a few days.", "Du solltest dich ein paar Tage ausruhen."],
      ["to get better", "gesund werden", "I hope you get better soon.", "Gute Besserung!"]
    ]},
    { id: "u19", level: "A2", title: "Termine & Telefon", emoji: "📞", grammar: "prepositions-time", words: [
      ["meeting", "die Besprechung", "The meeting starts at nine.", "Die Besprechung beginnt um neun."],
      ["deadline", "die Frist / der Termin", "The deadline is Friday.", "Die Frist ist Freitag."],
      ["schedule", "der Zeitplan", "We are behind schedule.", "Wir liegen hinter dem Zeitplan."],
      ["to send", "schicken / senden", "I will send you the list.", "Ich schicke dir die Liste."],
      ["appointment", "der Termin", "I have an appointment at ten.", "Ich habe um zehn einen Termin."],
      ["message", "die Nachricht", "I got your message.", "Ich habe deine Nachricht bekommen."],
      ["email", "die E-Mail", "I'll send you an email.", "Ich schicke dir eine E-Mail."],
      ["to cancel", "absagen", "I have to cancel the appointment.", "Ich muss den Termin absagen."],
      ["to call back", "zurückrufen", "Can you call me back later?", "Kannst du mich später zurückrufen?"]
    ]},
    { id: "u20", level: "A2", title: "Small Talk", emoji: "💬", grammar: "question-words", words: [
      ["What do you do?", "Was machst du beruflich?", "So, what do you do?", "Und, was machst du beruflich?"],
      ["I work in production.", "Ich arbeite in der Produktion.", "I work in production at a company.", "Ich arbeite in der Produktion einer Firma."],
      ["No problem.", "Kein Problem.", "No problem, I can do that.", "Kein Problem, das kann ich machen."],
      ["That sounds good.", "Das klingt gut.", "Pizza tonight? That sounds good.", "Pizza heute Abend? Das klingt gut."],
      ["I think so.", "Ich glaube schon.", "Is the shop open? I think so.", "Hat der Laden offen? Ich glaube schon."],
      ["Me too.", "Ich auch.", "I'm tired. – Me too.", "Ich bin müde. – Ich auch."],
      ["What's the weather like?", "Wie ist das Wetter?", "What's the weather like in London?", "Wie ist das Wetter in London?"]
    ]},
    { id: "u21", level: "A2", title: "Gefühle", emoji: "🙂", grammar: "adverbs-manner", words: [
      ["happy", "glücklich / froh", "I'm happy with the result.", "Ich bin mit dem Ergebnis zufrieden."],
      ["sad", "traurig", "Why are you sad?", "Warum bist du traurig?"],
      ["tired", "müde", "I'm tired after the night shift.", "Nach der Nachtschicht bin ich müde."],
      ["angry", "wütend / sauer", "Don't be angry with me.", "Sei nicht sauer auf mich."],
      ["worried", "besorgt", "I'm worried about the test.", "Ich mache mir Sorgen wegen der Prüfung."],
      ["excited", "aufgeregt / voller Vorfreude", "We are excited about the trip.", "Wir freuen uns sehr auf die Reise."],
      ["bored", "gelangweilt", "I'm bored. Let's do something.", "Mir ist langweilig. Lass uns was machen."],
      ["proud", "stolz", "I'm proud of you.", "Ich bin stolz auf dich."],
      ["nervous", "nervös", "I'm always nervous before interviews.", "Vor Vorstellungsgesprächen bin ich immer nervös."],
      ["relaxed", "entspannt", "I feel relaxed on holiday.", "Im Urlaub bin ich entspannt."],
      ["afraid", "ängstlich", "She is afraid of dogs.", "Sie hat Angst vor Hunden."],
      ["surprised", "überrascht", "I was surprised by the news.", "Ich war von der Nachricht überrascht."]
    ]},
    { id: "u22", level: "B1", title: "Erfahrungen", emoji: "🌍", grammar: "present-perfect", words: [
      ["experience", "die Erfahrung", "She has a lot of experience.", "Sie hat viel Erfahrung."],
      ["abroad", "im Ausland", "Have you ever lived abroad?", "Hast du schon mal im Ausland gelebt?"],
      ["to travel", "reisen", "I love to travel.", "Ich reise sehr gern."],
      ["already", "schon", "I've already eaten.", "Ich habe schon gegessen."],
      ["yet", "schon / noch (in Fragen/Verneinung)", "Have you finished yet?", "Bist du schon fertig?"],
      ["ever", "jemals / schon mal", "Have you ever been to Scotland?", "Warst du schon mal in Schottland?"],
      ["just", "gerade (eben)", "I've just arrived.", "Ich bin gerade angekommen."]
    ]},
    { id: "u23", level: "B1", title: "Meinung sagen", emoji: "🗣️", grammar: "for-since", words: [
      ["opinion", "die Meinung", "In my opinion, it's too expensive.", "Meiner Meinung nach ist es zu teuer."],
      ["to agree", "zustimmen", "I agree with you.", "Da stimme ich dir zu."],
      ["to disagree", "anderer Meinung sein", "I'm afraid I disagree.", "Da bin ich leider anderer Meinung."],
      ["to hope", "hoffen", "I hope you feel better soon.", "Ich hoffe, es geht dir bald besser."],
      ["to prefer", "lieber mögen / bevorzugen", "I prefer the window seat.", "Ich sitze lieber am Fenster."],
      ["to feel", "fühlen / sich fühlen", "How do you feel today?", "Wie fühlst du dich heute?"],
      ["to worry", "sich Sorgen machen", "Don't worry, it's fine.", "Mach dir keine Sorgen, alles gut."]
    ]},
    { id: "u24", level: "B1", title: "Missgeschicke", emoji: "💥", grammar: "past-continuous", words: [
      ["maybe", "vielleicht", "Maybe we can meet tomorrow.", "Vielleicht können wir uns morgen treffen."],
      ["probably", "wahrscheinlich", "It will probably rain.", "Es wird wahrscheinlich regnen."],
      ["actually", "eigentlich / tatsächlich", "Actually, I prefer tea.", "Eigentlich trinke ich lieber Tee."],
      ["suddenly", "plötzlich", "Suddenly the lights went out.", "Plötzlich ging das Licht aus."],
      ["accident", "der Unfall", "There was an accident on the motorway.", "Auf der Autobahn gab es einen Unfall."],
      ["to fall", "fallen / stürzen", "He fell off the ladder.", "Er ist von der Leiter gefallen."],
      ["to drop", "fallen lassen", "I dropped my phone.", "Mir ist das Handy runtergefallen."],
      ["while", "während", "While I was cooking, he called.", "Während ich gekocht habe, hat er angerufen."]
    ]},
    { id: "u25", level: "B1", title: "Wenn & Falls", emoji: "🔀", grammar: "conditional-1", words: [
      ["problem", "das Problem", "No problem at all.", "Überhaupt kein Problem."],
      ["solution", "die Lösung", "We need a quick solution.", "Wir brauchen eine schnelle Lösung."],
      ["to decide", "entscheiden", "Have you decided yet?", "Hast du dich schon entschieden?"],
      ["chance", "die Chance / Möglichkeit", "This is a good chance for you.", "Das ist eine gute Chance für dich."],
      ["unless", "außer wenn / wenn nicht", "I'll come unless it rains.", "Ich komme, wenn es nicht regnet."],
      ["in case", "falls", "Take an umbrella in case it rains.", "Nimm einen Schirm mit, falls es regnet."]
    ]},
    { id: "u26", level: "B1", title: "Träume", emoji: "💭", grammar: "conditional-2", words: [
      ["dream", "der Traum", "It's my dream to live by the sea.", "Es ist mein Traum, am Meer zu wohnen."],
      ["to win", "gewinnen", "If I won, I'd buy a house.", "Wenn ich gewinnen würde, würde ich ein Haus kaufen."],
      ["rich", "reich", "He isn't rich, but he's happy.", "Er ist nicht reich, aber glücklich."],
      ["to imagine", "sich vorstellen", "Imagine you had a year off.", "Stell dir vor, du hättest ein Jahr frei."],
      ["to own", "besitzen", "I'd love to own a house.", "Ich hätte gern ein eigenes Haus."],
      ["the world", "die Welt", "I'd like to travel the world.", "Ich würde gern die Welt bereisen."]
    ]},
    { id: "u27", level: "B1", title: "Produktion & Prozesse", emoji: "⚙️", grammar: "passive", words: [
      ["quality", "die Qualität", "Quality is very important.", "Qualität ist sehr wichtig."],
      ["safety", "die Sicherheit", "Safety comes first.", "Sicherheit geht vor."],
      ["gloves", "die Handschuhe", "Always wear your gloves.", "Trag immer deine Handschuhe."],
      ["mistake", "der Fehler", "Everyone makes mistakes.", "Jeder macht Fehler."],
      ["delivery", "die Lieferung", "The delivery is late.", "Die Lieferung ist verspätet."],
      ["order", "der Auftrag / die Bestellung", "We have a big order from Spain.", "Wir haben einen großen Auftrag aus Spanien."],
      ["to repair", "reparieren", "Can you repair the machine?", "Kannst du die Maschine reparieren?"],
      ["to check", "prüfen / kontrollieren", "Please check the numbers.", "Bitte prüf die Zahlen."],
      ["broken", "kaputt", "The printer is broken.", "Der Drucker ist kaputt."],
      ["busy", "beschäftigt / viel los", "I am very busy today.", "Ich habe heute viel zu tun."],
      ["product", "das Produkt", "Our products are sold worldwide.", "Unsere Produkte werden weltweit verkauft."],
      ["process", "der Ablauf / Prozess", "The process takes two hours.", "Der Ablauf dauert zwei Stunden."]
    ]},
    { id: "u28", level: "B1", title: "Menschen beschreiben", emoji: "🔎", grammar: "relative", words: [
      ["customer", "der Kunde / die Kundin", "The customer wants a refund.", "Der Kunde möchte sein Geld zurück."],
      ["supplier", "der Lieferant", "Our supplier is in Poland.", "Unser Lieferant sitzt in Polen."],
      ["tool", "das Werkzeug", "Pass me that tool, please.", "Gib mir bitte das Werkzeug."],
      ["friendly", "freundlich", "The staff were very friendly.", "Das Personal war sehr freundlich."],
      ["helpful", "hilfsbereit", "Thanks, you've been very helpful.", "Danke, Sie waren sehr hilfreich."],
      ["funny", "lustig", "He's a really funny guy.", "Er ist ein echt lustiger Typ."]
    ]},
    { id: "u29", level: "B1", title: "Weitererzählen", emoji: "📰", grammar: "reported", words: [
      ["news", "die Nachricht(en) / Neuigkeit", "Have you heard the news?", "Hast du die Neuigkeit gehört?"],
      ["to mention", "erwähnen", "He didn't mention it.", "Er hat es nicht erwähnt."],
      ["to promise", "versprechen", "She promised to call.", "Sie hat versprochen anzurufen."],
      ["to admit", "zugeben", "He admitted his mistake.", "Er hat seinen Fehler zugegeben."],
      ["to complain", "sich beschweren", "The neighbours complained about the noise.", "Die Nachbarn haben sich über den Lärm beschwert."]
    ]},
    { id: "u30", level: "B1", title: "Gewohnheiten", emoji: "🔗", grammar: "gerund-infinitive", words: [
      ["to enjoy", "genießen / gern tun", "I enjoy working outside.", "Ich arbeite gern draußen."],
      ["to avoid", "vermeiden", "Try to avoid the motorway.", "Versuch, die Autobahn zu meiden."],
      ["to suggest", "vorschlagen", "I suggest taking a break.", "Ich schlage vor, eine Pause zu machen."],
      ["to mind", "etwas dagegen haben", "Do you mind waiting?", "Macht es dir was aus zu warten?"],
      ["to plan", "planen", "We're planning to move.", "Wir planen umzuziehen."]
    ]},
    { id: "u31", level: "B1", title: "Früher & heute", emoji: "🕰️", grammar: "used-to", words: [
      ["to get used to", "sich gewöhnen an", "I got used to the early shift.", "Ich habe mich an die Frühschicht gewöhnt."],
      ["childhood", "die Kindheit", "I had a happy childhood.", "Ich hatte eine glückliche Kindheit."],
      ["to grow up", "aufwachsen", "I grew up in a small village.", "Ich bin in einem kleinen Dorf aufgewachsen."],
      ["to change", "(sich) ändern", "A lot has changed.", "Vieles hat sich geändert."],
      ["nowadays", "heutzutage", "Nowadays everyone has a smartphone.", "Heutzutage hat jeder ein Smartphone."]
    ]},
    { id: "u32", level: "B2", title: "Rückblick", emoji: "🔙", grammar: "past-perfect", words: [
      ["eventually", "schließlich / irgendwann", "Eventually, he found a new job.", "Schließlich fand er einen neuen Job."],
      ["obviously", "offensichtlich", "Obviously, something went wrong.", "Offensichtlich ist etwas schiefgelaufen."],
      ["however", "jedoch", "The plan is good. However, it is expensive.", "Der Plan ist gut. Er ist jedoch teuer."],
      ["therefore", "deshalb / daher", "It was raining, therefore we stayed home.", "Es hat geregnet, deshalb sind wir zu Hause geblieben."],
      ["although", "obwohl", "Although it was late, we kept working.", "Obwohl es spät war, haben wir weitergearbeitet."]
    ]},
    { id: "u33", level: "B2", title: "Bedauern", emoji: "😔", grammar: "conditional-3", words: [
      ["to achieve", "erreichen", "We achieved our goal.", "Wir haben unser Ziel erreicht."],
      ["to rely on", "sich verlassen auf", "You can rely on me.", "Du kannst dich auf mich verlassen."],
      ["to be supposed to", "sollen (erwartet sein)", "I'm supposed to start at six.", "Ich soll um sechs anfangen."],
      ["to regret", "bereuen", "I regret not studying more.", "Ich bereue, nicht mehr gelernt zu haben."],
      ["opportunity", "die Gelegenheit", "It was a great opportunity.", "Es war eine tolle Gelegenheit."]
    ]},
    { id: "u34", level: "B2", title: "Phrasal Verbs", emoji: "🧩", grammar: "phrasal-verbs", words: [
      ["to deal with", "sich kümmern um / umgehen mit", "I'll deal with the problem.", "Ich kümmere mich um das Problem."],
      ["to figure out", "herausfinden", "We need to figure out the cause.", "Wir müssen die Ursache herausfinden."],
      ["to run out of", "ausgehen (Vorrat)", "We've run out of milk.", "Uns ist die Milch ausgegangen."],
      ["to look forward to", "sich freuen auf", "I'm looking forward to the weekend.", "Ich freue mich aufs Wochenende."],
      ["to pick up", "abholen / aufheben", "I'll pick you up at six.", "Ich hole dich um sechs ab."],
      ["to give up", "aufgeben", "Don't give up now!", "Gib jetzt nicht auf!"],
      ["to look after", "aufpassen auf / sich kümmern um", "Can you look after the kids?", "Kannst du auf die Kinder aufpassen?"],
      ["to put off", "verschieben", "We put off the meeting.", "Wir haben die Besprechung verschoben."],
      ["to set up", "einrichten / aufbauen", "We need to set up the new machine.", "Wir müssen die neue Maschine aufbauen."]
    ]},
    { id: "u35", level: "B2", title: "Im Job überzeugen", emoji: "💼", grammar: "modals-deduction", words: [
      ["reliable", "zuverlässig", "He is a reliable colleague.", "Er ist ein zuverlässiger Kollege."],
      ["efficient", "effizient", "The new process is more efficient.", "Der neue Ablauf ist effizienter."],
      ["requirement", "die Anforderung / Voraussetzung", "What are the requirements for the job?", "Was sind die Voraussetzungen für die Stelle?"],
      ["responsibility", "die Verantwortung", "Safety is everyone's responsibility.", "Sicherheit liegt in der Verantwortung aller."],
      ["to improve", "verbessern", "I want to improve my English.", "Ich will mein Englisch verbessern."]
    ]},
    { id: "u36", level: "B2", title: "Höflich & formell", emoji: "✉️", grammar: "indirect-questions", words: [
      ["request", "die Anfrage / Bitte", "Thank you for your request.", "Vielen Dank für Ihre Anfrage."],
      ["to apologise", "sich entschuldigen", "I apologise for the delay.", "Ich entschuldige mich für die Verzögerung."],
      ["regarding", "bezüglich", "I'm writing regarding your order.", "Ich schreibe bezüglich Ihrer Bestellung."],
      ["attached", "im Anhang", "Please find the invoice attached.", "Die Rechnung finden Sie im Anhang."],
      ["Would you mind …?", "Würden Sie bitte …? / Macht es Ihnen etwas aus …?", "Would you mind closing the door?", "Würden Sie bitte die Tür schließen?"],
      ["I was wondering if …", "Ich wollte fragen, ob …", "I was wondering if you had time.", "Ich wollte fragen, ob du Zeit hast."],
      ["Kind regards", "Viele Grüße (E-Mail)", "Kind regards, Nico", "Viele Grüße, Nico"]
    ]},
    { id: "u37", level: "B2", title: "Fortschritt", emoji: "📈", grammar: "present-perfect-cont", words: [
      ["progress", "der Fortschritt", "You're making good progress.", "Du machst gute Fortschritte."],
      ["lately", "in letzter Zeit", "I've been very busy lately.", "Ich war in letzter Zeit sehr beschäftigt."],
      ["recently", "kürzlich / neulich", "I recently changed jobs.", "Ich habe kürzlich den Job gewechselt."],
      ["for ages", "seit Ewigkeiten", "I've been waiting for ages.", "Ich warte schon ewig."],
      ["to practise", "üben", "I practise English every day.", "Ich übe jeden Tag Englisch."]
    ]},
  ],
  placement: [
   {
    "lvl": "A1",
    "q": "Was heißt „das Haus“?",
    "o": [
     "house",
     "mouse",
     "horse",
     "home work"
    ],
    "a": 0
   },
   {
    "lvl": "A1",
    "q": "I ___ from Germany.",
    "o": [
     "is",
     "am",
     "are",
     "be"
    ],
    "a": 1
   },
   {
    "lvl": "A1",
    "q": "Was heißt „heute“?",
    "o": [
     "tomorrow",
     "yesterday",
     "today",
     "tonight"
    ],
    "a": 2
   },
   {
    "lvl": "A1",
    "q": "She ___ two brothers.",
    "o": [
     "have",
     "has",
     "having",
     "is"
    ],
    "a": 1
   },
   {
    "lvl": "A1",
    "q": "Was bedeutet „hungry“?",
    "o": [
     "durstig",
     "müde",
     "wütend",
     "hungrig"
    ],
    "a": 3
   },
   {
    "lvl": "A2",
    "q": "Yesterday I ___ to the cinema.",
    "o": [
     "go",
     "goes",
     "went",
     "gone"
    ],
    "a": 2
   },
   {
    "lvl": "A2",
    "q": "Was bedeutet „delivery“?",
    "o": [
     "Lieferung",
     "Rechnung",
     "Abteilung",
     "Lager"
    ],
    "a": 0
   },
   {
    "lvl": "A2",
    "q": "This car is ___ than my old one.",
    "o": [
     "more fast",
     "fastest",
     "faster",
     "most fast"
    ],
    "a": 2
   },
   {
    "lvl": "A2",
    "q": "___ you ever been to London?",
    "o": [
     "Did",
     "Have",
     "Are",
     "Do"
    ],
    "a": 1
   },
   {
    "lvl": "A2",
    "q": "Was heißt „sich Sorgen machen“?",
    "o": [
     "to wonder",
     "to worry",
     "to wander",
     "to warn"
    ],
    "a": 1
   },
   {
    "lvl": "B1",
    "q": "If it rains tomorrow, we ___ at home.",
    "o": [
     "stay",
     "will stay",
     "would stay",
     "stayed"
    ],
    "a": 1
   },
   {
    "lvl": "B1",
    "q": "I've worked here ___ 2019.",
    "o": [
     "for",
     "since",
     "from",
     "ago"
    ],
    "a": 1
   },
   {
    "lvl": "B1",
    "q": "Was bedeutet „to agree“?",
    "o": [
     "zustimmen",
     "ablehnen",
     "vereinbaren",
     "zugeben"
    ],
    "a": 0
   },
   {
    "lvl": "B1",
    "q": "The parts ___ in Germany.",
    "o": [
     "are made",
     "make",
     "are making",
     "made"
    ],
    "a": 0
   },
   {
    "lvl": "B1",
    "q": "He asked me where I ___.",
    "o": [
     "live",
     "lived",
     "am living",
     "do live"
    ],
    "a": 1
   },
   {
    "lvl": "B2",
    "q": "If I ___ more time, I would learn Spanish too.",
    "o": [
     "have",
     "had",
     "would have",
     "will have"
    ],
    "a": 1
   },
   {
    "lvl": "B2",
    "q": "Was bedeutet „reliable“?",
    "o": [
     "zuverlässig",
     "verantwortlich",
     "erleichtert",
     "verfügbar"
    ],
    "a": 0
   },
   {
    "lvl": "B2",
    "q": "I'm not used to ___ so early.",
    "o": [
     "get up",
     "getting up",
     "got up",
     "have got up"
    ],
    "a": 1
   },
   {
    "lvl": "B2",
    "q": "By the time we arrived, the film ___.",
    "o": [
     "already started",
     "has already started",
     "had already started",
     "was already start"
    ],
    "a": 2
   },
   {
    "lvl": "B2",
    "q": "Was heißt „herausfinden“?",
    "o": [
     "to figure out",
     "to give up",
     "to put off",
     "to turn down"
    ],
    "a": 0
   }
  ]
};
