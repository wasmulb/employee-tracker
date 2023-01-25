// const person = {
//     firstName: 'John',
//     lastName: 'Doe'
// };

// const propertyNames = Object.keys(person);

// // console.log(propertyNames);[ 'firstName', 'lastName' ]

// const propertyValues = Object.values(person);

// // console.log(propertyValues);[ 'John', 'Doe' ]

const result = [
    { id: 1, department: 'Engineering' },
    { id: 2, department: 'Weapons' },
    { id: 3, department: 'Navigation' },
    { id: 4, department: 'Supply' },
    { id: 5, department: 'Executive' },
    { id: 6, department: 'Test' }
  ]

  depArray = result.map(function (obj) {
    return obj.department;
  });

  console.log(depArray)

// for(i=0;i<result.length;i++){
//     let depChoices = [];
//     let depArray = Object.values(result[i])
//     depChoices.push(depArray)
//     console.log(dep)
// }
