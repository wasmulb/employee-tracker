let result = [
    { id: 1, department: 'Engineering' },
    { id: 2, department: 'Weapons' },
    { id: 3, department: 'Navigation' },
    { id: 4, department: 'Supply' },
    { id: 5, department: 'Executive' },
    { id: 6, department: 'Test' }
  ]

  let arrayObj = [{key1:'value1', key2:'value2'},{key1:'value1', key2:'value2'}];

  arrayObj = arrayObj.map(item => {
    return {
      stroke: item.key1,
      strike: item.key2
    };
  });

  console.log(arrayObj);

  result = result.map(item =>{
    return {
        name: item.department,
        value: item.id
    };
  });

  console.log(result)

  depArray = result.map(function (obj) {
    return obj.department;