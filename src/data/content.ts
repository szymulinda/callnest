export const stats = [
  {
    count: 25,
    suffix: '%',
    text: 'klientów dzwoni dopiero po godzinach otwarcia.',
  },
  {
    count: 30,
    suffix: '%',
    text: 'wizyt przepada, gdy nikt nie odbiera telefonu.',
  },
  {
    count: 24,
    suffix: '/7',
    text: 'agent odbiera każdy telefon - bez przerw i urlopów.',
  },
] as const;

export const steps = [
  {
    num: '01',
    title: 'Analiza',
    text: 'Poznajemy Twój biznes, najczęstsze pytania klientów i sposób, w jaki umawiasz wizyty lub przyjmujesz zgłoszenia.',
  },
  {
    num: '02',
    title: 'Konfiguracja',
    text: 'Budujemy agenta na bazie Twoich danych i podpinamy go pod Twój kalendarz lub system zgłoszeń.',
  },
  {
    num: '03',
    title: 'Wdrożenie',
    text: 'Agent przejmuje połączenia przychodzące. Ty pracujesz spokojnie dalej.',
  },
  {
    num: '04',
    title: 'Opieka',
    text: 'Monitorujemy i optymalizujemy agenta. Co tydzień dostajesz raport z odzyskanymi połączeniami i wizytami - widzisz, ile pieniędzy uratował.',
  },
] as const;

export const useCases = [
  {
    title: 'Recepcja i odbieranie połączeń',
    text: 'Każdy telefon zostaje odebrany naturalnym głosem. Agent zbiera dane, kwalifikuje i przekazuje to, co istotne.',
  },
  {
    title: 'Umawianie wizyt i zgłoszenia',
    text: 'Klient umawia wizytę bezpośrednio w kalendarzu, a gdy nie prowadzisz rezerwacji - agent zbiera zgłoszenie i przekazuje Ci je SMS-em.',
  },
  {
    title: 'Obsługa FAQ 24/7',
    text: 'Godziny otwarcia, ceny, lokalizacja, dostępność - agent odpowiada natychmiast, o każdej porze.',
  },
] as const;

export const industries = [
  'Salony beauty',
  'Warsztaty samochodowe',
  'Gabinety kosmetyczne',
  'Fryzjerzy',
  'Studia paznokci',
  'Grooming i salony dla zwierząt',
  'Serwisy i usługi lokalne',
] as const;

export const benefits = [
  ['Jedna faktura, zero kombinowania', 'Telefonia, AI i utrzymanie - wszystko wliczone w abonament.'],
  ['Lokalny partner, polski język', 'Agent brzmi naturalnie po polsku i rozumie kontekst Twojej branży.'],
  ['Wdrożenie w 48 godzin', 'Bez wielomiesięcznych projektów - działający agent niemal od razu.'],
  ['Zgodność z prawem', 'PKE, AI Act i RODO - agent informuje, że jest AI, dane przetwarzane zgodnie z RODO.'],
  ['Stała optymalizacja i raporty', 'Co tydzień widzisz, ile połączeń odebrano i ile zamieniono w rezerwacje.'],
] as const;

