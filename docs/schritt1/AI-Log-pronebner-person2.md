Prompt: Ich baue eine Konferenz-App mit Vue3, Typescript und Vue Router. Erstelle mir bitte die Detailview Komponente für eine Session (SessionDetailView),nutze dazu den vorgegeben Code unseres bestehenden Projektes und die Angabe die ich dir mitgeliefert habe (Punkt C). Zusätzlich erstelle mir eine Bookmark Komponente und diese soll auch für die SessionCard eingebunden sein.
Übernommen: BookmarkToggle.vue und SessionDetail.vue
Geändert/Verstanden:Code für SessionCard geändert (bookmark wurde hinzugefügt), Komponenten-Wiederverwendung von Bookmark, lässt sich über sessionID einbinden

Prompt: Ich bekomme den Fehler, dass die Route zwar gefunden wurde sowie die session allerdings die Speaker dazu nicht, woran liegt das? (Fehleranzeige)
Übernommen: Route für die Speaker in index.ts
Geändert/Verstanden: Die Route für den Speaker war zu diesem Zeitpunkt noch nicht festgelegt bei mir lokal, da Christian parallel an seinem Feature gearbeitet hat (seine Aufgabe), deshalb Route selber lokal implementiert zum Testen. 


Prompt: Wir haben bereits schon ein Template route für MyScheduleView welches noch nicht implementiert ist. Bitte befülle dieses, sodass man die Session auch wieder entfernen kann und es eine Anzeige gibt wenn beispielsweise mehrere Session corrupten
Übernommen: MyScheduleView.vue
Geändert/Verständnis: Hinzufügen des Stylings der Schedule Ansicht sowie hinzufügen und löschen im Programm


