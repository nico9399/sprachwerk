// Sprachwerk – Fehlertrainer „Typisch deutsch“ (Format wie Grammatik-Lektionen)
window.SW_MISTAKES = window.SW_MISTAKES || {};
window.SW_MISTAKES.en = [
{ id: "ff-alltag", level: "Fehler", title: "Falsche Freunde im Alltag",
  sum: "Wörter, die deutsch klingen, aber etwas anderes bedeuten.",
  rules: [
    ["Klingt gleich – bedeutet anders","<b>become</b> = werden (nicht bekommen → <b>get</b>)<br><b>eventually</b> = schließlich (nicht eventuell → <b>possibly</b>)<br><b>actual</b> = tatsächlich (nicht aktuell → <b>current</b>)<br><b>also</b> = auch (nicht also → <b>so</b>)"],
    ["Noch mehr Fallen","<b>gift</b> = Geschenk (Gift = <b>poison</b>)<br><b>sensible</b> = vernünftig (sensibel = <b>sensitive</b>)<br><b>brave</b> = mutig (brav = <b>well-behaved</b>)<br><b>handy</b> = praktisch (Handy = <b>mobile phone</b>)<br><b>bald</b> = glatzköpfig (bald = <b>soon</b>)"]
  ],
  ex: [["I'd like to become a mechanic.","Ich möchte Mechaniker werden."],["Eventually, we found the problem.","Schließlich haben wir das Problem gefunden."],["What's the current price?","Was ist der aktuelle Preis?"],["That's a sensible decision.","Das ist eine vernünftige Entscheidung."]],
  drills: [
    ["c","Can I ___ a coffee, please?","get",["become","come","make"],"Kann ich einen Kaffee bekommen?"],
    ["c","She wants to ___ a nurse.","become",["get","receive","be getting"],"Sie will Krankenschwester werden."],
    ["c","We might ___ come later.","possibly",["eventually","actually","finally"],"Wir kommen eventuell später."],
    ["c","The ___ figures are on the screen.","current",["actual","eventual","topical"],"Die aktuellen Zahlen sind auf dem Bildschirm."],
    ["c","It was raining, ___ we stayed at home.","so",["also","too","as well"],"Es hat geregnet, also sind wir zu Hause geblieben."],
    ["c","I'll be back ___.","soon",["bald","early","near"],"Ich bin bald zurück."],
    ["c","Where's my ___? I need to call my boss.","mobile phone",["handy","telephone box","handy phone"],"Wo ist mein Handy? Ich muss meinen Chef anrufen."],
    ["c","He's very ___ – he cries at every film.","sensitive",["sensible","sensational","senseless"],"Er ist sehr sensibel – er weint bei jedem Film."],
    ["r","Thanks for the lovely gift!","Thanks for the lovely poison!","Danke für das schöne Geschenk!"],
    ["r","The kids were very well-behaved today.","The kids were very brave today.","Die Kinder waren heute sehr brav."],
    ["r","Actually, I don't like tea.","Actual, I don't like tea.","Eigentlich mag ich keinen Tee."],
    ["r","I got a letter from the bank.","I became a letter from the bank.","Ich habe einen Brief von der Bank bekommen."],
    ["b","Eventually, he became a team leader.","Schließlich wurde er Teamleiter."],
    ["b","This app is really handy.","Diese App ist wirklich praktisch."]
  ]},

{ id: "ff-arbeit", level: "Fehler", title: "Falsche Freunde im Job",
  sum: "Typische Fallen bei Arbeit, Technik und Alltagswörtern.",
  rules: [
    ["Arbeit","<b>chef</b> = Koch (Chef = <b>boss</b>)<br><b>personal</b> = persönlich (Personal = <b>staff</b>)<br><b>fabric</b> = Stoff (Fabrik = <b>factory</b>)<br><b>control</b> = steuern, beherrschen (kontrollieren = <b>check</b>)<br><b>consequent</b> = folgend (konsequent = <b>consistent</b>)"],
    ["„Denglisch“ – gibt es so nicht","Beamer → <b>projector</b><br>Mobbing → <b>bullying</b><br>Oldtimer → <b>vintage car</b><br>Homeoffice → <b>working from home</b><br>Public Viewing → <b>outdoor screening</b>"]
  ],
  ex: [["My boss is on holiday.","Mein Chef ist im Urlaub."],["Please check the parts before packing.","Bitte kontrolliere die Teile vor dem Verpacken."],["We need more staff in the warehouse.","Wir brauchen mehr Personal im Lager."]],
  drills: [
    ["c","My ___ gave me a day off.","boss",["chef","chief cook","master"],"Mein Chef hat mir einen Tag freigegeben."],
    ["c","Please ___ the labels before shipping.","check",["control","controll","regulate"],"Bitte kontrolliere die Etiketten vor dem Versand."],
    ["c","He works in a car ___.","factory",["fabric","fabrication","manufacture"],"Er arbeitet in einer Autofabrik."],
    ["c","We are short of ___ this week.","staff",["personal","personals","persons"],"Diese Woche fehlt uns Personal."],
    ["c","Can you switch on the ___ for the presentation?","projector",["beamer","beam","screen light"],"Kannst du für die Präsentation den Beamer einschalten?"],
    ["c","___ at work is a serious problem.","Bullying",["Mobbing","Mobbying","Mocking"],"Mobbing am Arbeitsplatz ist ein ernstes Problem."],
    ["c","You need to be ___ with the rules.","consistent",["consequent","consequential","constant"],"Du musst bei den Regeln konsequent sein."],
    ["c","I'm ___ on Fridays.","working from home",["in home office","making home office","at homeoffice"],"Freitags bin ich im Homeoffice."],
    ["r","Our boss is on holiday this week.","Our chef is on holiday this week.","Unser Chef (Vorgesetzter) ist diese Woche im Urlaub."],
    ["r","My grandfather collects vintage cars.","My grandfather collects oldtimers.","Mein Opa sammelt Oldtimer."],
    ["r","Can I ask you a personal question?","Can I ask you a staff question?","Darf ich dir eine persönliche Frage stellen?"],
    ["b","Please check the parts before packing.","Bitte kontrolliere die Teile vor dem Verpacken."],
    ["b","My boss is very consistent.","Mein Chef ist sehr konsequent."]
  ]},

{ id: "fe-since-for", level: "Fehler", title: "„seit“ richtig übersetzen",
  sum: "Seit = since oder for – und fast immer mit Present Perfect.",
  rules: [
    ["Die Zeitform","Im Deutschen: <i>Ich wohne <b>seit</b> 5 Jahren hier</i> (Gegenwart).<br>Im Englischen: <b>I have lived</b> here for five years. – <b>nie</b> „I live here since …“"],
    ["since oder for?","<b>since</b> + Zeitpunkt: since 2019, since Monday, since 8 o'clock<br><b>for</b> + Zeitraum: for two years, for a week, for ages"]
  ],
  ex: [["I've worked here since 2019.","Ich arbeite seit 2019 hier."],["We've known each other for ten years.","Wir kennen uns seit zehn Jahren."],["How long have you been waiting?","Wie lange wartest du schon?"]],
  drills: [
    ["c","I've lived in this town ___ 2015.","since",["for","from","ago"],"Ich wohne seit 2015 in dieser Stadt."],
    ["c","She's worked here ___ three years.","for",["since","ago","during"],"Sie arbeitet seit drei Jahren hier."],
    ["c","I ___ him for years.","have known",["know","am knowing","knew since"],"Ich kenne ihn seit Jahren."],
    ["c","We ___ married since 2020.","have been",["are","were","be"],"Wir sind seit 2020 verheiratet."],
    ["c","How long ___ you had your car?","have",["do","are","did"],"Wie lange hast du dein Auto schon?"],
    ["c","He's been ill ___ Monday.","since",["for","from","by"],"Er ist seit Montag krank."],
    ["c","I've been waiting ___ ages!","for",["since","from","by"],"Ich warte schon ewig!"],
    ["r","I have lived here for five years.","I live here since five years.","Ich wohne seit fünf Jahren hier."],
    ["r","She has been my colleague since March.","She is my colleague since March.","Sie ist seit März meine Kollegin."],
    ["r","How long have you worked here?","How long do you work here?","Wie lange arbeitest du schon hier?"],
    ["r","I've had this phone for two years.","I have this phone since two years.","Ich habe dieses Handy seit zwei Jahren."],
    ["b","I have known her since school.","Ich kenne sie seit der Schule."],
    ["b","We have been waiting for an hour.","Wir warten seit einer Stunde."]
  ]},

{ id: "fe-wortstellung", level: "Fehler", title: "Satzstellung wie im Englischen",
  sum: "Subjekt – Verb – Objekt. Zeit und Ort meist ans Ende.",
  rules: [
    ["Kein Verb an Position 2 erzwingen","Deutsch: <i>Morgen <b>fahre</b> ich nach Berlin.</i><br>Englisch: <b>Tomorrow I'm going</b> to Berlin. – nicht „Tomorrow go I …“"],
    ["Ort vor Zeit, beides ans Ende","I go <b>to work</b> <b>at six</b>. – nicht „I go at six to work.“<br>Häufigkeitswörter vor das Verb: I <b>always</b> drink tea. – aber nach <i>be</i>: I'm <b>always</b> late."],
    ["Nichts zwischen Verb und Objekt","I like football <b>very much</b>. – nicht „I like very much football.“<br>She speaks English <b>well</b>. – nicht „She speaks well English.“"]
  ],
  ex: [["Yesterday we went to the cinema.","Gestern sind wir ins Kino gegangen."],["I usually start work at six.","Ich fange normalerweise um sechs an zu arbeiten."],["He speaks English very well.","Er spricht sehr gut Englisch."]],
  drills: [
    ["r","Yesterday I met my old teacher.","Yesterday met I my old teacher.","Gestern habe ich meinen alten Lehrer getroffen."],
    ["r","I like coffee very much.","I like very much coffee.","Ich mag Kaffee sehr."],
    ["r","She speaks German very well.","She speaks very well German.","Sie spricht sehr gut Deutsch."],
    ["r","I always take the bus.","I take always the bus.","Ich nehme immer den Bus."],
    ["r","We're going to the lake on Sunday.","We're going on Sunday to the lake.","Wir fahren am Sonntag an den See."],
    ["r","He is often tired.","He often is tired.","Er ist oft müde."],
    ["r","Tomorrow I have to work.","Tomorrow have I to work.","Morgen muss ich arbeiten."],
    ["r","I don't know where he lives.","I don't know where lives he.","Ich weiß nicht, wo er wohnt."],
    ["b","I usually go to work by bike.","Ich fahre normalerweise mit dem Rad zur Arbeit."],
    ["b","Last week we visited my parents.","Letzte Woche haben wir meine Eltern besucht."],
    ["b","She never drinks coffee in the evening.","Sie trinkt abends nie Kaffee."],
    ["b","Can you tell me where the station is?","Kannst du mir sagen, wo der Bahnhof ist?"]
  ]},

{ id: "fe-zeiten", level: "Fehler", title: "Typische Zeitenfehler",
  sum: "Perfekt ≠ Present Perfect, Gegenwart ≠ Zukunft.",
  rules: [
    ["Vergangenheit mit Zeitangabe","Deutsch: <i>Ich <b>habe</b> ihn gestern <b>gesehen</b>.</i><br>Englisch: I <b>saw</b> him yesterday. – nicht „I have seen him yesterday.“<br>Bei <b>yesterday, last week, in 2020, ago</b> immer Past Simple."],
    ["Zukunft","Deutsch sagt oft Gegenwart: <i>Ich rufe dich morgen an.</i><br>Englisch: I<b>'ll call</b> you tomorrow. – Pläne: I<b>'m meeting</b> Tom tonight."],
    ["Gerade jetzt","<i>Ich arbeite gerade.</i> → I<b>'m working</b>. – nicht „I work at the moment.“"]
  ],
  ex: [["I saw him two days ago.","Ich habe ihn vor zwei Tagen gesehen."],["I'll send you the file later.","Ich schicke dir die Datei später."],["She's talking on the phone right now.","Sie telefoniert gerade."]],
  drills: [
    ["c","I ___ him yesterday.","saw",["have seen","see","had seen"],"Ich habe ihn gestern gesehen."],
    ["c","We ___ to Spain last summer.","went",["have gone","go","have been going"],"Wir sind letzten Sommer nach Spanien gefahren."],
    ["c","Don't worry, I ___ you tomorrow.","'ll call",["call","am call","called"],"Keine Sorge, ich rufe dich morgen an."],
    ["c","Sorry, I can't talk – I ___.","'m driving",["drive","drove","have driven"],"Sorry, ich kann nicht reden – ich fahre gerade."],
    ["c","I ___ my keys! Can you help me look?","'ve lost",["lose","am losing","was losing"],"Ich habe meine Schlüssel verloren! Hilfst du mir suchen?"],
    ["c","The meeting ___ at 9 tomorrow.","starts",["started","has started","is start"],"Die Besprechung beginnt morgen um 9."],
    ["c","When ___ you arrive?","did",["have","are","has"],"Wann bist du angekommen?"],
    ["r","I bought this car in 2021.","I have bought this car in 2021.","Ich habe dieses Auto 2021 gekauft."],
    ["r","I'll help you with that.","I help you with that later tomorrow.","Ich helfe dir dabei."],
    ["r","What are you doing right now?","What do you do right now?","Was machst du gerade?"],
    ["r","Have you ever been to London?","Were you ever in London?","Warst du schon mal in London?"],
    ["b","I finished the report an hour ago.","Ich habe den Bericht vor einer Stunde fertig gemacht."],
    ["b","I'm meeting my friends tonight.","Ich treffe heute Abend meine Freunde."]
  ]},

{ id: "fe-make-do", level: "Fehler", title: "make oder do? say oder tell?",
  sum: "Deutsch hat ein Wort, Englisch zwei.",
  rules: [
    ["make vs. do (machen)","<b>make</b> = etwas herstellen/erzeugen: make a mistake, make a decision, make money, make a phone call, make breakfast<br><b>do</b> = Tätigkeit/Pflicht: do homework, do the shopping, do a job, do overtime, do your best"],
    ["say vs. tell (sagen)","<b>say</b> something (to sb): He said hello. She said that she was tired.<br><b>tell</b> sb something: He told <b>me</b> the truth. Tell <b>me</b> a story."],
    ["Weitere Paare","<b>lend</b> = verleihen, <b>borrow</b> = sich leihen<br><b>remember</b> = sich erinnern, <b>remind</b> = jdn. erinnern<br><b>learn</b> = lernen, <b>teach</b> = lehren"]
  ],
  ex: [["I made a mistake.","Ich habe einen Fehler gemacht."],["Can you do me a favour?","Kannst du mir einen Gefallen tun?"],["She told me the news.","Sie hat mir die Neuigkeit erzählt."]],
  drills: [
    ["c","Everybody ___ mistakes.","makes",["does","do","is doing"],"Jeder macht Fehler."],
    ["c","I have to ___ the shopping.","do",["make","go","take"],"Ich muss einkaufen."],
    ["c","We need to ___ a decision today.","make",["do","take a","give"],"Wir müssen heute eine Entscheidung treffen."],
    ["c","I ___ two hours of overtime yesterday.","did",["made","took","had made"],"Ich habe gestern zwei Überstunden gemacht."],
    ["c","He ___ me that he was leaving.","told",["said","spoke","talked"],"Er hat mir gesagt, dass er geht."],
    ["c","She ___ that she was tired.","said",["told","told me to","spoke"],"Sie sagte, dass sie müde war."],
    ["c","Can you ___ me 20 euros until Friday?","lend",["borrow","borrow to","lent"],"Kannst du mir bis Freitag 20 Euro leihen?"],
    ["c","Please ___ me to call the garage.","remind",["remember","memorise","recall"],"Erinnere mich bitte daran, die Werkstatt anzurufen."],
    ["c","My dad ___ me how to drive.","taught",["learned","learnt me","teached"],"Mein Vater hat mir das Autofahren beigebracht."],
    ["r","Could you do me a favour?","Could you make me a favour?","Könntest du mir einen Gefallen tun?"],
    ["r","Can I borrow your pen?","Can I lend your pen?","Kann ich mir deinen Stift leihen?"],
    ["r","Tell me the truth.","Say me the truth.","Sag mir die Wahrheit."],
    ["b","I made a phone call to the bank.","Ich habe die Bank angerufen."]
  ]},

{ id: "fe-praepositionen", level: "Fehler", title: "Präpositionen-Fallen",
  sum: "Feste Verbindungen, die man nicht wörtlich übersetzen kann.",
  rules: [
    ["Wörtlich übersetzt = falsch","warten <i>auf</i> → wait <b>for</b><br>abhängen <i>von</i> → depend <b>on</b><br>interessiert <i>an</i> → interested <b>in</b><br>Angst <i>vor</i> → afraid <b>of</b><br>verheiratet <i>mit</i> → married <b>to</b><br><i>auf</i> dem Foto → <b>in</b> the photo"],
    ["Ort & Zeit","<b>at</b> work, <b>at</b> home, <b>at</b> the weekend (BrE)<br><b>on</b> the bus/train, <b>in</b> the car<br><b>on</b> Monday, <b>in</b> May, <b>at</b> 6 o'clock"]
  ],
  ex: [["We're waiting for the bus.","Wir warten auf den Bus."],["It depends on the weather.","Es hängt vom Wetter ab."],["She's married to an engineer.","Sie ist mit einem Ingenieur verheiratet."]],
  drills: [
    ["c","I'm waiting ___ the delivery.","for",["on","of","to"],"Ich warte auf die Lieferung."],
    ["c","It depends ___ the price.","on",["from","of","by"],"Es hängt vom Preis ab."],
    ["c","Are you interested ___ the job?","in",["for","at","on"],"Interessierst du dich für die Stelle?"],
    ["c","My son is afraid ___ dogs.","of",["from","for","before"],"Mein Sohn hat Angst vor Hunden."],
    ["c","He's married ___ my cousin.","to",["with","by","at"],"Er ist mit meiner Cousine verheiratet."],
    ["c","Who is the man ___ the photo?","in",["on","at","by"],"Wer ist der Mann auf dem Foto?"],
    ["c","I'm good ___ maths.","at",["in","on","with"],"Ich bin gut in Mathe."],
    ["c","We met ___ the train.","on",["in","at","by"],"Wir haben uns im Zug kennengelernt."],
    ["c","Thank you ___ your help.","for",["of","to","about"],"Danke für deine Hilfe."],
    ["c","I'm proud ___ my team.","of",["on","about","for"],"Ich bin stolz auf mein Team."],
    ["r","It's not my fault – it depends on him.","It's not my fault – it depends from him.","Es ist nicht meine Schuld – es hängt von ihm ab."],
    ["r","I'm looking forward to the weekend.","I'm looking forward on the weekend.","Ich freue mich aufs Wochenende."],
    ["b","We are waiting for the new parts.","Wir warten auf die neuen Teile."]
  ]},

{ id: "fe-zaehlbar", level: "Fehler", title: "information, advice, news …",
  sum: "Wörter, die im Englischen keinen Plural haben – oder umgekehrt.",
  rules: [
    ["Kein Plural, kein „a“","<b>information</b> (Informationen), <b>advice</b> (Ratschläge), <b>furniture</b> (Möbel), <b>equipment</b> (Ausrüstung), <b>news</b> (Nachrichten), <b>homework</b>, <b>luggage</b> (Gepäck)<br>→ some information, a piece of advice, the news <b>is</b> good"],
    ["Immer Plural","<b>people</b> are, <b>the police</b> are, <b>jeans/trousers/glasses</b> are – „a pair of jeans“"]
  ],
  ex: [["Can you give me some information?","Kannst du mir ein paar Informationen geben?"],["The news is good.","Die Nachrichten sind gut."],["The police are on their way.","Die Polizei ist unterwegs."]],
  drills: [
    ["c","I need some ___ about the course.","information",["informations","an information","informationes"],"Ich brauche ein paar Informationen zum Kurs."],
    ["c","Can I give you a piece of ___?","advice",["advices","advise","an advice"],"Darf ich dir einen Rat geben?"],
    ["c","The news ___ really bad.","is",["are","were","have"],"Die Nachrichten sind wirklich schlecht."],
    ["c","We bought new ___ for the living room.","furniture",["furnitures","a furniture","furnitures pieces"],"Wir haben neue Möbel fürs Wohnzimmer gekauft."],
    ["c","Many people ___ working from home.","are",["is","be","was"],"Viele Leute arbeiten von zu Hause."],
    ["c","The police ___ looking for the driver.","are",["is","was","has"],"Die Polizei sucht den Fahrer."],
    ["c","My jeans ___ too long.","are",["is","was","has"],"Meine Jeans ist zu lang."],
    ["c","How much ___ do you have?","luggage",["luggages","baggages","suitcase"],"Wie viel Gepäck hast du?"],
    ["r","Thanks for the information.","Thanks for the informations.","Danke für die Informationen."],
    ["r","The equipment is very expensive.","The equipments are very expensive.","Die Ausrüstung ist sehr teuer."],
    ["r","I bought a pair of trousers.","I bought a trouser.","Ich habe eine Hose gekauft."],
    ["b","The safety equipment is in the cupboard.","Die Schutzausrüstung ist im Schrank."]
  ]},

{ id: "fe-klassiker", level: "Fehler", title: "Die Klassiker",
  sum: "Fehler, die man sofort als „typisch deutsch“ erkennt.",
  rules: [
    ["Sätze nicht wörtlich übersetzen","Ich <i>bin</i> 30 Jahre → I'm 30 (years <b>old</b>)<br>Ich <i>habe</i> Hunger → I'm <b>hungry</b><br>Es <i>gibt</i> … → <b>There is/are</b> … (nicht „It gives“)<br>Wie <i>heißt</i> das auf Englisch? → <b>What's</b> this in English? / <b>What do you call</b> this?<br>Ich <i>bin</i> einverstanden → I <b>agree</b> (nicht „I am agree“)"],
    ["Höflichkeit","„Bitte“ beim Geben → <b>Here you are.</b><br>„Bitte?“ (nicht verstanden) → <b>Sorry? / Pardon?</b><br>„Bitte“ auf Danke → <b>You're welcome.</b>"]
  ],
  ex: [["I'm 30 years old.","Ich bin 30 Jahre alt."],["There are two problems.","Es gibt zwei Probleme."],["What do you call this in English?","Wie heißt das auf Englisch?"]],
  drills: [
    ["r","I'm 30 years old.","I have 30 years.","Ich bin 30 Jahre alt."],
    ["r","I'm hungry.","I have hunger.","Ich habe Hunger."],
    ["r","There is a problem with the machine.","It gives a problem with the machine.","Es gibt ein Problem mit der Maschine."],
    ["r","I agree with you.","I am agree with you.","Ich bin deiner Meinung."],
    ["r","What do you call this in English?","How do you call this in English?","Wie heißt das auf Englisch?"],
    ["r","I'm cold.","It is cold to me.","Mir ist kalt."],
    ["r","I'm from Germany.","I'm coming from Germany.","Ich komme aus Deutschland."],
    ["c","(Du gibst jemandem etwas:) ___","Here you are.",["Please.","You're welcome.","Take."],"Bitte schön. (beim Geben)"],
    ["c","– Thanks a lot! – ___","You're welcome.",["Please.","Here you are.","Bitte."],"– Vielen Dank! – Bitte."],
    ["r","I'm looking forward to it.","I'm looking forward to do it.","Ich freue mich darauf."],
    ["r","Can you explain it to me?","Can you explain me it?","Kannst du es mir erklären?"],
    ["r","It doesn't matter.","It plays no role.","Das spielt keine Rolle."],
    ["b","There are three people in the office.","Es sind drei Leute im Büro."],
    ["b","I'm sorry, I didn't understand that.","Entschuldigung, das habe ich nicht verstanden."]
  ]},

{ id: "fe-aussprache-schrift", level: "Fehler", title: "Verwechslungsgefahr",
  sum: "Ähnliche Wörter, die oft durcheinandergehen.",
  rules: [
    ["Ähnlich, aber anders","<b>lose</b> (verlieren) – <b>loose</b> (locker)<br><b>then</b> (dann) – <b>than</b> (als)<br><b>affect</b> (Verb: beeinflussen) – <b>effect</b> (Nomen: Wirkung)<br><b>its</b> (sein) – <b>it's</b> (= it is)<br><b>quite</b> (ziemlich) – <b>quiet</b> (leise)"],
    ["Weitere","<b>rise</b> (steigen, ohne Objekt) – <b>raise</b> (erhöhen, mit Objekt)<br><b>lie</b> (liegen) – <b>lay</b> (legen)<br><b>bring</b> (herbringen) – <b>take</b> (mitnehmen)"]
  ],
  ex: [["My brother is older than me.","Mein Bruder ist älter als ich."],["Prices are rising.","Die Preise steigen."],["Please be quiet.","Bitte sei leise."]],
  drills: [
    ["c","My car is bigger ___ yours.","than",["then","as","that"],"Mein Auto ist größer als deins."],
    ["c","First we eat, ___ we go.","then",["than","as","after"],"Erst essen wir, dann gehen wir."],
    ["c","Don't ___ your keys again!","lose",["loose","loss","lost"],"Verlier nicht wieder deine Schlüssel!"],
    ["c","This screw is ___.","loose",["lose","losed","lost"],"Diese Schraube ist locker."],
    ["c","The company has a new logo. ___ colour is blue.","Its",["It's","Its'","It is"],"Die Firma hat ein neues Logo. Seine Farbe ist blau."],
    ["c","Please be ___ in the library.","quiet",["quite","quit","quietly"],"Bitte sei leise in der Bibliothek."],
    ["c","The test was ___ easy.","quite",["quiet","quit","quitely"],"Der Test war ziemlich leicht."],
    ["c","Stress can ___ your health.","affect",["effect","effects","affection"],"Stress kann deine Gesundheit beeinflussen."],
    ["c","The company will ___ prices next year.","raise",["rise","arise","rising"],"Die Firma wird die Preise nächstes Jahr erhöhen."],
    ["c","Don't forget to ___ an umbrella with you.","take",["bring","carry on","fetch"],"Vergiss nicht, einen Schirm mitzunehmen."],
    ["r","Prices have risen sharply.","Prices have raised sharply.","Die Preise sind stark gestiegen."],
    ["r","It's raining again.","Its raining again.","Es regnet schon wieder."],
    ["b","The new rules had a big effect.","Die neuen Regeln hatten eine große Wirkung."]
  ]}
];
