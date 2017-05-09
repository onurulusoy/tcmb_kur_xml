var frisby = require('frisby');
var xml2js = require('xml2js');

var URL_TCMB = 'http://www.tcmb.gov.tr/kurlar/today.xml';
var extractedData = 0;

//TC 1 
frisby.create('200 OK and content-type verification').waits(2000)
  .get(URL_TCMB)
  .expectStatus(200).expectHeaderContains('content-type', 'application/xml')
.toss()

//TC 2 
frisby.create('XML stylesheet verification').waits(2000)
  .get(URL_TCMB).expectBodyContains('?xml-stylesheet type="text/xsl" href="isokur.xsl"?')
.toss()

//TC 3
frisby.create('Verify that the response < 100 ms').waits(2000)
  .get(URL_TCMB)
  .expectMaxResponseTime(100).expectStatus(200)
.toss()

//TC 4
frisby.create('Verification of US DOLLAR Sytnax').waits(2000)
  .get(URL_TCMB).after(function (err, res, body) {
        //var parser = new xml2js.Parser();
        var parser = new xml2js.Parser({explicitArray : false});
        parser.parseString(body, function (err, result) {
           expect(result).toContainJson({
                "Tarih_Date": {
                  "Currency": [{
                  "Isim": "ABD DOLARI",
                   "CurrencyName": "US DOLLAR"
                  }]
                }
            });
        });
    })  
.toss()

//TC 5
frisby.create('Verify that US DOLLAR ForexBuying Value is greater than 3').waits(2000)
  .get(URL_TCMB).after(function (err, res, body) {
        var parser = new xml2js.Parser();
        parser.parseString(body, function (err, result) {
              extractedData = result['Tarih_Date']['Currency'][0]['ForexBuying']
              expect(extractedData).toBeGreaterThan(3);
              console.log("\n\nUS DOLLAR ForexBuying: " + extractedData + "\n\n");
        });
    }).expectStatus(200)
.toss()

