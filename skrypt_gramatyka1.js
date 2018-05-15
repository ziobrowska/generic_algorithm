function rysuj_gramatyke() {   
      var dlugosc_prostokata = 30;
      var wysokosc_prostokata = 90;
      var juz_jest = false;
      
        var pole = d3.select('#svg');
        var prost = pole.selectAll("rect");
        
        var prostokaty = [];
        var prostokat = {
                        "x": 700,
                        "y": 200,
                        "width": dlugosc_prostokata,
                        "height": wysokosc_prostokata,
                        "color": '#ff0000'
        }
        
        prostokaty.push(prostokat);
                
        // Funkcja rysująca kształty na podstawie tablicy
        function rysuj(){
          prost.data(prostokaty)
                  .enter() 
                  .append("rect")
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("width", function(d) { return d.width; })
                  .attr("height", function(d) { return d.height; })
                  .style("fill", function(d) {return d.color; })
                  .on("click", function(d) { if(d3.event.ctrlKey) { return dodaj_na(d);} else { return dodaj_l_d(d); }})
                  .on("contextmenu", function(d) { return dodaj_p_g(d); })
                                                                        
        }
		
		
        function sprawdz_prostokat(nowyProst){
          for (var i = 0; i<prostokaty.length; i++){
            if (prostokaty[i].x == nowyProst.x){
              if (prostokaty[i].y == nowyProst.y){
                juz_jest = true;
              }
            }
          }
          
         if (!juz_jest){
            prostokaty.push(nowyProst);
         }
        juz_jest = false;
       }
         
        // Dodanie nowego kształtu do tablicy i odświeżenie rysunku
        function dodaj_l_d(prostokat) {
          if(prostokat.width == 30) { 
              var nowyProst = {
                "x": prostokat.x,
                "y": prostokat.y + wysokosc_prostokata,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": '#'+Math.random().toString(16).substr(-6)
              }
              sprawdz_prostokat(nowyProst);
             // prostokaty.push(nowyProst);
          }else if(prostokat.width == 90) { 
             var nowyProst = {
                "x": prostokat.x - wysokosc_prostokata,
                "y": prostokat.y,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": '#'+Math.random().toString(16).substr(-6)
              }
             sprawdz_prostokat(nowyProst); 
            // prostokaty.push(nowyProst)
          }
        rysuj();
        }
      
       function dodaj_p_g(prostokat) {
          if(prostokat.width == 30) { 
              var nowyProst = {
                "x": prostokat.x,
                "y": prostokat.y - wysokosc_prostokata,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": '#'+Math.random().toString(16).substr(-6)
              }
               sprawdz_prostokat(nowyProst);
             // prostokaty.push(nowyProst);
          }else if(prostokat.width == 90) { 
             var nowyProst = {
                "x": prostokat.x + wysokosc_prostokata,
                "y": prostokat.y,
                "width": prostokat.width,
                "height": prostokat.height,
                "color": '#'+Math.random().toString(16).substr(-6)
              }
             sprawdz_prostokat(nowyProst);
             // prostokaty.push(nowyProst)
          }
         rysuj();
        }
        
      function dodaj_na(prostokat) {
         if(prostokat.width == 30) { 
           var nowyProst = {
              "x": prostokat.x - 30,
              "y": prostokat.y  + 30,
              "width": wysokosc_prostokata,
              "height": dlugosc_prostokata,
              "color": '#'+Math.random().toString(16).substr(-6)
            }
               sprawdz_prostokat(nowyProst);
           // prostokaty.push(nowyProst)
         }else if(prostokat.width == 90) { 
           
              var nowyProst = {
                  "x": prostokat.x + 30,
                  "y": prostokat.y  - 30,
                  "width": dlugosc_prostokata,
                  "height": wysokosc_prostokata,
                  "color": '#'+Math.random().toString(16).substr(-6)
                }
               sprawdz_prostokat(nowyProst);
               // prostokaty.push(nowyProst)
        }
        rysuj();
      }
  
      rysuj();

}