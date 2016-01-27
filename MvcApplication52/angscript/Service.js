app.service("esService", function ($http) {
    this.getespaging = function (from, size, fulltext, sortfield, sort, indexName, ipaddres, searchfield, searchfieldvalue) {
        return $http.post("/json/SearchAll",
            { size: size, from: from, fulltext: fulltext, sortfield: sortfield, sort: sort, IndexName: indexName, IpAddress: ipaddres, SearchField: searchfield, SearchFieldValue: searchfieldvalue },
            { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };

    this.getallproperties = function (ipaddres) {
        return $http.post("/json/GetAllProperties",
            { IpAddress: ipaddres },
            { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };
    this.getallpropertiesv2 = function (ipaddres) {
        return $http.post("/json/GetAllPropertiesv2",
            { IpAddress: ipaddres },
            { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };

    this.getNodes = function (ipaddres) {
        return $http.post("/json/GetNodes",
            { IpAddress: ipaddres },
            { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };

    this.readApiAddresses = function (ipaddres) {
        return $http.get("/json/ReadipAddress", { IpAddress: ipaddres }, { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };
    this.getdeletedoc = function (ipaddres, indexname, indextype, id) {
        return $http.post("/json/DeleteDoc", { ipaddres: ipaddres, indexname: indexname, indextype: indextype, id: id }, { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'POST' });
    };

    this.getcpuandmemory = function (ipaddres, node) {
        return $http.get("/json/GetCpuAndMemory?ipAddress=" + ipaddres + "&node=" + node, { headers: { 'Content-Type': 'application/json' } }, { dataType: 'json' }, { method: 'GET' });
    };
});
