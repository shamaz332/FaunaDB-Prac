  
    const faunadb = require('faunadb'),
    q = faunadb.query;
  require('dotenv').config();
  
  
  (async () =>{
  
      var client = new faunadb.Client({ secret: "fnAD6IskqrACBZfggJzQvKo6IhakeKuyCpDUAmY2"});
      
      //create database
      try {
        var result = await client.query(
          q.CreateCollection({ name: 'firstCollection' })
        );
        console.log(result);
      } 
      catch (error){
        if (error.requestResult.statusCode === 400 && error.message === 'instance already exists') {
          console.log('Database with this name already exists');
        }
        else {
          console.log('Unknow Error: ');
          console.log(error);
        }
        
      }
  
  })();
  