const faunadb = require("faunadb"),
  q = faunadb.query;
require("dotenv").config();

(async () => {
  var client = new faunadb.Client({
    secret: "fnAD6IskqrACBZfggJzQvKo6IhakeKuyCpDUAmY2",
  });

  //create database
  try {
    const result = await client.query(
      q.Map(
        ["First Title", "Second Title", "Third Title"],

        q.Lambda(
          "post_title",
          q.Create(q.Collection("firstCollection"), {
            data: {
              title: q.Var("post_title"),
            },
          })
        )
      )
    );
    console.log(result);
  } catch (error) {
    if (
      error.requestResult.statusCode === 400 &&
      error.message === "instance already exists"
    ) {
      console.log("Database with this name already exists");
    } else {
      console.log("Unknow Error: ");
      console.log(error);
    }
  }
})();
