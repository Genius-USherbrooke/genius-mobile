global.Buffer = global.Buffer || require('buffer').Buffer;

export async function login(cip: string, password: string): Promise<boolean> {
  const cheerio = require('cheerio');
  let lt, execution;
  let success = false;

  await fetch("https://cas.usherbrooke.ca/login", {
      "credentials": "include",
      "method": "GET",
      "mode": "cors"
    })
    .then(res => res.text())
    .then(res => {
      const $ = cheerio.load(res);
      lt = $('[name=lt]').val();
      execution = $('[name=execution]').val();
    });
  // Todo catch error if already signed

  // console.log(lt, execution);

  await fetch("https://cas.usherbrooke.ca/login", {
    "credentials":"include",
    "headers": {
      "content-type":"application/x-www-form-urlencoded",
    },
    "body":`username=${cip}&password=${password}&lt=${lt}&execution=${execution}&_eventId=submit&submit=`,
    "method":"POST",
    "mode":"cors"
  })
    .then(res => res.text())
    .then(res => {
      const $ = cheerio.load(res);
      $('h2').map((_, h) => {
        if($(h).text() === "Connexion réussie") {
          success = true;
        }
      });
    });

  return success;
}

export async function isConnected(): Promise<boolean> {
  const cheerio = require('cheerio');
  let success = false;

  await fetch("https://cas.usherbrooke.ca/login", {
    "credentials": "include",
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.text())
    .then(res => {
      const $ = cheerio.load(res);
      $('h2').map((_, h) => {
        if($(h).text() === "Connexion réussie") {
          success = true;
        }
      });
    });

  return success;
}