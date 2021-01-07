db.coches.insertMany([
 
    {   _id: "1",
        "Nombre":"Seat Ibiza MK2", 
        "Fabricante": "Seat",
        "peso": 895, 
        "cilindrada": 1391,
        "cv": 60, 
        "motor": [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("1993-12-23"),
        "cantidadvendidos": 2500000,
        "precio": 18000
    },
    
    {   _id: "2",
        "Nombre":"Peugeot Partner", 
        "Fabricante": "Peugeot",
        "peso": 1407, 
        "cilindrada": 1560,
        "cv": 75, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"diesel"}],
        "fecha de fabricacion": new Date("2006-11-24"),
        "cantidadvendidos": 1500000,
        "precio": 17000
    },
    {   _id: "3",
        "Nombre":"Seat León II", 
        "Fabricante": "Seat",
        "peso": 1.365 , 
        "cilindrada": 1760,
        "cv": 180, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"diesel"}],
        "fecha de fabricacion": new Date("2003-11-18"),
        "cantidadvendidos": 9000000,
        "precio": 25000
    },
    {   _id: "4",
        "Nombre":"Seat Ibiza III", 
        "Fabricante": "Seat",
        "peso": 1170, 
        "cilindrada": 1598,
        "cv": 90, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("2011-01-13"),
        "cantidadvendidos": 2500000,
        "precio": 20000

    },
    {   _id: "5",
        "Nombre":"Seat 127",
        "Fabricante": "Seat",
        "cilindrada": 1010,
        "cv": 52, 
        "motor":  [{"cilindros":"3 cilindros en línea" ,"combustible":"gasolina"}],
         "fecha de fabricacion": new Date("1974-09-15"),
         "cantidadvendidos": 9500000,
         "precio": 9000
    },
    {   _id: "6",
        "Nombre":"Peugeot 308",
        "Fabricante": "Peugeot",
        "cilindrada": 1560,
        "cv": 110, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"diesel"}],
         "fecha de fabricacion": new Date("2008-10-03"),
         "cantidadvendidos":7500000,
         "precio": 21000
    },
    {   _id: "7",
        "Nombre":"Hyundai Accent",
        "Fabricante": "Hyundai",
        "peso": 1035,
        "cilindrada": 1341,
        "cv": 85, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("2004-09-16"),
        "cantidadvendidos": 1890000,
        "precio": 11000
         
    },
    
    {   _id: "8",
        "Nombre":"Fiat 850 Coupé Sport",
        "Fabricante": "Fiat",
        "peso": 750,
        "cilindrada": 903,
        "cv": 52, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("1968-10-28"),
        "cantidadvendidos": 800000,
        "precio": 13000
         
    },
    {   _id: "9",
        "Nombre":"Simca 1000",
        "Fabricante": "Simca",
        "peso": 730,
        "cilindrada": 944,
        "cv": 42, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("1972-10-27"),
        "cantidadvendidos": 1500000,
        "precio": 7000
         
    },
    {   _id: "10",
        "Nombre":"Simca 1200",
        "Fabricante": "Simca",
        "cilindrada": 1204,
        "cv": 80, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"gasolina"}],
        "fecha de fabricacion": new Date("1970-01-29"),
        "cantidadvendidos": 500000,
        "precio": 10000
    },
    {   _id: "11",
        "Nombre":"Ford Mondeo Sedan Titanium",
        "Fabricante": "Ford",
        "peso": 1579,
        "cilindrada": 1999,
        "cv": 140, 
        "motor":  [{"cilindros":"4 cilindros en línea" ,"combustible":"hibrido"}],
        "fecha de fabricacion": new Date("2019-10-24"),
        "cantidadvendidos": 1500000,
        "precio": 25000
         
    }
        
     ]);

     
     // Selecciona todos los coches cuyo combustible utilizado sea el diesel
     
     
     db.coches.aggregate ( [
        {$match: {"motor.combustible": "diesel"} },
    ])
    //Cuenta los documentos que hay en la colección
    db.coches.aggregate ( [
        {
          $group: {
             _id: null,
             count: { $sum: 1 }
          }
        }
      ] )
//Los agrupa por fabricante y hace la media de las ganancias de cada modelo de cada fabricante 
//y tambien hace la media de las cantidades vendidas de media de cada modelo del fabricante
      db.coches.aggregate(
        [
          {
            $group:
              {
                _id: "$Fabricante",
                avgmarca: { $avg: { $multiply: [ "$precio", "$cantidadvendidos" ] } },
                avgcantidadvendidos: { $avg: "$cantidadvendidos" }
              }
          }
        ]
     )
//Similar al anterior, ya que se agrupa por fabricante, pero ahora saca el máximo dinero conseguido por cada modelo de coche
// y también saca la cantidad del modelo más vendido del fabricante
     db.coches.aggregate(
        [
          {
            $group:
              {
                _id: "$Fabricante",
                maxdineroconseguido: { $max: { $multiply: [ "$precio", "$cantidadvendidos" ] } },
                maxcantidad: { $max: "$cantidadvendidos" }
              }
          }
        ]
     )

//Aggregate para averiguar los años de cada uno de los coches de la lista
     db.coches.aggregate(
        [
          {
            $project:
              { _id:"$Nombre",
                año: {"$divide":[{ $subtract: [ new Date(), "$fecha de fabricacion" ]  }, 1000 * 60 * 60 * 24 * 365]}
            
                
              }
          }
        ]
     );
