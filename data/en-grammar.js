// Sprachwerk – Grammatik Englisch
// Übungen:
//   ["c", Satz mit ___, richtige Lösung, [falsche Optionen], deutsche Übersetzung]   → Lücke füllen
//   ["r", richtiger Satz, falscher Satz, deutsche Übersetzung]                      → Welcher Satz ist richtig?
//   ["b", englischer Satz, deutsche Übersetzung]                                    → Satz bauen
window.SW_GRAMMAR = window.SW_GRAMMAR || {};
window.SW_GRAMMAR.en = [

/* ===================== A1 ===================== */
{ id: "be", level: "A1", title: "to be: am, is, are",
  sum: "Das wichtigste Verb: sein.",
  rules: [
    ["Die Formen", "<b>I am</b> · <b>you are</b> · <b>he/she/it is</b> · <b>we/you/they are</b>"],
    ["Kurzformen", "Im Gespräch fast immer kurz: <b>I'm, you're, he's, she's, it's, we're, they're</b>"],
    ["Verneinung", "<b>not</b> dahinter: I'm <b>not</b> tired. · She <b>isn't</b> here. · They <b>aren't</b> at home."],
    ["Fragen", "Verb nach vorne: <b>Are</b> you okay? · <b>Is</b> he your brother?"]
  ],
  ex: [["I'm Nico. I'm from Germany.", "Ich bin Nico. Ich komme aus Deutschland."], ["She isn't at work today.", "Sie ist heute nicht auf der Arbeit."], ["Are you tired?", "Bist du müde?"]],
  drills: [
    ["c", "I ___ hungry.", "am", ["is", "are"], "Ich habe Hunger."],
    ["c", "She ___ my sister.", "is", ["are", "am"], "Sie ist meine Schwester."],
    ["c", "We ___ ready.", "are", ["is", "am"], "Wir sind bereit."],
    ["c", "___ you from Spain?", "Are", ["Is", "Am"], "Kommst du aus Spanien?"],
    ["c", "The coffee ___ hot.", "is", ["are", "am"], "Der Kaffee ist heiß."],
    ["c", "They ___ not at home.", "are", ["is", "am"], "Sie sind nicht zu Hause."],
    ["r", "He isn't my boss.", "He aren't my boss.", "Er ist nicht mein Chef."],
    ["r", "Is it cold outside?", "It is cold outside?", "Ist es draußen kalt?"],
    ["b", "I am not tired today.", "Ich bin heute nicht müde."],
    ["b", "Where are you from?", "Woher kommst du?"]
  ]},

{ id: "pronouns", level: "A1", title: "my, your, his, her …",
  sum: "Wem gehört was? Besitzwörter.",
  rules: [
    ["Personen → Besitz", "I → <b>my</b> · you → <b>your</b> · he → <b>his</b> · she → <b>her</b> · it → <b>its</b> · we → <b>our</b> · they → <b>their</b>"],
    ["Kein Unterschied", "Anders als im Deutschen ändert sich nichts: <b>my</b> brother, <b>my</b> sister, <b>my</b> friends."],
    ["his oder her?", "Es zählt der Besitzer: <b>his</b> car = sein Auto (von ihm), <b>her</b> car = ihr Auto (von ihr)."],
    ["Achtung", "<b>its</b> (sein/ihr, von einer Sache) ≠ <b>it's</b> (= it is). <b>their</b> ≠ <b>they're</b> (= they are)."]
  ],
  ex: [["This is my girlfriend.", "Das ist meine Freundin."], ["Tom and his wife live in London.", "Tom und seine Frau leben in London."], ["Is this your phone?", "Ist das dein Handy?"]],
  drills: [
    ["c", "I love ___ job.", "my", ["me", "I"], "Ich liebe meinen Job."],
    ["c", "Anna and ___ husband are here.", "her", ["his", "their"], "Anna und ihr Mann sind hier."],
    ["c", "Paul can't find ___ keys.", "his", ["her", "its"], "Paul findet seine Schlüssel nicht."],
    ["c", "We like ___ new flat.", "our", ["us", "we"], "Wir mögen unsere neue Wohnung."],
    ["c", "The kids are with ___ grandma.", "their", ["there", "they're"], "Die Kinder sind bei ihrer Oma."],
    ["c", "What's ___ name?", "your", ["you", "you're"], "Wie heißt du?"],
    ["r", "The dog is eating its food.", "The dog is eating it's food.", "Der Hund frisst sein Futter."],
    ["r", "Lisa is with her brother.", "Lisa is with his brother.", "Lisa ist bei ihrem Bruder."],
    ["b", "This is my best friend.", "Das ist mein bester Freund."]
  ]},

{ id: "articles", level: "A1", title: "a, an, the & Mehrzahl",
  sum: "Artikel und Plural – einfacher als im Deutschen.",
  rules: [
    ["a oder an?", "<b>a</b> vor Konsonant-Laut: a car, a house. <b>an</b> vor Vokal-Laut: an apple, an hour (h stumm)."],
    ["the", "<b>the</b> = der/die/das – für alles gleich: the man, the woman, the children."],
    ["Mehrzahl", "Meist <b>-s</b>: car → cars. Nach s, sh, ch, x: <b>-es</b> (boxes). Konsonant + y → <b>-ies</b> (city → cities)."],
    ["Unregelmäßig", "man → <b>men</b> · woman → <b>women</b> · child → <b>children</b> · person → <b>people</b> · foot → <b>feet</b>"]
  ],
  ex: [["I have a car and an old bike.", "Ich habe ein Auto und ein altes Fahrrad."], ["The children are at school.", "Die Kinder sind in der Schule."], ["There are two cities near here.", "Hier in der Nähe gibt es zwei Städte."]],
  drills: [
    ["c", "I eat ___ apple every day.", "an", ["a", "the"], "Ich esse jeden Tag einen Apfel."],
    ["c", "She is ___ nurse.", "a", ["an", "–"], "Sie ist Krankenschwester."],
    ["c", "We waited for ___ hour.", "an", ["a", "the"], "Wir haben eine Stunde gewartet."],
    ["c", "There are three ___ in the room.", "women", ["womans", "woman"], "Im Raum sind drei Frauen."],
    ["c", "I have two ___.", "children", ["childs", "child"], "Ich habe zwei Kinder."],
    ["c", "Many ___ live here.", "people", ["persons", "peoples"], "Hier wohnen viele Menschen."],
    ["c", "We visited three ___.", "cities", ["citys", "cityes"], "Wir haben drei Städte besucht."],
    ["r", "Can you close the door?", "Can you close a door the?", "Kannst du die Tür zumachen?"],
    ["r", "He works as an engineer.", "He works as engineer.", "Er arbeitet als Ingenieur."]
  ]},

{ id: "there", level: "A1", title: "there is / there are",
  sum: "Es gibt … – so beschreibst du, was wo ist.",
  rules: [
    ["Einzahl", "<b>There is</b> (There's) a park near my house. – Es gibt einen Park …"],
    ["Mehrzahl", "<b>There are</b> two shops in the village."],
    ["Verneinung & Frage", "There <b>isn't</b> a bank here. · <b>Is there</b> a toilet? · <b>Are there</b> any free seats?"],
    ["Merke", "Nicht „It gives“ sagen! „Es gibt“ heißt immer <b>there is / there are</b>."]
  ],
  ex: [["There is a supermarket on the corner.", "An der Ecke gibt es einen Supermarkt."], ["There are no eggs in the fridge.", "Im Kühlschrank sind keine Eier."], ["Is there a pharmacy near here?", "Gibt es hier in der Nähe eine Apotheke?"]],
  drills: [
    ["c", "___ a bakery in our street.", "There is", ["There are", "It gives"], "In unserer Straße gibt es eine Bäckerei."],
    ["c", "___ many people at the party.", "There were", ["There was", "It gave"], "Auf der Party waren viele Leute."],
    ["c", "There ___ two chairs in the kitchen.", "are", ["is", "be"], "In der Küche stehen zwei Stühle."],
    ["c", "___ there a lift in the building?", "Is", ["Are", "Does"], "Gibt es im Gebäude einen Aufzug?"],
    ["c", "There ___ any milk left.", "isn't", ["aren't", "not"], "Es ist keine Milch mehr da."],
    ["r", "There are three bedrooms.", "It gives three bedrooms.", "Es gibt drei Schlafzimmer."],
    ["r", "Are there any questions?", "Is there any questions?", "Gibt es Fragen?"],
    ["b", "There is a problem with the machine.", "Es gibt ein Problem mit der Maschine."]
  ]},

{ id: "present-simple", level: "A1", title: "Present Simple",
  sum: "Gewohnheiten und Fakten: I work, he works.",
  rules: [
    ["Wann?", "Für Dinge, die <b>immer, regelmäßig</b> oder <b>allgemein</b> so sind: I work in production. Water boils at 100 degrees."],
    ["he/she/it: -s!", "Die wichtigste Regel: <b>he works</b>, <b>she lives</b>, <b>it costs</b>."],
    ["-es und -ies", "go → <b>goes</b>, watch → <b>watches</b>, do → <b>does</b>, study → <b>studies</b>, have → <b>has</b>"],
    ["Signalwörter", "every day, usually, often, always, never, on Mondays"]
  ],
  ex: [["I start work at six.", "Ich fange um sechs mit der Arbeit an."], ["My girlfriend works in an office.", "Meine Freundin arbeitet in einem Büro."], ["The bus leaves every ten minutes.", "Der Bus fährt alle zehn Minuten."]],
  drills: [
    ["c", "He ___ in a factory.", "works", ["work", "working"], "Er arbeitet in einer Fabrik."],
    ["c", "We ___ dinner at seven.", "have", ["has", "haves"], "Wir essen um sieben zu Abend."],
    ["c", "She ___ to the gym on Mondays.", "goes", ["gos", "go"], "Montags geht sie ins Fitnessstudio."],
    ["c", "My brother ___ in Berlin.", "lives", ["live", "living"], "Mein Bruder wohnt in Berlin."],
    ["c", "The shop ___ at nine.", "opens", ["open", "is open at"], "Der Laden öffnet um neun."],
    ["c", "Tom ___ TV every evening.", "watches", ["watchs", "watch"], "Tom schaut jeden Abend fern."],
    ["c", "She ___ English at university.", "studies", ["studys", "study"], "Sie studiert Englisch an der Uni."],
    ["r", "It costs ten euros.", "It cost ten euros every day.", "Es kostet zehn Euro."],
    ["r", "My boss has a new car.", "My boss have a new car.", "Mein Chef hat ein neues Auto."],
    ["b", "He usually drinks coffee in the morning.", "Er trinkt morgens meistens Kaffee."]
  ]},

{ id: "do-does", level: "A1", title: "Fragen & Verneinung mit do/does",
  sum: "Do you…? – I don't … – So fragst und verneinst du.",
  rules: [
    ["Verneinung", "<b>don't</b> + Grundform: I <b>don't</b> like fish. Bei he/she/it: <b>doesn't</b>: She <b>doesn't</b> work today."],
    ["Fragen", "<b>Do</b> you speak English? · <b>Does</b> he live here?"],
    ["Kein doppeltes -s", "Nach does/doesn't steht die <b>Grundform</b>: Does she <b>work</b>? (nicht: works)"],
    ["Mit Fragewort", "Where <b>do</b> you live? · What time <b>does</b> the train leave?"]
  ],
  ex: [["I don't eat meat.", "Ich esse kein Fleisch."], ["Does your girlfriend like cats?", "Mag deine Freundin Katzen?"], ["Where do you work?", "Wo arbeitest du?"]],
  drills: [
    ["c", "I ___ like coffee.", "don't", ["doesn't", "not"], "Ich mag keinen Kaffee."],
    ["c", "She ___ smoke.", "doesn't", ["don't", "isn't"], "Sie raucht nicht."],
    ["c", "___ you speak German?", "Do", ["Does", "Are"], "Sprichst du Deutsch?"],
    ["c", "___ he work on Saturdays?", "Does", ["Do", "Is"], "Arbeitet er samstags?"],
    ["c", "Does she ___ in London?", "live", ["lives", "living"], "Wohnt sie in London?"],
    ["c", "What time ___ the shop close?", "does", ["do", "is"], "Wann schließt der Laden?"],
    ["r", "He doesn't know the answer.", "He doesn't knows the answer.", "Er weiß die Antwort nicht."],
    ["r", "Do you have a pen?", "Have you a pen?", "Hast du einen Stift?"],
    ["b", "Where do you live?", "Wo wohnst du?"],
    ["b", "I don't understand the question.", "Ich verstehe die Frage nicht."]
  ]},

{ id: "some-any", level: "A1", title: "some, any, much, many",
  sum: "Mengen ausdrücken.",
  rules: [
    ["some", "In <b>positiven</b> Sätzen und Angeboten: I need <b>some</b> milk. Would you like <b>some</b> tea?"],
    ["any", "In <b>Fragen und Verneinungen</b>: Do we have <b>any</b> bread? There isn't <b>any</b> sugar."],
    ["many", "Bei <b>zählbaren</b> Dingen: <b>many</b> cars, how <b>many</b> eggs?"],
    ["much", "Bei <b>nicht zählbaren</b> Dingen: <b>much</b> money, how <b>much</b> time? Im positiven Satz meist <b>a lot of</b>."]
  ],
  ex: [["We need some potatoes.", "Wir brauchen ein paar Kartoffeln."], ["Is there any coffee left?", "Ist noch Kaffee da?"], ["How much does it cost?", "Wie viel kostet das?"]],
  drills: [
    ["c", "Can I have ___ water, please?", "some", ["any", "many"], "Kann ich bitte etwas Wasser haben?"],
    ["c", "We don't have ___ eggs.", "any", ["some", "much"], "Wir haben keine Eier."],
    ["c", "How ___ people work here?", "many", ["much", "lot"], "Wie viele Leute arbeiten hier?"],
    ["c", "How ___ is the ticket?", "much", ["many", "any"], "Wie viel kostet das Ticket?"],
    ["c", "I don't have ___ time today.", "much", ["many", "some"], "Ich habe heute nicht viel Zeit."],
    ["c", "There are ___ cars in the car park.", "a lot of", ["much", "any"], "Auf dem Parkplatz stehen viele Autos."],
    ["r", "Are there any questions?", "Are there some questions any?", "Gibt es Fragen?"],
    ["r", "I don't have much money.", "I don't have many money.", "Ich habe nicht viel Geld."],
    ["b", "Would you like some cake?", "Möchtest du etwas Kuchen?"]
  ]},

{ id: "present-continuous", level: "A1", title: "Present Continuous",
  sum: "Was gerade passiert: I'm working.",
  rules: [
    ["Bildung", "<b>am/is/are + Verb-ing</b>: I'<b>m working</b>. She'<b>s sleeping</b>. They'<b>re waiting</b>."],
    ["Wann?", "Für das, was <b>genau jetzt</b> oder <b>zurzeit</b> passiert: I'm learning English at the moment."],
    ["Signalwörter", "now, right now, at the moment, today, this week, Look!, Listen!"],
    ["Schreibweise", "make → mak<b>ing</b> · sit → si<b>tt</b>ing · run → ru<b>nn</b>ing · lie → l<b>ying</b>"]
  ],
  ex: [["I'm cooking right now.", "Ich koche gerade."], ["Look! It's snowing.", "Schau! Es schneit."], ["We're working a lot this week.", "Wir arbeiten diese Woche viel."]],
  drills: [
    ["c", "Be quiet! The baby ___.", "is sleeping", ["sleeps", "sleeping"], "Sei leise! Das Baby schläft."],
    ["c", "I ___ for the bus at the moment.", "am waiting", ["wait", "waiting"], "Ich warte gerade auf den Bus."],
    ["c", "They ___ TV right now.", "are watching", ["watch", "is watching"], "Sie schauen gerade fern."],
    ["c", "Listen! Someone ___ at the door.", "is knocking", ["knocks", "knocking"], "Hör mal! Jemand klopft an der Tür."],
    ["c", "What ___ you doing?", "are", ["do", "is"], "Was machst du gerade?"],
    ["c", "She is ___ on the sofa.", "sitting", ["siting", "sits"], "Sie sitzt auf dem Sofa."],
    ["r", "I'm working at the moment.", "I work at the moment now.", "Ich arbeite gerade."],
    ["r", "He usually walks, but today he's driving.", "He usually is walking, but today he drives.", "Normalerweise geht er zu Fuß, aber heute fährt er."],
    ["b", "We are learning English this year.", "Wir lernen dieses Jahr Englisch."]
  ]},

{ id: "can-like", level: "A1", title: "can & like + -ing",
  sum: "Fähigkeiten und Vorlieben.",
  rules: [
    ["can / can't", "können: I <b>can</b> swim. She <b>can't</b> drive. <b>Can</b> you help me? – Danach immer die Grundform."],
    ["Bitten", "<b>Can</b> I …? = Darf ich …? · <b>Could</b> you …? = Könnten Sie …? (höflicher)"],
    ["like/love/hate + -ing", "I <b>like cooking</b>. She <b>loves dancing</b>. He <b>hates waiting</b>."],
    ["would like", "<b>I'd like</b> = ich hätte gern / möchte: I'd like a coffee, please."]
  ],
  ex: [["I can speak a little English.", "Ich kann ein bisschen Englisch."], ["Could you repeat that, please?", "Könnten Sie das bitte wiederholen?"], ["I love playing football.", "Ich spiele total gern Fußball."]],
  drills: [
    ["c", "She ___ play the guitar very well.", "can", ["cans", "can to"], "Sie kann sehr gut Gitarre spielen."],
    ["c", "I can't ___ tonight.", "come", ["coming", "to come"], "Ich kann heute Abend nicht kommen."],
    ["c", "He likes ___ films.", "watching", ["watch", "watches"], "Er schaut gern Filme."],
    ["c", "I ___ a table for two, please.", "'d like", ["like", "liking"], "Ich hätte gern einen Tisch für zwei."],
    ["c", "___ you open the window, please?", "Could", ["Do", "Are"], "Könntest du bitte das Fenster öffnen?"],
    ["c", "We hate ___ up early.", "getting", ["get", "gets"], "Wir hassen frühes Aufstehen."],
    ["r", "Can you help me?", "Do you can help me?", "Kannst du mir helfen?"],
    ["r", "I'd like a glass of water.", "I like a glass of water now.", "Ich hätte gern ein Glas Wasser."],
    ["b", "Can I pay by card?", "Kann ich mit Karte zahlen?"]
  ]},

{ id: "prepositions-place", level: "A1", title: "in, on, at, next to … & Aufforderungen",
  sum: "Wo ist etwas? Und: Wege beschreiben.",
  rules: [
    ["in", "<b>in</b> = in etwas drin: in the box, in the kitchen, in London"],
    ["on", "<b>on</b> = auf einer Fläche: on the table, on the wall, on the second floor"],
    ["at", "<b>at</b> = an einem Punkt/Ort: at the door, at work, at home, at the station"],
    ["Weitere", "<b>next to</b> neben · <b>behind</b> hinter · <b>in front of</b> vor · <b>between</b> zwischen · <b>opposite</b> gegenüber"],
    ["Aufforderungen", "Einfach die Grundform: <b>Turn</b> left. <b>Go</b> straight on. <b>Don't</b> touch that!"]
  ],
  ex: [["The keys are on the table.", "Die Schlüssel liegen auf dem Tisch."], ["I'm at work until three.", "Ich bin bis drei auf der Arbeit."], ["Turn left and the bank is next to the café.", "Bieg links ab, die Bank ist neben dem Café."]],
  drills: [
    ["c", "The milk is ___ the fridge.", "in", ["on", "at"], "Die Milch ist im Kühlschrank."],
    ["c", "The picture is ___ the wall.", "on", ["in", "at"], "Das Bild hängt an der Wand."],
    ["c", "I'm ___ home tonight.", "at", ["in", "on"], "Ich bin heute Abend zu Hause."],
    ["c", "The bakery is ___ the bank and the post office.", "between", ["next", "opposite of"], "Die Bäckerei ist zwischen der Bank und der Post."],
    ["c", "Park your car ___ the house.", "in front of", ["in front", "before of"], "Park dein Auto vor dem Haus."],
    ["c", "___ the second street on the right.", "Take", ["Taking", "You taking"], "Nimm die zweite Straße rechts."],
    ["r", "Don't forget your keys!", "Not forget your keys!", "Vergiss deine Schlüssel nicht!"],
    ["r", "We live on the third floor.", "We live in the third floor.", "Wir wohnen im dritten Stock."],
    ["b", "The station is opposite the hotel.", "Der Bahnhof ist gegenüber dem Hotel."]
  ]},

/* ===================== A2 ===================== */
{ id: "adverbs-frequency", level: "A2", title: "always, usually, never …",
  sum: "Wie oft? Und wo stehen diese Wörter?",
  rules: [
    ["Die Wörter", "<b>always</b> (100 %) · <b>usually</b> · <b>often</b> · <b>sometimes</b> · <b>rarely</b> · <b>never</b> (0 %)"],
    ["Position", "<b>vor</b> dem normalen Verb: I <b>often</b> work late. She <b>never</b> drinks coffee."],
    ["Aber bei to be", "<b>nach</b> am/is/are: He <b>is always</b> on time. We <b>are usually</b> tired."],
    ["Längere Angaben", "every day, once a week, twice a month stehen am <b>Ende</b>: I go swimming <b>once a week</b>."]
  ],
  ex: [["I usually start at six.", "Ich fange meistens um sechs an."], ["She is never late.", "Sie kommt nie zu spät."], ["We eat out twice a month.", "Wir gehen zweimal im Monat essen."]],
  drills: [
    ["r", "I always drink tea in the morning.", "I drink always tea in the morning.", "Ich trinke morgens immer Tee."],
    ["r", "He is often tired after work.", "He often is tired after work.", "Er ist nach der Arbeit oft müde."],
    ["r", "We sometimes go to the cinema.", "We go sometimes to the cinema.", "Wir gehen manchmal ins Kino."],
    ["r", "I check my emails every day.", "I every day check my emails.", "Ich checke jeden Tag meine E-Mails."],
    ["c", "She ___ eats meat. She's a vegetarian.", "never", ["always", "often"], "Sie isst nie Fleisch. Sie ist Vegetarierin."],
    ["c", "They are ___ friendly.", "always", ["every day", "once"], "Sie sind immer freundlich."],
    ["c", "I go to the dentist ___ a year.", "twice", ["two", "second"], "Ich gehe zweimal im Jahr zum Zahnarzt."],
    ["b", "I usually get up at five.", "Ich stehe normalerweise um fünf auf."],
    ["b", "My boss is never in a hurry.", "Mein Chef ist nie in Eile."]
  ]},

{ id: "past-regular", level: "A2", title: "Past Simple: was/were & -ed",
  sum: "Über Vergangenes sprechen – die regelmäßigen Verben.",
  rules: [
    ["was / were", "I/he/she/it <b>was</b> · you/we/they <b>were</b>. Verneint: <b>wasn't, weren't</b>."],
    ["Regelmäßige Verben", "Einfach <b>-ed</b> anhängen: work → work<b>ed</b>, play → play<b>ed</b>, live → live<b>d</b>"],
    ["Schreibweise", "stop → sto<b>pped</b> · study → stud<b>ied</b> · plan → pla<b>nned</b>"],
    ["Signalwörter", "yesterday, last week, two days ago, in 2020, when I was a child"]
  ],
  ex: [["I was at home yesterday.", "Gestern war ich zu Hause."], ["We worked until ten last night.", "Wir haben gestern bis zehn gearbeitet."], ["They weren't happy with the result.", "Sie waren mit dem Ergebnis nicht zufrieden."]],
  drills: [
    ["c", "I ___ tired yesterday.", "was", ["were", "am"], "Ich war gestern müde."],
    ["c", "We ___ at the party last night.", "were", ["was", "are"], "Wir waren gestern Abend auf der Party."],
    ["c", "She ___ in Munich for two years.", "lived", ["lives", "liveed"], "Sie hat zwei Jahre in München gewohnt."],
    ["c", "The bus ___ suddenly.", "stopped", ["stoped", "stops"], "Der Bus hielt plötzlich an."],
    ["c", "I ___ for the exam all weekend.", "studied", ["studyed", "study"], "Ich habe das ganze Wochenende für die Prüfung gelernt."],
    ["c", "He ___ me two hours ago.", "called", ["calls", "callled"], "Er hat mich vor zwei Stunden angerufen."],
    ["c", "The weather ___ very good.", "wasn't", ["weren't", "didn't"], "Das Wetter war nicht sehr gut."],
    ["r", "We visited my parents last weekend.", "We visit my parents last weekend.", "Wir haben letztes Wochenende meine Eltern besucht."],
    ["b", "I worked late yesterday.", "Ich habe gestern lange gearbeitet."]
  ]},

{ id: "past-irregular", level: "A2", title: "Past Simple: unregelmäßige Verben",
  sum: "Die wichtigsten Verben haben eigene Formen.",
  rules: [
    ["Die Top 12", "go → <b>went</b> · have → <b>had</b> · do → <b>did</b> · make → <b>made</b> · get → <b>got</b> · see → <b>saw</b> · come → <b>came</b> · take → <b>took</b> · say → <b>said</b> · buy → <b>bought</b> · eat → <b>ate</b> · drink → <b>drank</b>"],
    ["Noch mehr", "give → <b>gave</b> · find → <b>found</b> · know → <b>knew</b> · think → <b>thought</b> · tell → <b>told</b> · leave → <b>left</b> · meet → <b>met</b> · pay → <b>paid</b> · sleep → <b>slept</b> · write → <b>wrote</b>"],
    ["Gleich für alle", "Die Form ist für alle Personen gleich: I <b>went</b>, she <b>went</b>, they <b>went</b>."]
  ],
  ex: [["We went to Italy last summer.", "Letzten Sommer sind wir nach Italien gefahren."], ["I bought a new phone.", "Ich habe ein neues Handy gekauft."], ["She told me the news.", "Sie hat mir die Neuigkeit erzählt."]],
  drills: [
    ["c", "Yesterday I ___ to the doctor.", "went", ["goed", "go"], "Gestern war ich beim Arzt."],
    ["c", "We ___ pizza last night.", "had", ["haved", "have"], "Wir hatten gestern Abend Pizza."],
    ["c", "He ___ a new car last month.", "bought", ["buyed", "buys"], "Er hat letzten Monat ein neues Auto gekauft."],
    ["c", "I ___ my old teacher in town.", "saw", ["seed", "seen"], "Ich habe meinen alten Lehrer in der Stadt gesehen."],
    ["c", "She ___ the house at seven.", "left", ["leaved", "leaves"], "Sie hat das Haus um sieben verlassen."],
    ["c", "They ___ us a present.", "gave", ["gived", "give"], "Sie haben uns ein Geschenk gegeben."],
    ["c", "I ___ badly last night.", "slept", ["sleeped", "sleep"], "Ich habe letzte Nacht schlecht geschlafen."],
    ["c", "He ___ it was a good idea.", "thought", ["thinked", "thinks"], "Er dachte, es sei eine gute Idee."],
    ["r", "We met at a party.", "We meeted at a party.", "Wir haben uns auf einer Party kennengelernt."],
    ["b", "I paid the bill yesterday.", "Ich habe die Rechnung gestern bezahlt."]
  ]},

{ id: "past-questions", level: "A2", title: "Past Simple: Fragen & Verneinung",
  sum: "Did you …? – I didn't …",
  rules: [
    ["Verneinung", "<b>didn't</b> + Grundform: I <b>didn't go</b>. She <b>didn't see</b> it."],
    ["Fragen", "<b>Did</b> + Person + Grundform: <b>Did</b> you <b>sleep</b> well? Where <b>did</b> you <b>go</b>?"],
    ["Häufiger Fehler", "Nach did <b>nie</b> die Vergangenheitsform: Did you <b>go</b>? (nicht: Did you went?)"],
    ["Ausnahme was/were", "Bei to be ohne did: <b>Were</b> you at home? I <b>wasn't</b> there."]
  ],
  ex: [["Did you have a nice weekend?", "Hattest du ein schönes Wochenende?"], ["I didn't hear the alarm.", "Ich habe den Wecker nicht gehört."], ["What did he say?", "Was hat er gesagt?"]],
  drills: [
    ["c", "I ___ see the email.", "didn't", ["don't", "wasn't"], "Ich habe die E-Mail nicht gesehen."],
    ["c", "Did you ___ the film?", "like", ["liked", "likes"], "Hat dir der Film gefallen?"],
    ["c", "Where ___ you go on holiday?", "did", ["do", "were"], "Wohin bist du in den Urlaub gefahren?"],
    ["c", "She didn't ___ anything.", "say", ["said", "says"], "Sie hat nichts gesagt."],
    ["c", "___ you at work yesterday?", "Were", ["Did", "Was"], "Warst du gestern auf der Arbeit?"],
    ["c", "What time ___ the meeting start?", "did", ["was", "does it"], "Wann hat die Besprechung angefangen?"],
    ["r", "Did you call him?", "Did you called him?", "Hast du ihn angerufen?"],
    ["r", "We didn't have time.", "We hadn't time.", "Wir hatten keine Zeit."],
    ["b", "Did you sleep well?", "Hast du gut geschlafen?"],
    ["b", "I didn't know that.", "Das wusste ich nicht."]
  ]},

{ id: "going-to", level: "A2", title: "Zukunft mit going to",
  sum: "Pläne und Absichten.",
  rules: [
    ["Bildung", "<b>am/is/are going to</b> + Grundform: I'<b>m going to</b> visit my parents."],
    ["Wann?", "Für <b>Pläne</b>, die schon feststehen, und für Dinge, die man <b>kommen sieht</b>: Look at the clouds – it's <b>going to rain</b>."],
    ["Feste Termine", "Für verabredete Termine oft auch Present Continuous: I'<b>m meeting</b> Tom tomorrow."],
    ["Umgangssprache", "Gesprochen klingt es oft wie <b>gonna</b> – schreiben solltest du going to."]
  ],
  ex: [["We're going to buy a new sofa.", "Wir werden ein neues Sofa kaufen."], ["I'm not going to work this weekend.", "Dieses Wochenende arbeite ich nicht."], ["Are you going to call her?", "Rufst du sie an?"]],
  drills: [
    ["c", "I'm going to ___ more English.", "learn", ["learning", "learned"], "Ich werde mehr Englisch lernen."],
    ["c", "She ___ going to start a new job.", "is", ["are", "will"], "Sie wird eine neue Stelle anfangen."],
    ["c", "We ___ going to stay at home tonight.", "are", ["is", "do"], "Wir bleiben heute Abend zu Hause."],
    ["c", "Look at the sky! It's going to ___.", "rain", ["raining", "rains"], "Schau dir den Himmel an! Es wird regnen."],
    ["c", "What ___ you going to do on Saturday?", "are", ["do", "will"], "Was machst du am Samstag?"],
    ["c", "I'm ___ my brother tomorrow.", "meeting", ["meet", "meets"], "Ich treffe morgen meinen Bruder."],
    ["r", "He isn't going to come.", "He doesn't going to come.", "Er wird nicht kommen."],
    ["r", "We're going to paint the kitchen.", "We going to paint the kitchen.", "Wir werden die Küche streichen."],
    ["b", "I am going to call my boss.", "Ich werde meinen Chef anrufen."]
  ]},

{ id: "will", level: "A2", title: "Zukunft mit will",
  sum: "Vorhersagen, Versprechen, spontane Entscheidungen.",
  rules: [
    ["Bildung", "<b>will</b> + Grundform, für alle Personen gleich: I <b>will</b> (I'll) help you. Verneint: <b>won't</b>."],
    ["Spontan", "Entscheidung im Moment: The phone is ringing. – <b>I'll</b> get it!"],
    ["Vorhersage & Versprechen", "I think it <b>will</b> be cold tomorrow. · I <b>won't</b> tell anyone."],
    ["will oder going to?", "Plan schon vorher gefasst → going to. Gerade erst entschieden → will."]
  ],
  ex: [["I'll call you later.", "Ich ruf dich später an."], ["It will probably rain tomorrow.", "Morgen regnet es wahrscheinlich."], ["Don't worry, I won't forget.", "Keine Sorge, ich vergesse es nicht."]],
  drills: [
    ["c", "It's cold. I ___ close the window.", "'ll", ["'m going", "am"], "Es ist kalt. Ich mache das Fenster zu."],
    ["c", "I think she ___ like the present.", "will", ["is", "does"], "Ich glaube, ihr wird das Geschenk gefallen."],
    ["c", "Don't worry, I ___ be late.", "won't", ["will not to", "don't"], "Keine Sorge, ich komme nicht zu spät."],
    ["c", "Will you ___ me with this box?", "help", ["helping", "to help"], "Hilfst du mir mit dieser Kiste?"],
    ["c", "We've bought the tickets. We ___ fly to Spain.", "are going to", ["will", "'ll"], "Wir haben die Tickets gekauft. Wir fliegen nach Spanien."],
    ["r", "I'll pay for the coffee.", "I will paying for the coffee.", "Ich zahle den Kaffee."],
    ["r", "Will it be expensive?", "Will it is expensive?", "Wird es teuer?"],
    ["b", "I will send you the file tomorrow.", "Ich schicke dir die Datei morgen."]
  ]},

{ id: "comparison", level: "A2", title: "Steigerung: bigger, more, the best",
  sum: "Dinge vergleichen.",
  rules: [
    ["Kurze Adjektive", "<b>-er / the -est</b>: cheap → cheap<b>er</b> → the cheap<b>est</b> · big → bi<b>gger</b> · easy → eas<b>ier</b>"],
    ["Lange Adjektive", "<b>more / the most</b>: expensive → <b>more</b> expensive → <b>the most</b> expensive"],
    ["Unregelmäßig", "good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b> · far → <b>further</b>"],
    ["Vergleich", "<b>than</b> = als: Tea is cheaper <b>than</b> coffee. · <b>as … as</b> = so … wie: He's <b>as</b> tall <b>as</b> me."]
  ],
  ex: [["The train is faster than the bus.", "Der Zug ist schneller als der Bus."], ["This is the best pizza in town.", "Das ist die beste Pizza der Stadt."], ["My job is more interesting now.", "Mein Job ist jetzt interessanter."]],
  drills: [
    ["c", "My flat is ___ than yours.", "bigger", ["biger", "more big"], "Meine Wohnung ist größer als deine."],
    ["c", "This phone is ___ than the old one.", "more expensive", ["expensiver", "most expensive"], "Dieses Handy ist teurer als das alte."],
    ["c", "Today is ___ than yesterday.", "better", ["gooder", "more good"], "Heute ist es besser als gestern."],
    ["c", "It was the ___ day of my life.", "worst", ["baddest", "most bad"], "Es war der schlimmste Tag meines Lebens."],
    ["c", "English is ___ than German for me.", "easier", ["easyer", "more easy"], "Englisch ist für mich leichter als Deutsch."],
    ["c", "He is older ___ his sister.", "than", ["then", "as"], "Er ist älter als seine Schwester."],
    ["c", "She is ___ tall as her mother.", "as", ["so", "than"], "Sie ist so groß wie ihre Mutter."],
    ["r", "This is the most important meeting.", "This is the importantest meeting.", "Das ist die wichtigste Besprechung."],
    ["b", "Summer is warmer than spring.", "Der Sommer ist wärmer als der Frühling."]
  ]},

{ id: "modals-must", level: "A2", title: "must, have to, should",
  sum: "Müssen, sollen, nicht dürfen.",
  rules: [
    ["have to", "müssen (Regel, von außen): I <b>have to</b> work on Saturday. She <b>has to</b> wear gloves."],
    ["must", "müssen (eigene Überzeugung, Schilder): I <b>must</b> call my mum. You <b>must</b> wear a helmet."],
    ["Achtung!", "<b>mustn't</b> = nicht dürfen! · <b>don't have to</b> = nicht müssen (nicht nötig)."],
    ["should", "sollte (Rat): You <b>should</b> see a doctor. You <b>shouldn't</b> work so much."]
  ],
  ex: [["I have to get up at five tomorrow.", "Ich muss morgen um fünf aufstehen."], ["You mustn't smoke here.", "Hier darfst du nicht rauchen."], ["You don't have to come if you're tired.", "Du musst nicht kommen, wenn du müde bist."]],
  drills: [
    ["c", "You ___ smoke in the factory. It's forbidden.", "mustn't", ["don't have to", "shouldn't to"], "In der Fabrik darfst du nicht rauchen. Es ist verboten."],
    ["c", "It's Sunday. I ___ get up early.", "don't have to", ["mustn't", "haven't"], "Es ist Sonntag. Ich muss nicht früh aufstehen."],
    ["c", "She ___ work tomorrow.", "has to", ["have to", "must to"], "Sie muss morgen arbeiten."],
    ["c", "You look ill. You ___ go home.", "should", ["must to", "have"], "Du siehst krank aus. Du solltest nach Hause gehen."],
    ["c", "Do I ___ pay now?", "have to", ["must", "should to"], "Muss ich jetzt bezahlen?"],
    ["c", "You ___ eat so much sugar.", "shouldn't", ["don't should", "mustn't to"], "Du solltest nicht so viel Zucker essen."],
    ["r", "We had to wait for an hour.", "We must waited for an hour.", "Wir mussten eine Stunde warten."],
    ["r", "Workers must wear safety shoes.", "Workers must to wear safety shoes.", "Arbeiter müssen Sicherheitsschuhe tragen."],
    ["b", "You should drink more water.", "Du solltest mehr Wasser trinken."]
  ]},

{ id: "prepositions-time", level: "A2", title: "in, on, at bei Zeitangaben",
  sum: "Wann? Die richtige Präposition.",
  rules: [
    ["at", "Uhrzeiten & Zeitpunkte: <b>at</b> 6 o'clock, <b>at</b> night, <b>at</b> the weekend (britisch), <b>at</b> Christmas"],
    ["on", "Tage & Daten: <b>on</b> Monday, <b>on</b> 3 May, <b>on</b> my birthday, <b>on</b> Friday evening"],
    ["in", "Längere Zeiträume: <b>in</b> May, <b>in</b> 2027, <b>in</b> the morning, <b>in</b> summer, <b>in</b> two weeks"],
    ["Ohne Präposition", "Kein in/on/at vor <b>today, tomorrow, yesterday, next/last …, this …, every …</b>"]
  ],
  ex: [["The meeting is on Tuesday at ten.", "Die Besprechung ist am Dienstag um zehn."], ["The new course starts in February.", "Der neue Kurs beginnt im Februar."], ["See you next week!", "Bis nächste Woche!"]],
  drills: [
    ["c", "My shift starts ___ 6 a.m.", "at", ["on", "in"], "Meine Schicht beginnt um 6 Uhr."],
    ["c", "We're closed ___ Sundays.", "on", ["at", "in"], "Sonntags haben wir geschlossen."],
    ["c", "I was born ___ 1999.", "in", ["on", "at"], "Ich bin 1999 geboren."],
    ["c", "I'll see you ___ the morning.", "in", ["on", "at"], "Wir sehen uns morgen früh."],
    ["c", "The party is ___ 14 March.", "on", ["in", "at"], "Die Party ist am 14. März."],
    ["c", "I can't sleep ___ night.", "at", ["in", "on"], "Ich kann nachts nicht schlafen."],
    ["r", "I'm visiting them next weekend.", "I'm visiting them on next weekend.", "Ich besuche sie nächstes Wochenende."],
    ["r", "The course starts in two weeks.", "The course starts on two weeks.", "Der Kurs beginnt in zwei Wochen."],
    ["b", "The delivery comes on Friday morning.", "Die Lieferung kommt am Freitagmorgen."]
  ]},

{ id: "question-words", level: "A2", title: "Fragewörter",
  sum: "Who, what, where, when, why, how …",
  rules: [
    ["Die wichtigsten", "<b>who</b> wer · <b>what</b> was · <b>where</b> wo/wohin · <b>when</b> wann · <b>why</b> warum · <b>which</b> welche(r) · <b>whose</b> wessen"],
    ["Mit how", "<b>how</b> wie · <b>how much</b> wie viel · <b>how many</b> wie viele · <b>how long</b> wie lange · <b>how often</b> wie oft · <b>how old</b> wie alt"],
    ["Satzbau", "Fragewort + Hilfsverb + Person + Verb: Where <b>do you</b> work? Why <b>is he</b> late?"],
    ["Who als Subjekt", "Fragt who nach der handelnden Person, kein do: <b>Who called</b> you? (nicht: Who did call you?)"]
  ],
  ex: [["How long does the journey take?", "Wie lange dauert die Fahrt?"], ["Why are you laughing?", "Warum lachst du?"], ["Which bus goes to the station?", "Welcher Bus fährt zum Bahnhof?"]],
  drills: [
    ["c", "___ old are you?", "How", ["What", "Which"], "Wie alt bist du?"],
    ["c", "___ do you go to the gym? – Twice a week.", "How often", ["How long", "When often"], "Wie oft gehst du ins Fitnessstudio? – Zweimal pro Woche."],
    ["c", "___ is your birthday? – In March.", "When", ["Where", "Who"], "Wann hast du Geburtstag? – Im März."],
    ["c", "___ car is this? – It's Tom's.", "Whose", ["Who's", "Who"], "Wessen Auto ist das? – Es ist Toms."],
    ["c", "___ didn't you come? – I was ill.", "Why", ["What", "How"], "Warum bist du nicht gekommen? – Ich war krank."],
    ["c", "___ brothers and sisters do you have?", "How many", ["How much", "How lot"], "Wie viele Geschwister hast du?"],
    ["r", "Who called you?", "Who did call you?", "Wer hat dich angerufen?"],
    ["r", "Where does she work?", "Where she works?", "Wo arbeitet sie?"],
    ["b", "How long have you been here?", "Wie lange bist du schon hier?"]
  ]},

{ id: "adverbs-manner", level: "A2", title: "Adjektiv oder Adverb?",
  sum: "quick oder quickly?",
  rules: [
    ["Adjektiv", "Beschreibt ein <b>Ding/eine Person</b>: a <b>careful</b> driver, the work is <b>easy</b>."],
    ["Adverb", "Beschreibt, <b>wie</b> jemand etwas tut: He drives <b>carefully</b>. Speak <b>slowly</b>, please."],
    ["Bildung", "Meist <b>-ly</b>: quick → quick<b>ly</b> · easy → eas<b>ily</b> · careful → careful<b>ly</b>"],
    ["Ausnahmen", "good → <b>well</b> · fast → <b>fast</b> · hard → <b>hard</b> · late → <b>late</b>"]
  ],
  ex: [["She speaks English very well.", "Sie spricht sehr gut Englisch."], ["Please drive carefully.", "Bitte fahr vorsichtig."], ["He works hard.", "Er arbeitet hart."]],
  drills: [
    ["c", "He speaks very ___.", "quickly", ["quick", "quicker"], "Er spricht sehr schnell."],
    ["c", "You did that ___!", "well", ["good", "goodly"], "Das hast du gut gemacht!"],
    ["c", "The test was ___.", "easy", ["easily", "easyly"], "Der Test war einfach."],
    ["c", "Please check the parts ___.", "carefully", ["careful", "carefuly"], "Bitte prüf die Teile sorgfältig."],
    ["c", "We worked ___ all day.", "hard", ["hardly", "hardy"], "Wir haben den ganzen Tag hart gearbeitet."],
    ["c", "She is a ___ driver.", "careful", ["carefully", "care"], "Sie ist eine vorsichtige Fahrerin."],
    ["r", "Could you speak more slowly?", "Could you speak more slow?", "Könnten Sie langsamer sprechen?"],
    ["r", "I feel good today.", "I feel goodly today.", "Ich fühle mich heute gut."],
    ["b", "He finished the job quickly.", "Er hat die Arbeit schnell erledigt."]
  ]},

/* ===================== B1 ===================== */
{ id: "present-perfect", level: "B1", title: "Present Perfect",
  sum: "Have you ever …? – Erfahrungen und Ergebnisse.",
  rules: [
    ["Bildung", "<b>have/has + 3. Form</b>: I <b>have seen</b> it. She <b>has finished</b>. (3. Form: worked, been, done, seen, eaten, written …)"],
    ["Erfahrungen", "Wenn <b>nicht wichtig ist, wann</b>: <b>Have</b> you <b>ever been</b> to London? I'<b>ve never eaten</b> sushi."],
    ["Ergebnis jetzt", "Etwas ist passiert und wirkt jetzt nach: I'<b>ve lost</b> my keys. (= ich habe sie jetzt nicht)"],
    ["Signalwörter", "ever, never, already, yet, just, so far"],
    ["Nicht mit Zeitpunkt!", "Bei <b>yesterday, last week, in 2020</b> → Past Simple: I <b>saw</b> it yesterday."]
  ],
  ex: [["Have you ever been to England?", "Warst du schon mal in England?"], ["I've just finished work.", "Ich habe gerade Feierabend gemacht."], ["She hasn't called yet.", "Sie hat noch nicht angerufen."]],
  drills: [
    ["c", "I ___ never been to America.", "have", ["has", "am"], "Ich war noch nie in Amerika."],
    ["c", "She ___ already eaten.", "has", ["have", "is"], "Sie hat schon gegessen."],
    ["c", "Have you ___ the new film?", "seen", ["saw", "see"], "Hast du den neuen Film gesehen?"],
    ["c", "I've ___ my homework.", "done", ["did", "do"], "Ich habe meine Hausaufgaben gemacht."],
    ["c", "We haven't finished ___.", "yet", ["already", "ever"], "Wir sind noch nicht fertig."],
    ["c", "I ___ him yesterday.", "saw", ["have seen", "seen"], "Ich habe ihn gestern gesehen."],
    ["c", "He has ___ written the report.", "just", ["yet", "ever"], "Er hat den Bericht gerade geschrieben."],
    ["r", "Have you ever tried Indian food?", "Did you ever tried Indian food?", "Hast du schon mal indisches Essen probiert?"],
    ["r", "I lost my wallet last week.", "I have lost my wallet last week.", "Ich habe letzte Woche meinen Geldbeutel verloren."],
    ["b", "I have already sent the email.", "Ich habe die E-Mail schon geschickt."]
  ]},

{ id: "for-since", level: "B1", title: "for & since",
  sum: "Seit wann? Seit wie lange?",
  rules: [
    ["Deutsch: „seit“", "Im Englischen steht dabei <b>Present Perfect</b>, nicht Gegenwart: I <b>have lived</b> here for five years. (nicht: I live here since …)"],
    ["for", "Zeit<b>dauer</b>: <b>for</b> two years, <b>for</b> ten minutes, <b>for</b> a long time"],
    ["since", "Zeit<b>punkt</b>: <b>since</b> 2019, <b>since</b> Monday, <b>since</b> I was a child"],
    ["How long …?", "<b>How long have you</b> worked here?"]
  ],
  ex: [["I've worked here since 2020.", "Ich arbeite hier seit 2020."], ["We've known each other for ten years.", "Wir kennen uns seit zehn Jahren."], ["How long have you lived in this town?", "Wie lange wohnst du schon in dieser Stadt?"]],
  drills: [
    ["c", "I've lived here ___ 2018.", "since", ["for", "from"], "Ich wohne hier seit 2018."],
    ["c", "She's been ill ___ three days.", "for", ["since", "ago"], "Sie ist seit drei Tagen krank."],
    ["c", "We've been together ___ we were 20.", "since", ["for", "from"], "Wir sind zusammen, seit wir 20 sind."],
    ["c", "How long ___ you known him?", "have", ["do", "are"], "Wie lange kennst du ihn schon?"],
    ["c", "I ___ here for six years.", "have worked", ["work", "am working"], "Ich arbeite hier seit sechs Jahren."],
    ["c", "He left two hours ___.", "ago", ["for", "since"], "Er ist vor zwei Stunden gegangen."],
    ["r", "I've known her since school.", "I know her since school.", "Ich kenne sie seit der Schule."],
    ["r", "They have been married for years.", "They are married since years.", "Sie sind seit Jahren verheiratet."],
    ["b", "I have had this car for five years.", "Ich habe dieses Auto seit fünf Jahren."]
  ]},

{ id: "past-continuous", level: "B1", title: "Past Continuous",
  sum: "Was war gerade im Gange, als …?",
  rules: [
    ["Bildung", "<b>was/were + -ing</b>: I <b>was working</b>. They <b>were sleeping</b>."],
    ["Hintergrund", "Eine Handlung lief gerade, als etwas anderes <b>dazwischenkam</b>: I <b>was cooking</b> when the phone <b>rang</b>."],
    ["while", "Zwei Dinge gleichzeitig: <b>While</b> I was driving, she was sleeping."],
    ["Merke", "Lange Handlung → Past Continuous. Kurzes Ereignis → Past Simple."]
  ],
  ex: [["I was having a shower when you called.", "Ich war gerade unter der Dusche, als du angerufen hast."], ["What were you doing at eight?", "Was hast du um acht gemacht?"], ["It was raining all day.", "Es hat den ganzen Tag geregnet."]],
  drills: [
    ["c", "I ___ TV when the lights went out.", "was watching", ["watched", "were watching"], "Ich habe gerade ferngesehen, als das Licht ausging."],
    ["c", "They ___ dinner at 8 o'clock.", "were having", ["was having", "had having"], "Um 8 Uhr haben sie gerade gegessen."],
    ["c", "While she was driving, it started ___.", "to snow", ["snowing to", "snow"], "Während sie fuhr, fing es an zu schneien."],
    ["c", "He fell while he ___.", "was running", ["ran", "runs"], "Er ist beim Laufen hingefallen."],
    ["c", "What ___ you doing when I called?", "were", ["was", "did"], "Was hast du gemacht, als ich angerufen habe?"],
    ["r", "I was sleeping when the alarm went off.", "I slept when the alarm was going off.", "Ich schlief, als der Alarm losging."],
    ["r", "We met while we were working in Frankfurt.", "We were meeting while we worked in Frankfurt.", "Wir haben uns kennengelernt, als wir in Frankfurt gearbeitet haben."],
    ["b", "The machine stopped while I was working.", "Die Maschine blieb stehen, während ich arbeitete."]
  ]},

{ id: "conditional-1", level: "B1", title: "If-Sätze Typ 0 & 1",
  sum: "Was passiert, wenn …?",
  rules: [
    ["Typ 0 – immer wahr", "<b>If + Gegenwart, Gegenwart</b>: If you heat ice, it melts."],
    ["Typ 1 – realistisch", "<b>If + Gegenwart, will + Grundform</b>: If it rains, we <b>will</b> stay at home."],
    ["Kein will im if-Teil!", "If I <b>see</b> him, I'll tell him. (nicht: If I will see him)"],
    ["unless", "<b>unless</b> = wenn nicht: We'll be late <b>unless</b> we hurry."]
  ],
  ex: [["If you press this button, the machine stops.", "Wenn du diesen Knopf drückst, stoppt die Maschine."], ["If I have time, I'll call you.", "Wenn ich Zeit habe, ruf ich dich an."], ["I won't go unless you come too.", "Ich gehe nicht, wenn du nicht mitkommst."]],
  drills: [
    ["c", "If it ___ tomorrow, we'll stay inside.", "rains", ["will rain", "rained"], "Wenn es morgen regnet, bleiben wir drinnen."],
    ["c", "If you study, you ___ pass the test.", "will", ["would", "are"], "Wenn du lernst, bestehst du die Prüfung."],
    ["c", "If you mix red and blue, you ___ purple.", "get", ["got", "would get"], "Wenn man Rot und Blau mischt, bekommt man Lila."],
    ["c", "I'll be angry if he ___ late again.", "is", ["will be", "was"], "Ich werde sauer, wenn er wieder zu spät kommt."],
    ["c", "We'll miss the bus ___ we leave now.", "unless", ["if", "when not"], "Wir verpassen den Bus, wenn wir nicht jetzt gehen."],
    ["r", "If I see her, I'll tell her.", "If I will see her, I'll tell her.", "Wenn ich sie sehe, sag ich es ihr."],
    ["r", "What will you do if you lose your job?", "What do you will do if you lose your job?", "Was machst du, wenn du deinen Job verlierst?"],
    ["b", "If you need help, call me.", "Wenn du Hilfe brauchst, ruf mich an."]
  ]},

{ id: "conditional-2", level: "B1", title: "If-Sätze Typ 2",
  sum: "Was wäre, wenn …? – Träume und Unwahrscheinliches.",
  rules: [
    ["Bildung", "<b>If + Past Simple, would + Grundform</b>: If I <b>had</b> more money, I <b>would</b> buy a house."],
    ["Bedeutung", "Für Dinge, die <b>nicht real</b> oder <b>unwahrscheinlich</b> sind (jetzt oder in Zukunft)."],
    ["were", "Bei to be oft <b>were</b> für alle: If I <b>were</b> you, I would take the job."],
    ["Kurzform", "I would → <b>I'd</b> · would not → <b>wouldn't</b>"]
  ],
  ex: [["If I won the lottery, I would travel the world.", "Wenn ich im Lotto gewinnen würde, würde ich um die Welt reisen."], ["If I were you, I'd ask the boss.", "An deiner Stelle würde ich den Chef fragen."], ["What would you do if you had more time?", "Was würdest du machen, wenn du mehr Zeit hättest?"]],
  drills: [
    ["c", "If I ___ rich, I would stop working.", "were", ["am", "would be"], "Wenn ich reich wäre, würde ich aufhören zu arbeiten."],
    ["c", "If she had a car, she ___ drive to work.", "would", ["will", "had"], "Wenn sie ein Auto hätte, würde sie zur Arbeit fahren."],
    ["c", "If I ___ his number, I would call him.", "knew", ["know", "would know"], "Wenn ich seine Nummer wüsste, würde ich ihn anrufen."],
    ["c", "What would you do if you ___ the boss?", "were", ["are", "will be"], "Was würdest du tun, wenn du der Chef wärst?"],
    ["c", "I ___ buy that phone. It's too expensive.", "wouldn't", ["won't to", "don't would"], "Ich würde das Handy nicht kaufen. Es ist zu teuer."],
    ["r", "If I had time, I would help you.", "If I would have time, I would help you.", "Wenn ich Zeit hätte, würde ich dir helfen."],
    ["r", "If I were you, I'd take the job.", "If I am you, I'd take the job.", "An deiner Stelle würde ich die Stelle nehmen."],
    ["b", "If I lived in London, I would speak better English.", "Wenn ich in London wohnen würde, würde ich besser Englisch sprechen."]
  ]},

{ id: "passive", level: "B1", title: "Passiv",
  sum: "Es wird gemacht – wichtig für Arbeit und Technik.",
  rules: [
    ["Bildung", "<b>to be + 3. Form</b>: The parts <b>are made</b> in Germany. The car <b>was repaired</b> yesterday."],
    ["Wann?", "Wenn die <b>Handlung</b> wichtiger ist als die Person – typisch für Produktion, Prozesse, Nachrichten."],
    ["by", "Wer es tut, kommt mit <b>by</b>: The film was directed <b>by</b> Spielberg."],
    ["Zeiten", "is made (Gegenwart) · was made (Vergangenheit) · has been made · will be made"]
  ],
  ex: [["The products are checked twice.", "Die Produkte werden zweimal geprüft."], ["The order was delivered on Monday.", "Die Bestellung wurde am Montag geliefert."], ["The machine will be repaired tomorrow.", "Die Maschine wird morgen repariert."]],
  drills: [
    ["c", "English ___ all over the world.", "is spoken", ["speaks", "is speaking"], "Englisch wird auf der ganzen Welt gesprochen."],
    ["c", "The parts ___ yesterday.", "were delivered", ["delivered", "are delivered"], "Die Teile wurden gestern geliefert."],
    ["c", "This bridge was built ___ 1950.", "in", ["by", "at"], "Diese Brücke wurde 1950 gebaut."],
    ["c", "The email was written ___ my boss.", "by", ["from", "of"], "Die E-Mail wurde von meinem Chef geschrieben."],
    ["c", "The results will ___ next week.", "be published", ["published", "being published"], "Die Ergebnisse werden nächste Woche veröffentlicht."],
    ["c", "All machines ___ every morning.", "are cleaned", ["clean", "are clean"], "Alle Maschinen werden jeden Morgen gereinigt."],
    ["r", "My car was stolen last night.", "My car stole last night.", "Mein Auto wurde letzte Nacht gestohlen."],
    ["r", "The meeting has been cancelled.", "The meeting has cancelled by.", "Die Besprechung wurde abgesagt."],
    ["b", "The boxes are packed by hand.", "Die Kartons werden von Hand gepackt."]
  ]},

{ id: "relative", level: "B1", title: "Relativsätze: who, which, that",
  sum: "Der Mann, der … – Dinge genauer beschreiben.",
  rules: [
    ["who", "für <b>Personen</b>: The woman <b>who</b> lives next door is a nurse."],
    ["which", "für <b>Dinge und Tiere</b>: The car <b>which</b> I bought is red."],
    ["that", "geht für <b>beides</b> (im Alltag sehr häufig): The man <b>that</b> called … · The film <b>that</b> we saw …"],
    ["where & whose", "<b>where</b> für Orte: the town <b>where</b> I grew up · <b>whose</b> = dessen/deren: the man <b>whose</b> car was stolen"]
  ],
  ex: [["That's the colleague who helped me.", "Das ist der Kollege, der mir geholfen hat."], ["The machine that we use is new.", "Die Maschine, die wir benutzen, ist neu."], ["This is the café where we met.", "Das ist das Café, wo wir uns kennengelernt haben."]],
  drills: [
    ["c", "The man ___ called you is my boss.", "who", ["which", "where"], "Der Mann, der dich angerufen hat, ist mein Chef."],
    ["c", "The book ___ I'm reading is great.", "which", ["who", "where"], "Das Buch, das ich lese, ist toll."],
    ["c", "That's the hospital ___ I was born.", "where", ["which", "who"], "Das ist das Krankenhaus, in dem ich geboren wurde."],
    ["c", "She's the woman ___ son plays with mine.", "whose", ["who's", "which"], "Sie ist die Frau, deren Sohn mit meinem spielt."],
    ["c", "I need a tool ___ can cut metal.", "that", ["who", "where"], "Ich brauche ein Werkzeug, das Metall schneiden kann."],
    ["r", "The people who work here are friendly.", "The people which work here are friendly.", "Die Leute, die hier arbeiten, sind freundlich."],
    ["r", "Is this the bus that goes to the airport?", "Is this the bus who goes to the airport?", "Ist das der Bus, der zum Flughafen fährt?"],
    ["b", "I have a friend who lives in London.", "Ich habe einen Freund, der in London lebt."]
  ]},

{ id: "reported", level: "B1", title: "Indirekte Rede",
  sum: "Er sagte, dass … – Gesagtes weitergeben.",
  rules: [
    ["Zeit rutscht zurück", "„I <b>am</b> tired.“ → He said (that) he <b>was</b> tired. · „I <b>work</b> here.“ → She said she <b>worked</b> there."],
    ["Weitere Rückschritte", "will → <b>would</b> · can → <b>could</b> · Past Simple / Present Perfect → <b>had + 3. Form</b>"],
    ["say oder tell?", "<b>say</b> something · <b>tell somebody</b> something: He <b>told me</b> that … / He <b>said</b> that …"],
    ["Fragen", "Ohne Fragestellung: She asked <b>where I lived</b>. · He asked <b>if</b> I was ready."]
  ],
  ex: [["She said she would call later.", "Sie sagte, sie würde später anrufen."], ["He told me he was ill.", "Er sagte mir, er sei krank."], ["My boss asked if I could work on Saturday.", "Mein Chef fragte, ob ich am Samstag arbeiten könnte."]],
  drills: [
    ["c", "„I'm hungry.“ → She said she ___ hungry.", "was", ["is", "were"], "Sie sagte, sie habe Hunger."],
    ["c", "„I will help you.“ → He said he ___ help me.", "would", ["will", "can"], "Er sagte, er würde mir helfen."],
    ["c", "„I can't come.“ → She said she ___ come.", "couldn't", ["can't", "doesn't"], "Sie sagte, sie könne nicht kommen."],
    ["c", "He ___ me that he was leaving.", "told", ["said", "say"], "Er sagte mir, dass er geht."],
    ["c", "She ___ that she was tired.", "said", ["told", "told to"], "Sie sagte, dass sie müde sei."],
    ["c", "He asked me ___ I was okay.", "if", ["that", "do"], "Er fragte mich, ob es mir gut gehe."],
    ["r", "She asked where I lived.", "She asked where did I live.", "Sie fragte, wo ich wohne."],
    ["r", "He said he had finished the work.", "He said me he had finished the work.", "Er sagte, er habe die Arbeit beendet."],
    ["b", "She told me she was busy.", "Sie sagte mir, sie sei beschäftigt."]
  ]},

{ id: "gerund-infinitive", level: "B1", title: "-ing oder to + Verb?",
  sum: "I enjoy working – I want to work.",
  rules: [
    ["+ -ing", "nach <b>enjoy, finish, stop, avoid, mind, suggest, keep</b> und nach Präpositionen: I <b>enjoy cooking</b>. Thanks <b>for helping</b>."],
    ["+ to", "nach <b>want, need, decide, hope, plan, try, learn, forget, promise, would like</b>: I <b>want to learn</b> English."],
    ["Wichtiger Unterschied", "I <b>stopped smoking</b> = ich habe aufgehört zu rauchen. · I <b>stopped to smoke</b> = ich habe angehalten, um zu rauchen."],
    ["Zweck", "<b>to</b> = um … zu: I'm saving money <b>to buy</b> a car."]
  ],
  ex: [["I enjoy working with my hands.", "Ich arbeite gern mit den Händen."], ["We decided to move.", "Wir haben beschlossen umzuziehen."], ["Do you mind waiting a moment?", "Macht es dir etwas aus, kurz zu warten?"]],
  drills: [
    ["c", "I enjoy ___ new things.", "learning", ["to learn", "learn"], "Ich lerne gern neue Dinge."],
    ["c", "She wants ___ a doctor.", "to become", ["becoming", "become"], "Sie will Ärztin werden."],
    ["c", "Have you finished ___ the report?", "writing", ["to write", "write"], "Bist du mit dem Bericht fertig?"],
    ["c", "We need ___ more parts.", "to order", ["ordering", "order"], "Wir müssen mehr Teile bestellen."],
    ["c", "He stopped ___ two years ago.", "smoking", ["to smoke", "smoke"], "Er hat vor zwei Jahren mit dem Rauchen aufgehört."],
    ["c", "I'm looking forward to ___ you.", "seeing", ["see", "to see"], "Ich freue mich darauf, dich zu sehen."],
    ["c", "Don't forget ___ the door.", "to lock", ["locking", "lock"], "Vergiss nicht, die Tür abzuschließen."],
    ["r", "Would you mind closing the window?", "Would you mind to close the window?", "Würdest du bitte das Fenster schließen?"],
    ["b", "I went to the shop to buy milk.", "Ich bin in den Laden gegangen, um Milch zu kaufen."]
  ]},

{ id: "used-to", level: "B1", title: "used to",
  sum: "Früher war das so – heute nicht mehr.",
  rules: [
    ["Bedeutung", "<b>used to</b> + Grundform = früher (regelmäßig), aber heute nicht mehr: I <b>used to</b> smoke."],
    ["Verneinung & Frage", "I <b>didn't use to</b> like vegetables. · <b>Did</b> you <b>use to</b> play football?"],
    ["Nicht verwechseln", "<b>be used to + -ing</b> = an etwas gewöhnt sein: I'm used to getting up early."]
  ],
  ex: [["I used to live in Frankfurt.", "Früher habe ich in Frankfurt gewohnt."], ["We didn't use to have a car.", "Früher hatten wir kein Auto."], ["I'm used to working nights.", "Ich bin Nachtschichten gewohnt."]],
  drills: [
    ["c", "I ___ play football every weekend.", "used to", ["use to", "was used"], "Früher habe ich jedes Wochenende Fußball gespielt."],
    ["c", "Did you use to ___ glasses?", "wear", ["wearing", "wore"], "Hast du früher eine Brille getragen?"],
    ["c", "She ___ use to like coffee.", "didn't", ["doesn't", "wasn't"], "Früher mochte sie keinen Kaffee."],
    ["c", "I'm used to ___ in English now.", "speaking", ["speak", "spoke"], "Ich bin es inzwischen gewohnt, Englisch zu sprechen."],
    ["c", "There ___ to be a cinema here.", "used", ["use", "was used"], "Hier gab es früher ein Kino."],
    ["r", "We used to go there every summer.", "We were used to go there every summer.", "Früher sind wir jeden Sommer dorthin gefahren."],
    ["r", "He is used to the noise.", "He used to the noise.", "Er ist an den Lärm gewöhnt."],
    ["b", "I used to work in a shop.", "Früher habe ich in einem Laden gearbeitet."]
  ]},

/* ===================== B2 ===================== */
{ id: "past-perfect", level: "B2", title: "Past Perfect",
  sum: "Vorvergangenheit: Was war schon vorher passiert?",
  rules: [
    ["Bildung", "<b>had + 3. Form</b>: I <b>had finished</b>. She <b>had left</b>."],
    ["Wann?", "Für etwas, das <b>vor</b> einem anderen Ereignis in der Vergangenheit passierte: When we arrived, the film <b>had</b> already <b>started</b>."],
    ["Typische Wörter", "already, before, after, by the time, just, never … before"]
  ],
  ex: [["When I got to the station, the train had left.", "Als ich am Bahnhof ankam, war der Zug schon weg."], ["I had never seen snow before.", "Ich hatte vorher noch nie Schnee gesehen."], ["After she had eaten, she went to bed.", "Nachdem sie gegessen hatte, ging sie ins Bett."]],
  drills: [
    ["c", "When I arrived, the meeting ___ already started.", "had", ["has", "was"], "Als ich ankam, hatte die Besprechung schon begonnen."],
    ["c", "She was tired because she ___ badly.", "had slept", ["has slept", "slept had"], "Sie war müde, weil sie schlecht geschlafen hatte."],
    ["c", "I realised I ___ my keys at home.", "had left", ["have left", "leave"], "Mir wurde klar, dass ich meine Schlüssel zu Hause gelassen hatte."],
    ["c", "By the time we got there, everyone ___.", "had gone", ["has gone", "went had"], "Als wir ankamen, waren alle schon gegangen."],
    ["c", "He had never ___ a plane before.", "taken", ["took", "take"], "Er war vorher noch nie geflogen."],
    ["r", "After I had finished work, I went home.", "After I have finished work, I went home.", "Nachdem ich Feierabend gemacht hatte, ging ich nach Hause."],
    ["r", "The shop had closed when we got there.", "The shop has closed when we got there.", "Der Laden hatte schon zu, als wir ankamen."],
    ["b", "I had never been there before.", "Ich war vorher noch nie dort gewesen."]
  ]},

{ id: "conditional-3", level: "B2", title: "If-Sätze Typ 3 & I wish",
  sum: "Hätte ich doch … – über die Vergangenheit nachdenken.",
  rules: [
    ["Typ 3", "<b>If + had + 3. Form, would have + 3. Form</b>: If I <b>had known</b>, I <b>would have come</b>."],
    ["Bedeutung", "Die Vergangenheit ist vorbei – man stellt sich vor, es wäre anders gelaufen."],
    ["I wish (jetzt)", "<b>I wish + Past</b>: I wish I <b>had</b> more time. (Ich wünschte, ich hätte …)"],
    ["I wish (früher)", "<b>I wish + had + 3. Form</b>: I wish I <b>had studied</b> more. (Hätte ich doch …)"]
  ],
  ex: [["If you had told me, I would have helped you.", "Wenn du es mir gesagt hättest, hätte ich dir geholfen."], ["I wish I spoke better English.", "Ich wünschte, ich spräche besser Englisch."], ["I wish I hadn't said that.", "Hätte ich das bloß nicht gesagt."]],
  drills: [
    ["c", "If I had left earlier, I ___ missed the bus.", "wouldn't have", ["won't have", "didn't"], "Wäre ich früher losgegangen, hätte ich den Bus nicht verpasst."],
    ["c", "If she ___ harder, she would have passed.", "had studied", ["studied", "would study"], "Hätte sie mehr gelernt, hätte sie bestanden."],
    ["c", "We would have come if you ___ us.", "had invited", ["invited", "would invite"], "Wir wären gekommen, wenn du uns eingeladen hättest."],
    ["c", "I wish I ___ a bigger flat.", "had", ["have", "would have"], "Ich wünschte, ich hätte eine größere Wohnung."],
    ["c", "I wish I ___ that email. It was a mistake.", "hadn't sent", ["didn't send", "haven't sent"], "Hätte ich die E-Mail bloß nicht geschickt. Das war ein Fehler."],
    ["r", "If I had known, I would have called.", "If I would have known, I would have called.", "Wenn ich es gewusst hätte, hätte ich angerufen."],
    ["r", "I wish I could speak French.", "I wish I can speak French.", "Ich wünschte, ich könnte Französisch."],
    ["b", "If it had been sunny, we would have gone swimming.", "Wenn es sonnig gewesen wäre, wären wir schwimmen gegangen."]
  ]},

{ id: "phrasal-verbs", level: "B2", title: "Phrasal Verbs",
  sum: "Verb + kleines Wort = neue Bedeutung.",
  rules: [
    ["Was ist das?", "Ein Verb mit <b>up, down, on, off, out …</b> bekommt eine neue Bedeutung: give → geben, <b>give up</b> → aufgeben."],
    ["Die wichtigsten", "<b>turn on/off</b> an-/ausmachen · <b>pick up</b> abholen · <b>look after</b> aufpassen auf · <b>look for</b> suchen · <b>find out</b> herausfinden · <b>give up</b> aufgeben · <b>put off</b> verschieben · <b>run out of</b> ausgehen · <b>get on with</b> sich verstehen mit · <b>set up</b> einrichten · <b>carry on</b> weitermachen · <b>fill in</b> ausfüllen"],
    ["Stellung", "Bei vielen kann ein Pronomen in die Mitte: Turn <b>it</b> off. Pick <b>me</b> up at six."]
  ],
  ex: [["Can you pick me up at the station?", "Kannst du mich am Bahnhof abholen?"], ["We've run out of coffee.", "Uns ist der Kaffee ausgegangen."], ["Please fill in this form.", "Bitte füllen Sie dieses Formular aus."]],
  drills: [
    ["c", "Please turn ___ the light. It's dark.", "on", ["off", "up"], "Mach bitte das Licht an. Es ist dunkel."],
    ["c", "Don't give ___! You can do it.", "up", ["off", "in to"], "Gib nicht auf! Du schaffst das."],
    ["c", "Who will look ___ the baby?", "after", ["for", "at"], "Wer passt auf das Baby auf?"],
    ["c", "I need to find ___ when the train leaves.", "out", ["up", "off"], "Ich muss herausfinden, wann der Zug fährt."],
    ["c", "The meeting was put ___ until Friday.", "off", ["on", "out"], "Die Besprechung wurde auf Freitag verschoben."],
    ["c", "I get ___ well with my colleagues.", "on", ["up", "off"], "Ich verstehe mich gut mit meinen Kollegen."],
    ["c", "We're running ___ of time.", "out", ["off", "away"], "Uns läuft die Zeit davon."],
    ["r", "Can you turn it off?", "Can you turn off it?", "Kannst du es ausmachen?"],
    ["b", "I am looking for my keys.", "Ich suche meine Schlüssel."]
  ]},

{ id: "modals-deduction", level: "B2", title: "must be, might, can't be",
  sum: "Vermutungen: Das muss … sein, das kann nicht … sein.",
  rules: [
    ["must", "Fast sicher (ja): He's not answering. He <b>must be</b> asleep."],
    ["can't", "Fast sicher (nein): That <b>can't be</b> true!"],
    ["might / may / could", "Vielleicht: She <b>might be</b> at home. It <b>could be</b> the battery."],
    ["Vergangenheit", "<b>must have / might have / can't have + 3. Form</b>: He <b>must have forgotten</b>."]
  ],
  ex: [["You must be tired after the night shift.", "Du musst nach der Nachtschicht müde sein."], ["It might rain later.", "Es könnte später regnen."], ["She can't have seen my message.", "Sie kann meine Nachricht nicht gesehen haben."]],
  drills: [
    ["c", "The lights are off. They ___ be out.", "must", ["can't", "should to"], "Das Licht ist aus. Sie müssen weg sein."],
    ["c", "That ___ be Tom – he's in Spain!", "can't", ["must", "mustn't"], "Das kann nicht Tom sein – er ist in Spanien!"],
    ["c", "I'm not sure. It ___ be the battery.", "might", ["must", "can't"], "Ich bin nicht sicher. Es könnte die Batterie sein."],
    ["c", "He's late. He must ___ the bus.", "have missed", ["missed", "has missed"], "Er ist spät dran. Er muss den Bus verpasst haben."],
    ["c", "She ___ have heard us. She was asleep.", "can't", ["must", "should"], "Sie kann uns nicht gehört haben. Sie hat geschlafen."],
    ["r", "You must be hungry.", "You must to be hungry.", "Du musst hungrig sein."],
    ["r", "They might have left already.", "They might left already.", "Sie sind vielleicht schon gegangen."],
    ["b", "It could be a problem with the machine.", "Es könnte ein Problem mit der Maschine sein."]
  ]},

{ id: "indirect-questions", level: "B2", title: "Höfliche & indirekte Fragen",
  sum: "Could you tell me where …? – höflich nachfragen.",
  rules: [
    ["Höfliche Einleitungen", "<b>Could you tell me …?</b> · <b>Do you know …?</b> · <b>I was wondering if …</b> · <b>Would you mind + -ing …?</b>"],
    ["Satzbau", "Nach der Einleitung <b>normale Wortstellung</b>, kein do: Where <b>is</b> the station? → Could you tell me where <b>the station is</b>?"],
    ["Ja/Nein-Fragen", "mit <b>if / whether</b>: Do you know <b>if</b> the shop is open?"],
    ["Wann nutzen?", "Bei Fremden, im Beruf, am Telefon, in E-Mails – wirkt viel höflicher."]
  ],
  ex: [["Could you tell me where the toilets are?", "Könnten Sie mir sagen, wo die Toiletten sind?"], ["Do you know what time it starts?", "Wissen Sie, wann es anfängt?"], ["I was wondering if you could help me.", "Ich wollte fragen, ob Sie mir helfen könnten."]],
  drills: [
    ["r", "Could you tell me where the bank is?", "Could you tell me where is the bank?", "Könnten Sie mir sagen, wo die Bank ist?"],
    ["r", "Do you know when the train leaves?", "Do you know when does the train leave?", "Wissen Sie, wann der Zug fährt?"],
    ["r", "Can you tell me how much it costs?", "Can you tell me how much does it cost?", "Können Sie mir sagen, wie viel es kostet?"],
    ["c", "Do you know ___ he is coming?", "if", ["that", "does"], "Weißt du, ob er kommt?"],
    ["c", "Would you mind ___ me later?", "calling", ["to call", "call"], "Würden Sie mich später anrufen?"],
    ["c", "I was wondering ___ you could send me the file.", "if", ["that", "what"], "Ich wollte fragen, ob Sie mir die Datei schicken könnten."],
    ["c", "Could you tell me what time ___?", "it is", ["is it", "does it"], "Könnten Sie mir sagen, wie spät es ist?"],
    ["b", "Do you know where my phone is?", "Weißt du, wo mein Handy ist?"]
  ]},

{ id: "present-perfect-cont", level: "B2", title: "Present Perfect Continuous",
  sum: "I've been waiting for an hour! – Dauer betonen.",
  rules: [
    ["Bildung", "<b>have/has been + -ing</b>: I'<b>ve been working</b>. She'<b>s been learning</b>."],
    ["Wann?", "Etwas hat in der Vergangenheit begonnen, <b>läuft noch</b> oder hat gerade aufgehört – die <b>Dauer</b> ist wichtig."],
    ["Mit for/since", "I've <b>been waiting for</b> 20 minutes. It's <b>been raining since</b> this morning."],
    ["Sichtbare Folgen", "Why are you so dirty? – I'<b>ve been repairing</b> the car."]
  ],
  ex: [["I've been learning English for three months.", "Ich lerne seit drei Monaten Englisch."], ["How long have you been waiting?", "Wie lange wartest du schon?"], ["She's been working all day.", "Sie arbeitet schon den ganzen Tag."]],
  drills: [
    ["c", "I've been ___ here since 2019.", "working", ["work", "worked"], "Ich arbeite hier seit 2019."],
    ["c", "It ___ been raining all morning.", "has", ["have", "is"], "Es regnet schon den ganzen Morgen."],
    ["c", "How long have you ___ waiting?", "been", ["be", "being"], "Wie lange wartest du schon?"],
    ["c", "They've been talking ___ two hours.", "for", ["since", "ago"], "Sie reden seit zwei Stunden."],
    ["c", "Your eyes are red. ___ you been crying?", "Have", ["Are", "Did"], "Deine Augen sind rot. Hast du geweint?"],
    ["r", "I've been waiting for ages.", "I'm waiting since ages.", "Ich warte schon ewig."],
    ["r", "She has been learning to drive.", "She has learning to drive.", "Sie lernt gerade Auto fahren."],
    ["b", "We have been living here for two years.", "Wir wohnen seit zwei Jahren hier."]
  ]}
];
