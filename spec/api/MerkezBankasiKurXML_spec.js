var frisby = require('frisby');
var xml2js = require('xml2js');

var URL_TCMB = 'http://www.tcmb.gov.tr/kurlar/today.xml';

//TC 1 
frisby.create('200 OK and content-type verification')
  .get(URL_TCMB)
  .expectStatus(200).expectHeaderContains('content-type', 'application/xml').inspectHeaders()
.toss()

//TC 2 
frisby.create('XML stylesheet verification')
  .get(URL_TCMB).expectBodyContains('?xml-stylesheet type="text/xsl" href="isokur.xsl"?').inspectBody()
.toss()

//TC 3 
frisby.create('US DOLLAR verification')
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

//TC 4
frisby.create('Verify that the response < 5')
  .get('URL_TCMB')
  .expectMaxResponseTime(5)
.toss()

//TC 5

