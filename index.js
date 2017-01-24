const pg = require('pg');

const dataToAdd = require('./sb.json');

const config = {
  user: 'springball',
  database: 'springball',
  password: 'springball',
  host: 'localhost',
  port: '5432'
};

const test = [
  {
    "name": "domlyons",
    "crsid": "dal46",
    "ticket": "standard"
  },
];

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  let userid = 20000;

  dataToAdd.map(person => {
      const crsid = person.crsid;
      const name = person.name.replace('\'', '\'\'');
      const ticketType = person.ticket === 'standard' ? 1 : 2;
      let personId = userid;
      userid+=1;
      client.query(`SELECT userid FROM public.useridentity WHERE externalid = '${crsid}'`, (err, result) => {


        if (result.rows.length) {
          personId = result.rows[0].userid;
        } else {
          const credentials = JSON.stringify({ "identifier": crsid });
          const created = new Date().toISOString();
          client.query(`INSERT INTO public.useridentity (provider, authscheme, externalid, credentials, id, userid)
                    VALUES('raven', 'openid', '${crsid}', '${credentials}', ${personId}, ${personId})`);


          client.query(`INSERT INTO public.user (username, password, email, id)
                    VALUES('raven.${crsid}', 'whateverString', '${crsid}@loopback.raven.com', ${personId})`);

          client.query(`INSERT INTO public.profile 
                        (name, crsid, institution, email, ischurchill, id, userid)
                VALUES  ('${name}', '${crsid}@cam.ac.uk', 'Churchill College - Undergraduates', '${crsid}', 
                        'true', ${personId}, ${personId})`);
        }


        client.query(`INSERT INTO public.order (paymentmethod, paymentfee, total, id, userid)
                  VALUES('College Account', 0, ${ticketType === 1 ? 95 : 105}, ${personId}, ${personId})`);



        client.query(`INSERT INTO public.ticket (name, email, price, id, orderid, tickettypeid)
                  VALUES('${name}', '${crsid}@cam.ac.uk', ${ticketType === 1 ? 95 : 105}, ${personId}, ${personId}, ${ticketType})`);
        console.log(name)

      })

    }
  );
});