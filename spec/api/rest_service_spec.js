var frisby = require('frisby');

//1
frisby.create('Ensure we are dealing with a teapot')
  .get('http://httpbin.org/status/418')
  .expectStatus(418)
.toss()

//2
frisby.create('Ensure response has a proper JSON Content-Type header')
  .get('http://httpbin.org/get')
  .expectHeader('Content-Type', 'application/json')
.toss();

//3
frisby.create('Ensure response has JSON somewhere in the Content-Type header')
  .get('http://httpbin.org/get')
  .expectHeaderContains('Content-Type', 'json')
.toss();

//4
frisby.create('Ensure test has foo and bar')
  .get('http://httpbin.org/get?foo=bar&bar=baz')
  .expectJSON({
    args: {
      foo: 'bar',
      bar: 'baz'
    }
  })
.toss()

