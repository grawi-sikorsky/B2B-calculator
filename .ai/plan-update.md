# Plan modernizacji B2B Calculator

Data audytu: 2026-08-24
Branch audytowany: `develop` (zweryfikowano jako nowsza/produkcyjna gałąź — to na niej stoi b2b.jsikora.uk; `master` jest w tyle, brak różnic w stacku technicznym względem `develop`).

## 1. Stan obecny (audyt)

| Obszar | Stan | Uwagi |
|---|---|---|
| Angular | `~13.1.0` (core), CLI `^14.0.6` | rozjazd core/CLI, wersja z ok. 2022 r. |
| Angular Material / CDK | `^13.3.9` | tzw. "legacy" (pre-MDC) komponenty, motyw prebuilt `indigo-pink.css` |
| TypeScript | `~4.5.2` | zbyt stara dla nowszych wersji Angulara (wymagany bump) |
| RxJS | `~7.4.0` | OK, tylko bump patchy |
| Zone.js | `~0.11.4` | do wymiany przy okazji (nowsze Angulary wspierają zoneless, ale to osobna decyzja) |
| Bootstrap | `^5.1.3` | używany równolegle z Material tylko w stopce (`footer.component.html`) – siatka, przyciski, ikony |
| Font Awesome | ładowany z CDN (`cdnjs.cloudflare.com`) w `index.html` | używany wyłącznie w stopce, dubluje `MatIconModule` |
| Architektura | `NgModule` (brak `standalone`), stara składnia `*ngIf`/`*ngFor` | brak nowego control-flow (`@if`/`@for`) |
| Node (Docker) | `node:16` w `Dockerfile` | lokalnie zainstalowane `v22.22.3` – trzeba ujednolicić |
| Copyright | **`© 2025 Copyright: Jakub Sikora®™`** w [footer.component.html:41](src/app/main-view/footer/footer.component.html#L41) (na `master` widniało jeszcze `© 2024`) | jedyne wystąpienie roku w projekcie – mimo ręcznej aktualizacji w 2025 już znów nieaktualne (mamy 2026), bo rok jest wpisany na sztywno zamiast liczony dynamicznie |
| `package.json` | dodatkowy wpis `"b2b-calculator": "file:"` w `dependencies` | wygląda na artefakt/pomyłkę z `npm install` (self-reference) – do usunięcia przy porządkach zależności |

### Znalezione "kotwice" na starym Material (do naprawy przy migracji na MDC/M3)

W [src/styles.css](src/styles.css) i komponentach nadpisywane są **prywatne klasy DOM starego (pre-MDC) Materiala**, które w wersjach 15+ nie istnieją / zmieniły strukturę:
- `.mat-form-field-wrapper`, `.mat-form-field-infix` – [src/styles.css:31-45](src/styles.css#L31-L45)
- `.mat-expansion-panel-body` – [src/styles.css:16, 26](src/styles.css#L16)
- `.mat-raised-button` – [src/styles.css:11-13, 20-23](src/styles.css#L11-L13)

Mieszane `appearance` na `mat-form-field`: `outline` w [income-form.component.html](src/app/accordion/income-form/income-form.component.html) i [outcome-form.component.html](src/app/accordion/outcome-form/outcome-form.component.html), a `fill` w [tax-form.component.html](src/app/accordion/tax-form/tax-form.component.html) – warto ujednolicić wizualnie przy nowym motywie.

### Kontekst wersji docelowych (stan na VIII 2026)

- Angular: aktualna stabilna to **Angular 22** (czerwiec 2026); **Angular 21** to gałąź LTS (wsparcie do V 2027) – bezpieczna alternatywa jako cel pośredni/końcowy.
- Angular Material: od w. 15 wszystkie komponenty są oparte o MDC; od w. 17/18 dostępne jest pełne, stabilne **theming Material 3** oparte o design tokeny (`mat.theme()` / `mat.define-theme()`, CSS custom properties zamiast prebuilt theme).

## 2. Cel

1. Zaktualizować Angular 13 → najnowszy stabilny (Angular 22, ewentualnie zatrzymanie na LTS 21).
2. Zaktualizować Angular Material/CDK do najnowszej wersji, przejść z legacy (pre-MDC) na komponenty MDC, a następnie na **Material Design 3** (nowy system motywu opartych o tokeny).
3. Odświeżyć wygląd aplikacji zgodnie z aktualnym Material 3 (kolory, kształty, typografia, tryb jasny/ciemny).
4. Poprawić/uaktualnić copyright w stopce.
5. Domknąć porządki: Node/TS/Docker, ujednolicenie Bootstrap+FontAwesome vs Material.

## 3. Kroki migracji

### Krok 0 – przygotowanie
- Nowa gałąź (np. `feature/angular-material-modernization`), commit startowy = ten audyt.
- `npm ci` na czystym `node_modules`, upewnić się że build/test przechodzą na obecnej wersji (baseline).
- Zrobić zrzuty ekranu obecnego UI (desktop + mobile) do porównania "przed/po".

### Krok 1 – aktualizacja Angulara (iteracyjnie, major po majorze)
`ng update` zwykle wspiera tylko przejście do kolejnego majora, więc aktualizacja przebiega łańcuchowo:

```
ng update @angular/core@14 @angular/cli@14
ng update @angular/core@15 @angular/cli@15 @angular/material@15   # tu: migracja MDC
ng update @angular/core@16 @angular/cli@16 @angular/material@16
ng update @angular/core@17 @angular/cli@17 @angular/material@17   # nowy control flow, opcja standalone
ng update @angular/core@18 @angular/cli@18 @angular/material@18   # Material 3 stabilne
ng update @angular/core@19 @angular/cli@19 @angular/material@19
ng update @angular/core@20 @angular/cli@20 @angular/material@20
ng update @angular/core@21 @angular/cli@21 @angular/material@21   # LTS – checkpoint
ng update @angular/core@22 @angular/cli@22 @angular/material@22   # jeśli decyzja: idziemy na latest
```
Po każdym kroku: `npm run build`, `ng serve` i szybki przegląd wizualny + `ng update` odpala własne schematy migracyjne (m.in. usuwanie `entryComponents`, aktualizacja `tsconfig`, itp.) – nie pomijać ich.

Przy okazji: TypeScript zostanie podbity automatycznie przez schematy `ng update` (do wersji wymaganej przez dany Angular).

### Krok 2 – migracja Angular Material: legacy → MDC (w wersji 15)
- Uruchomić oficjalny schemat: `ng generate @angular/material:mdc-migration`.
- Przejrzeć i poprawić customowe CSS z pkt. 1 (klasy `.mat-form-field-*`, `.mat-expansion-panel-body`, `.mat-raised-button`) – zastąpić je oficjalnymi API (np. `density`, `appearance`, tokeny CSS) zamiast nadpisywania prywatnych klas.
- Usunąć prebuilt theme `indigo-pink.css` z `angular.json` jako krok przygotowawczy pod Material 3 (Krok 3).

### Krok 3 – nowy motyw Material 3 (po dojściu do w. 18+)
- Zbudować własny motyw przez Sass API: `@use '@angular/material' as mat;` + `mat.theme(...)` / `mat.define-theme(...)` z paletą kolorów dobraną pod branding (`grawires.pl` / obecny odcień indygo lub nowy kolor przewodni).
- Rozważyć wsparcie **trybu ciemnego** (Material 3 ułatwia to przez `color-scheme` / tokeny `light-dark()`).
- Zastąpić ręczne media-query hacki na `mat-raised-button`/`mat-expansion-panel` (w `styles.css`) oficjalnymi tokenami density/typography z nowego API.
- Ujednolicić `appearance` na formularzach (`outline` we wszystkich `mat-form-field`, rekomendowane w M3).

### Krok 4 – porządki architektoniczne (opcjonalne, ale rekomendowane przy okazji)
- `ng generate @angular/core:control-flow` – zamiana `*ngIf`/`*ngFor` na `@if`/`@for`.
- `ng generate @angular/core:standalone` – przejście z `NgModule` na komponenty standalone (uprości `MaterialModule`, `AppModule`).
- Rozważyć usunięcie Bootstrap + Font Awesome (używane tylko w stopce) i przepisanie stopki na komponenty Material (`mat-toolbar`, `mat-icon-button`, `MatIconModule` z SVG/ligaturami) – eliminuje 2 zbędne zależności/CDN-y i ujednolica wygląd z resztą appki.

### Krok 5 – poprawki treści
- [footer.component.html:41](src/app/main-view/footer/footer.component.html#L41): zamienić `© 2024` na dynamiczny rok, np. w `footer.component.ts` dodać `currentYear = new Date().getFullYear();` i w szablonie `© {{ currentYear }} Copyright: ...` – rozwiązuje problem raz na zawsze, bez potrzeby ręcznych poprawek co rok.

### Krok 6 – infrastruktura
- `Dockerfile`: `FROM node:16` → aktualny LTS Node (zgodny z wymaganiami docelowej wersji Angular/CLI, obecnie Node 20/22 LTS).
- `.browserslistrc` – przejrzeć, czy nadal aktualne (raczej bez zmian).
- Sprawdzić `package-lock.json` po migracji (regenerować `npm ci`).

### Krok 7 – weryfikacja końcowa
- `npm run build` (production) – brak błędów, sprawdzić budżety w `angular.json` (`budgets`) pod nowy rozmiar bundle (Material 3/MDC bywa cięższy).
- `ng test` – zielone testy (obecnie tylko `app.component.spec.ts`).
- Ręczny przegląd UI na desktop/mobile: formularze (`income-form`, `tax-form`, `outcome-form`), tabela wyników (`results.component.html`, 375 linii – największy komponent, priorytet wizualnej weryfikacji), akordeon, stopka.
- Porównanie ze zrzutami z Kroku 0.
- Deploy na środowisko testowe przed mergem do `develop`/`master`.

## 4. Ryzyka / na co uważać

- **Największe ryzyko**: customowe CSS w `styles.css` i `outcome-form.component.css` bazujące na prywatnych klasach DOM Materiala – po MDC-migracji te selektory przestaną trafiać w elementy i część stylowania "zniknie" (trzeba przepisać, nie tylko przetestować).
- Skok 13 → 22 to 9 wersji majorowych – dużo schematów migracyjnych naraz; bezpieczniej robić to krok po kroku i commitować po każdej wersji, żeby łatwo było zbisekcjonować regresję.
- Rozmiar bundle: Material 3/MDC + pełny `MaterialModule` (import wszystkich modułów Material na raz, patrz [material.module.ts](src/app/material/material.module.ts)) może zbliżyć się do budżetu `maximumError: 4mb` w `angular.json` – przy okazji standalone/refaktoru warto rozważyć importowanie tylko używanych modułów per-komponent.
- Bootstrap + Font Awesome + Material razem = 3 systemy stylowania w jednej stopce – warto zdecydować, czy zostają (dług wizualny) czy są zastępowane Materialem (Krok 4).

## 5. Decyzje do potwierdzenia z Tobą

1. Cel wersji: **Angular 22 (latest)** czy **Angular 21 (LTS)** jako bezpieczniejszy przystanek?
2. Czy przy okazji usuwamy Bootstrap/Font Awesome ze stopki na rzecz czystego Material, czy zostawiamy jak jest?
3. Czy wchodzimy w standalone components + nowy control flow (`@if`/`@for`), czy tylko sama aktualizacja bibliotek bez zmiany architektury?
4. Paleta kolorów dla nowego motywu M3 – zostajemy przy odcieniu indygo (zbliżonym do obecnego) czy nowy branding?
