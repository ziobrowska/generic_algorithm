 var dlugosc_prostokata = 10;
  var wysokosc_prostokata = 30;
  var juz_jest = false;
  var dodaj_krok = false;
  var dodalem = false;
  var z_regul = false;
  var liczba_figur = 12;
  var kroki = 19;
  var liczba_pokolen = 0;
  var ilosc = 6;


  var figury = [];
  var reguly = [];
  var najlepsze = [];
  var nowe_reguly = [];

 //funkcja rysująca wszystkie figury w pokoleniu początkowym
function rysuj(pokolenie){
    console.log("Rysuję populację początkową");
  
    document.getElementById('napis').innerHTML += '<h1> POKOLENIE ' + liczba_pokolen + '</h1> <br> <br>';
      if(liczba_figur > 10){
         for (var j = 0; j < 10; j++){
            document.getElementById("rysowanie").innerHTML += '<svg class="svg1" id="svg' + (j) + '"> </svg>';
            var pole = d3.select('#svg'+j+'');
            var prost = pole.selectAll("rect");
            rysuj2(pokolenie[j], prost);

          } 
        
      }else {
          for (var j = 0; j < pokolenie.length; j++){
            document.getElementById("rysowanie").innerHTML += '<svg class="svg1" id="svg' + (j) + '"> </svg>';
            var pole = d3.select('#svg'+j+'');
            var prost = pole.selectAll("rect");
            rysuj2(pokolenie[j], prost);

          } 
        }
  }

 // Funkcja rysująca pojedynczą figurę na podstawie tablicy
function rysuj2(tablica, prost){
			 prost.data(tablica)
                  .enter() 
                  .append("rect")
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("width", function(d) { return d.width; })
                  .attr("height", function(d) { return d.height; })
                  .style("fill", function(d) {return d.color; })
          }

 function rysuj3(pokolenie){
    console.log("Rysuję pokolenie");
    document.getElementById('napis2').innerHTML += '<h1> POKOLENIE ' + liczba_pokolen + '</h1> <br> <br> ';
    
    if(liczba_figur > 30){
   for (var j = 0; j < 30; j++){
            document.getElementById('zawartosc').innerHTML += '<svg class="svg1" id="svg' + (liczba_pokolen) +'_'+(j) + '"></svg>';
            var div = d3.select('#pokolenie');
            var pole = div.select('#svg'+(liczba_pokolen) +'_'+(j) +'');
            var prost = pole.selectAll("rect");
            rysuj2(pokolenie[j], prost);

          } 
    } else {
      for (var j = 0; j < pokolenie.length; j++){
            
            document.getElementById('zawartosc').innerHTML += '<svg class="svg1" id="svg' + (liczba_pokolen) +'_'+(j) + '"></svg>';
            var div = d3.select('#pokolenie');
            var pole = div.select('#svg'+(liczba_pokolen) +'_'+(j) +'');
            var prost = pole.selectAll("rect");
            rysuj2(pokolenie[j], prost);

          }
    }
 }

 //funkcja losująca liczbę
  function losuj_liczbe(max){
            var max2 = parseInt(max,10);
   			return Math.floor(Math.random()*max2);
    }
		
  //funkcja generująca losowy kształt
  function generuj_losowo(liczba_figur, kroki){
    console.log("Generuję wyjściowe pokolenie");

  for (var j = 0; j < liczba_figur; j++){
    var kolor = '#'+Math.random().toString(16).substr(-6);
    var prostokaty = [];
    var prostokat = {
                "x": 200,
                "y": 200,
                "width": dlugosc_prostokata,
                "height": wysokosc_prostokata,
                "color": kolor
    }
    prostokaty.push(prostokat);
    
    var zestaw=[];
    zestaw.push([0, 0, kolor].slice());

    for (var i = kroki; i>0; i--){
      var random =  losuj_liczbe(3);
         if(random == 0){
              kolor = '#'+Math.random().toString(16).substr(-6);
              dodaj_na(prostokaty, prostokaty[prostokaty.length - 1], kolor);
              if(dodalem == true){
                
                zestaw.push([0, prostokaty.length - 1, kolor]);
//                console.log(zestaw);
                dodalem = false;
              }
              if(dodaj_krok == true){
                i++;
                dodaj_krok = false;
              }
          }else if (random == 1){
              kolor = '#'+Math.random().toString(16).substr(-6);
              dodaj_p_g(prostokaty, prostokaty[prostokaty.length - 1], kolor);
              if(dodalem == true){
                zestaw.push([1, prostokaty.length - 1, kolor]);
//                console.log(zestaw);
                dodalem = false;
              }
              if(dodaj_krok == true){
                i++;
                dodaj_krok = false;
              }
          }else if (random == 2){
              kolor = '#'+Math.random().toString(16).substr(-6);
              dodaj_l_d(prostokaty, prostokaty[prostokaty.length - 1], kolor);
              if(dodalem == true){
                zestaw.push([2, prostokaty.length - 1, kolor]);
//                console.log(zestaw);
                dodalem = false;
              }
              if(dodaj_krok == true){
                i++;
                dodaj_krok = false;
              }
          }
      }
    reguly.push(zestaw);
   figury.push(prostokaty);
   
  }
 console.log(reguly);
  }
  
function rysuj_z_regul(reguly){
  console.log(reguly);
  z_regul = true;
  figury = [];
  
    for (var j = 0; j < reguly.length; j++){  
    var prostokaty = [];
    var prostokat = {
                "x": 200,
                "y": 200,
                "width": dlugosc_prostokata,
                "height": wysokosc_prostokata,
                "color": reguly[j][0][2]
    }
    prostokaty.push(prostokat);
      
      for (var i = 0; i < reguly[j].length; i++){
        if(reguly[j][i][0] == 0){
            dodaj_na(prostokaty, prostokaty[prostokaty.length - 1], reguly[j][i][2] );

          }else if (reguly[j][i][0] == 1){
            dodaj_p_g(prostokaty, prostokaty[prostokaty.length - 1], reguly[j][i][2]);

          }else if (reguly[j][i][0] == 2){
            dodaj_l_d(prostokaty, prostokaty[prostokaty.length - 1], reguly[j][i][2]);
          }
        }
       //console.log(prostokaty);
       figury.push(prostokaty);
    }
  }
			
  function sprawdz_prostokat(prostokaty, nowyProst){
    if(!z_regul){
            for (var i = 0; i<prostokaty.length; i++){
              if (prostokaty[i].x == nowyProst.x){
                if (prostokaty[i].y == nowyProst.y){
                  juz_jest = true;
                  //console.log(" dodaje krok!");
                  dodaj_krok = true;
                }
              }
          }
          
         if (!juz_jest){
            prostokaty.push(nowyProst);
           dodalem = true;
         }
        juz_jest = false;
       }
    else {
       prostokaty.push(nowyProst);
           dodalem = true;
    }
  }
  
  function dodaj_l_d(prostokaty, prostokat, kolor) {
          if(prostokat.width == dlugosc_prostokata) { 
              var nowyProst = {
                "x": prostokat.x,
                "y": prostokat.y + wysokosc_prostokata,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": kolor
              }
              sprawdz_prostokat(prostokaty, nowyProst);
         
          }else if(prostokat.width == wysokosc_prostokata) { 
             var nowyProst = {
                "x": prostokat.x - wysokosc_prostokata,
                "y": prostokat.y,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": kolor
              }
             sprawdz_prostokat(prostokaty, nowyProst); 
            
          }
        }
      
  function dodaj_p_g(prostokaty, prostokat, kolor) {
          if(prostokat.width == dlugosc_prostokata) { 
              var nowyProst = {
                "x": prostokat.x,
                "y": prostokat.y - wysokosc_prostokata,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": kolor
              }
               sprawdz_prostokat(prostokaty, nowyProst);
             // prostokaty.push(nowyProst);
          }else if(prostokat.width == wysokosc_prostokata) { 
             var nowyProst = {
                "x": prostokat.x + wysokosc_prostokata,
                "y": prostokat.y,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": kolor
              }
             sprawdz_prostokat(prostokaty, nowyProst);
             // prostokaty.push(nowyProst)
          }
        }
        
  function dodaj_na(prostokaty, prostokat, kolor) {
         if(prostokat.width == dlugosc_prostokata) { 
           var nowyProst = {
              "x": prostokat.x - dlugosc_prostokata,
              "y": prostokat.y  + dlugosc_prostokata,
              "width": wysokosc_prostokata,
              "height": dlugosc_prostokata,
              "color": kolor
            }
               sprawdz_prostokat(prostokaty, nowyProst);
           
         }else if(prostokat.width == wysokosc_prostokata) { 
           
              var nowyProst = {
                  "x": prostokat.x + dlugosc_prostokata,
                  "y": prostokat.y  - dlugosc_prostokata,
                  "width": dlugosc_prostokata,
                  "height": wysokosc_prostokata,
                  "color": kolor
                }
               sprawdz_prostokat(prostokaty, nowyProst);
          }
        
      }
    
  // podsumowuje wszystkie oceny w jedna
  function ocen_wszystkie(pokolenie){
   
       for (var i = 0; i < pokolenie.length; i++){
         pokolenie[i][kroki+1] = ocen_kolor(pokolenie[i]);
         pokolenie[i][kroki+2] = ocen_nakladanie(pokolenie[i]);
         pokolenie[i][kroki+3] = ocen_rozklad(pokolenie[i]);
         
         pokolenie[i][kroki+4] =  Math.round((pokolenie[i][kroki+1] + pokolenie[i][kroki+2] + pokolenie[i][kroki+3]) / 3);
        }
  }
  
  //ocenia stosnek długości do szerokości
  function ocen_rozklad(prostokaty){
      var max_x = prostokaty[0].x 
      for (var i = 1; i < prostokaty.length; i++){
        if ( prostokaty[i].x > max_x ){
          max_x = prostokaty[i].x;
        }
      }

      var min_x = prostokaty[0].x 
      for (var i = 1; i<prostokaty.length; i++){
        if( prostokaty[i].x < min_x ){
          min_x = prostokaty[i].x;
          i++;
        }
      }

      var max_y = prostokaty[0].y 
      for (var i = 1; i < prostokaty.length; i++){
        if ( prostokaty[i].y > max_y ){
          max_y = prostokaty[i].y;
        }
      }

      var min_y = prostokaty[0].y 
      for (var i = 1; i<prostokaty.length; i++){
        if( prostokaty[i].y < min_y ){
          min_y = prostokaty[i].y;
          i++;
        }
      }

      var dlugosc = max_x - min_x;
      var wysokosc = max_y - min_y;

      return ((dlugosc - wysokosc) / dlugosc * 100);

    }   
  
  //ocenia ilosc przekreslonych el. poziomych
  function ocen_nakladanie(prostokaty){
      var licznik_poziom = 0;
      var licznik_pion = 0;

           for (var i = 0; i < prostokaty.length; i++){
              if (prostokaty[i].width == wysokosc_prostokata ){
                licznik_poziom++;
                for(var j = 0; j<prostokaty.length; j++){
                  if (prostokaty[j].width == dlugosc_prostokata ) {
                    if( prostokaty[j].x == prostokaty[i].x + dlugosc_prostokata &&              prostokaty[j].y == prostokaty[i].y - dlugosc_prostokata){
                        licznik_pion++;
                    }
                  }
                }
              }
           }
       return Math.round( licznik_pion / licznik_poziom * 100);
      }
  
  //ocenia wystepowanie wybranych odcieni niebieskiego
  function ocen_kolor(prostokaty){
        var licznik = 0;
         for (var i = 0; i < prostokaty.length; i++){
            for (var k = prostokaty.length - 1 ; k > 0; k--){
              if (prostokaty[i].x == prostokaty[k].x){
                    if (prostokaty[i].y == prostokaty[k].y){
                      var index = k;
                      break;
                    }
              }
            }
            if (i == index){
                if (prostokaty[i].color == "#87ceeb" || prostokaty[i].color == "#4682b4" || prostokaty[i].color == "#0000ff" || prostokaty[i].color == "#000080" || prostokaty[i].color == "#00ffff" || prostokaty[i].color == "#afeeee" ){
                  licznik++;
                }
            }
          }
      
      return Math.round((licznik/(kroki+1))*100);
   }
  
  function znajdz_najlepsze(pokolenie){
    var licznik = 0;
    var stop = Math.ceil(pokolenie.length / 2);
    
    var tmp = pokolenie.slice();
   
    for (var i = 0; i < tmp.length; i++){
      tmp[i][kroki+5] = i;
    }
      
    var max_i = tmp[0][kroki+5];
    var max = tmp[0][kroki+4];
    var max_i_tmp = 0;
    
    while(true){
        for (var i = 1; i < tmp.length; i++){
         if( tmp[i][kroki+4] > max ){
            max = tmp[i][kroki+4];
            max_i = tmp[i][kroki+5];
            max_i_tmp = i;
          }
        }
        najlepsze.push(max_i);
        licznik++;
        if (licznik >= stop){
          break;
        }
       
      tmp.splice(max_i_tmp, 1);
          
      max_i = tmp[0][kroki+5];
      max = tmp[0][kroki+4];
      max_i_tmp = 0;
           
    }
  //console.log(najlepsze);
  }
  
  function mutuj(prawd, zestaw){
   
   if (prawd < 0.95) {
        return zestaw;
      }else{
        console.log("MUTACJA!!!!");
          var random =  losuj_liczbe(3);
             if(random == 0){
               var liczba2 = losuj_liczbe(3)
               zestaw[0] = liczba2;

              }else if (random == 1){
                zestaw[2] = '#'+Math.random().toString(16).substr(-6);

              }else if (random == 2){
                var liczba2 = losuj_liczbe(3)
                zestaw[0] = liczba2;
                zestaw[2] = '#'+Math.random().toString(16).substr(-6);
              }
         }
     return zestaw;
  }


  //krzyzowanie
  function krzyzuj(reguly) {
//    console.log("krzyzowanie:" );
    var losowe = [ -2, -1, 0, 1, 2];
    var nowy_zestaw = [];
    nowe_reguly = [];
//            
     for (var i = 0; i < najlepsze.length ; i++){
         var figura_pierwsza = reguly[najlepsze[i]].slice();
       
       if(i == najlepsze.length - 1){
          var figura_druga = reguly[najlepsze[0]].slice();
        }else{
           var figura_druga = reguly[najlepsze[i+1]].slice();
        }
        
          var war = losuj_liczbe(5);
          
//           console.log("pierwsza: " + i );
//              console.log("druga: " + j );
//              console.log("war: " + war );
            
            for (var k = 0; k < (Math.floor(kroki/2) + losowe[war]) ; k++){
              //console.log("k: " + k );
              var tmp = mutuj(Math.random(), figura_pierwsza[k]);
              nowy_zestaw.push(tmp);
            }
             
            for (var m = (Math.floor(kroki/2) + losowe[war]) ; m < kroki + 1 ; m++){
             // console.log("m: " + m );
                var tmp = mutuj(Math.random(), figura_druga[m]);
                nowy_zestaw.push(tmp);
              }
             
            nowe_reguly.push(nowy_zestaw);
            nowy_zestaw = [];
            if(nowe_reguly.length >= liczba_figur) break;
       
             for (var k = 0; k < (Math.floor(kroki/2) + losowe[war]) ; k++){
              //console.log("k: " + k );
              var tmp = mutuj(Math.random(), figura_druga[k]);
              nowy_zestaw.push(tmp);
            }
             
            for (var m = (Math.floor(kroki/2) + losowe[war]) ; m < kroki + 1 ; m++){
             // console.log("m: " + m );
                var tmp = mutuj(Math.random(), figura_pierwsza[m]);
                nowy_zestaw.push(tmp);
              }
             
            nowe_reguly.push(nowy_zestaw);
            nowy_zestaw = [];
            if(nowe_reguly.length >= liczba_figur) break;
        }
      liczba_pokolen++;
 
  }
  
function generuj_1_pokolenie(){
  
    krzyzuj(reguly);
   // console.log(reguly);
    reguly = nowe_reguly.slice();
  // console.log(reguly);
    nowe_reguly = [];
    rysuj_z_regul(reguly);
    ocen_wszystkie(figury);
    console.log(reguly);
    console.log(figury);
    najlepsze = [];
    znajdz_najlepsze(figury);
    console.log("Ilość pokoleń: " + liczba_pokolen);
    console.log(najlepsze);
}

function generuj_10_pokolen(){
  for (var i=0; i<10; i++){
    generuj_1_pokolenie();
  }
}

function rysuj_ostatnie(){
  document.getElementById('pokolenie').innerHTML = '<div id="napis2"></div><div id="zawartosc"></div>';
  rysuj3(figury);
}

function losuj_i_ocen() { 
  z_regul = false;
  liczba_pokolen = 0;
  document.getElementById('rysowanie').innerHTML = "";
  document.getElementById('napis').innerHTML = "";
  document.getElementById('pokolenie').innerHTML = '<div id="napis2"></div><div id="zawartosc"></div>';
  figury = [];
  reguly = [];
  najlepsze = [];
  liczba_figur = document.getElementById('liczba_figur').value;
  kroki = (document.getElementById('liczba_prost').value - 1 );
   //pokolenie wyjściowe
  console.log("Rodzice:");
  generuj_losowo(liczba_figur, kroki);
  ocen_wszystkie(figury);
  znajdz_najlepsze(figury);
  console.log(figury);
  console.log(reguly);
  console.log(najlepsze);
  rysuj(figury);
  console.log("Ilość pokoleń: " + liczba_pokolen );

 }

function napisz() {
  document.getElementById("pisz").innerHTML = 
        '<h4> Ilość osobników w pokoleniu wyjściowym: <b> <input type="number" id="liczba_figur" value="12">  </b> </h4><h4>  Ilość elementów składowych każdej z figur: <b> <input type="number" id="liczba_prost" value="20" ></b></h4> <br>';
  
}