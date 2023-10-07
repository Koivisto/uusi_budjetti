# uusi_budjetti
 Taulukkomuodosta uusi CSV budjetti vanhaan taulukkomuotoon sopivaksi.

 0. Lataa tämän repositorion tiedostot, tai ainakin index.html ja script.js samaan kansioon ja avaa selaimella index.html-tiedosto

## Hae Budjetti
 1. Valtiovarainministeriön sivuilta https://budjetti.vm.fi/indox/opendata-csv.jsp
 2. Esimerkiksi https://budjetti.vm.fi/indox/opendata/2024/tae/valtiovarainministerionKanta/2024-tae-valtiovarainministerionKanta.html
 3. Lataa haluamasi CSV tiedostot
 4.a Yhdistä kaikki CSV tiedostot yhteen tiedostoon
 4.b Vaihtoehtoisesti käytä kansiossa data olevaa "yhdistelmä budjetti TAE 2024.csv"-tiedostoa

## Avaa index.html
 5. Syötä CSV tiedosto kenttään

## Vertaa vanhaan budjettiin
 6.a Käytä edellisen vuoden budjetin "budjettipuu"-kolumnia jonka muoto on momenttitasot eroteltuna pisteillä, tyyliin "33.40.54."
 6.b Vaihtoehtoisesti käytä kansiossa data olevaa "Budjettipuu 2023.txt"-tiedostoa, joka on Liberaalipuolueen vaihtoehtobudjetin 2023 rakenne

## Kopioi taulukko haluamaasi taulukko-ohjelmaan
 7. Luo kadonnut otsikkorivi uudelleen
 7.a esimerkiksi kopioimalla tämä: "Momenttitaso	Budjettipuu	Pääluokan numero	Pääluokan nimi	Menoluvun numero	Menoluvun nimi	Menomomentin numero	Menomomentin nimi	Menomomentin info-osa	Määräraha	Aiemmin budjetoitu IX lisätalousarvio 2023	Aiemmin budjetoitu VIII lisätalousarvio 2023	Aiemmin budjetoitu VII lisätalousarvio 2023	Aiemmin budjetoitu VI lisätalousarvio 2023	Aiemmin budjetoitu V lisätalousarvio 2023	Aiemmin budjetoitu IV lisätalousarvio 2023	Aiemmin budjetoitu III lisätalousarvio 2023	Aiemmin budjetoitu II lisätalousarvio 2023	Aiemmin budjetoitu I lisätalousarvio 2023	Aiemmin budjetoitu 2023	Toteutuma 2023	Toteutuma 2022"
 8. Google Spreadsheetissä pitää muuttaa "budjettipuu"- kolumni "Pelkkä teksti" formaattiin, jotta sitä ei kohdella lukuna ja sorttaaminen oikeaan järjestykseen mahdollistuu.
 9. Budjettipuoli "tulo" tai "meno" kannattaa myös luoda.