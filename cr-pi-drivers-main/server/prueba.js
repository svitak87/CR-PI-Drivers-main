const user = {
  id: 1,
  name: "Oscar",
  age: 36,
};

for (const prop in user) {
  console.log(prop + ":", user[prop]);
}

const myArray = "leonor, gina, javier";

const transformation = myArray.split(", ");

console.log(transformation);

transformation.forEach((person, index) => {
  console.log(`Hi, Im ${person}`);
});

const transformer = (array) => {
  array.forEach((element) => {
    let name = element.name.forename;
    let lastname = element.name.surname;
  });
};

const buscarEnFrase = (frase, letraRepetida) => {
  const arrayFrase = frase.split("");
  console.log(arrayFrase);
  let total = 0;
  for (let i = 0; i < arrayFrase.length; i++) {
    if (arrayFrase[i] === letraRepetida) {
      total++;
    }
  }
  return total;
};

const fraseUno = "hdjsahdjashhhhhhhdjsadhscxcoxcxc";
console.log(buscarEnFrase(fraseUno, "h"));

const invertir = (string) => {
  let stringInvertido = string.split("");
  let result = "";
  for (let i = stringInvertido.length - 1; i >= 0; i--) {
    result += stringInvertido[i];
  }
  return result;
};
const string = "Hola";
console.log(invertir(string));

const maxLength = (frase) => {
  const arrayFrase = frase.split(" ");
  console.log(arrayFrase);
  let result = "";
  for (let i = 0; i < arrayFrase.length; i++) {
    if (arrayFrase[i].length > result.length) {
      result = arrayFrase[i];
    }
  }
  return result;
};
const ejemploFrase = "Javascript Hola Lautaro esternocleidomastoideo";
console.log(maxLength(ejemploFrase));

const drivers = [
  {
    id: 1,
    driverRef: "hamilton",
    number: 44,
    code: "HAM",
    name: { forename: "Lewis", surname: "Hamilton" },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
      imageby:
        "By Morio - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=52060566",
    },
    dob: "1985-01-07",
    nationality: "British",
    url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
    teams: "McLaren, Mercedes",
    description:
      "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history.",
  },
  {
    id: 2,
    driverRef: "heidfeld",
    number: "\\N",
    code: "HEI",
    name: { forename: "Nick", surname: "Heidfeld" },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg/330px-Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg",
      imageby:
        "By https://www.flickr.com/photos/69527563@N05/ - https://www.flickr.com/photos/69527563@N05/48242681251/, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=80386033",
    },
    dob: "1977-05-10",
    nationality: "German",
    url: "https://en.wikipedia.org/wiki/Nick_Heidfeld",
    teams: "Prost, Sauber, Jordan, Williams, BMW, Sauber, Renault",
    description:
      "Nick Lars Heidfeld (born 10 May 1977) is a German professional racing driver. Despite scoring regular podium finishes in 2005 with Williams, and in 2007 and 2008 with BMW Sauber, Heidfeld never won a race after debuting in Formula One in 2000. Heidfeld currently holds two Formula One records; most podium finishes without a Grand Prix win, and the most second-place finishes without a wi. In 2011, Heidfeld raced in Formula One for the Renault team as a replacement for the injured Robert Kubica, his former BMW Sauber teammate,before being replaced by Bruno Senna. He last drove for the Rebellion Racing team in the FIA World Endurance Championship and for Mahindra Racing Formula E Team in Formula E.",
  },
];

const investigation = (array) => {
  const drivers = [];
  for (let i = 0; i < array.length; i++) {
    const teams = array[i].teams
      .split(", ")
      .map((team) => ({ name: team.trim() }));

    const driver = {
      id: array[i].id,
      name: array[i].name.forename,
      lastname: array[i].name.surname,
      image: array[i].image.url,
      dob: array[i].dob,
      nationality: array[i].nationality,
      teams: teams,
    };
    drivers.push(driver);
  }
  return drivers;
};

console.log(investigation(drivers));

const driver = [
  { name: "oscar", dob: "2004-12-31" },
  { name: "gina", dob: "1990-07-08" },
  { name: 'javier', dob: '1960-12-01'},
  { name: 'javier', dob: '1789-12-01'},
];


const miFuncion = (array) => {
  const orden = [...array];
  return orden.sort((a, b) => {
    const dateA = new Date(a.dob); // Fecha de nacimiento del primer conductor
    const dateB = new Date(b.dob); // Fecha de nacimiento del segundo conductor
    return dateA - dateB; // Ordena de menor a mayor
  });
};

console.log(miFuncion(driver));
const arrayZapa = ['oscar', 'gina', 'leonor', ' javier']
console.log(arrayZapa.sort())

console.log(driver.sort())

const axios = require('axios');

// const jsonPlaceHolder = async () => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
//     const data = await response.json();
//     console.log(data)
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// const pedidoInfo = () => {
//   fetch(`https://jsonplaceholder.typicode.com/users`)
//     .then((response) => {
//       return response.json(); // Devuelve la promesa que se resuelve con los datos
//     })
//     .then((data) => {
//       console.log(data); // Imprime los datos una vez que la promesa se resuelve
//       return data; // Retorna los datos para que puedan ser usados externamente
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// pedidoInfo();


// const superPedidoInfo = async () => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
//     const data = await response.json()
//     const extractName = data.map((user) => user.name)
//     const array = [...extractName];
//     for(const user of extractName){
//       array.push(user.toLowerCase())
//     }
//     console.log(array)
//     console.log(extractName)
//   } catch (error) {
    
//   }
// }

// superPedidoInfo()


// const miInfo = () => {
//   return fetch(`https://jsonplaceholder.typicode.com/users`)
//   .then((response) => response.json())
//   .then((data) => {
//     return data
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }

// miInfo().then((data) => {
//   console.log(data);
// });

const superPedidoInfo = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const headers = response.data;
    return headers;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

superPedidoInfo()
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.error(error);
});






