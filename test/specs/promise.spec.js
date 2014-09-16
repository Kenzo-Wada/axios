describe('promise', function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });

  it('should provide succinct object to then', function () {
    var response;
    var fulfilled = false;

    axios({
      url: '/foo'
    }).then(function (r) {
        response = r;
        fulfilled = true;
      });

    var request = jasmine.Ajax.requests.mostRecent();
    request.response({
      status: 200,
      responseText: '{"hello":"world"}'
    });

    waitsFor(function () {
      return fulfilled;
    });

    runs(function () {
      expect(typeof response).toEqual('object');
      expect(response.data.hello).toEqual('world');
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toEqual('application/json');
      expect(response.config.url).toEqual('/foo');
    });
  });

  it('should provide verbose arguments to success', function () {
    var data;
    var status;
    var headers;
    var config;
    var fulfilled = false;

    axios({
      url: '/foo'
    }).success(function (d, s, h, c) {
        data = d;
        status = s;
        headers = h;
        config = c;
        fulfilled = true;
      });

    var request = jasmine.Ajax.requests.mostRecent();
    request.response({
      status: 200,
      responseText: '{"hello":"world"}'
    });

    waitsFor(function () {
      return fulfilled;
    });

    runs(function () {
      expect(data.hello).toEqual('world');
      expect(status).toBe(200);
      expect(headers['content-type']).toEqual('application/json');
      expect(config.url).toEqual('/foo');
    });
  });
});