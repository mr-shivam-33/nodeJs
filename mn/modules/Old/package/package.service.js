const packageModel  = require('./package.model');
const Q = require('q');
const datatablesQuery = require('datatables-query');

module.exports = {
    testServerSideProcessing:(req)=>{
    params = req.body;
    query = datatablesQuery(packageModel);
    query.run(params).then(function (data) {
        console.log(data);
        return res.json(data);
    },function (err) {
        return res.status(500).json(err);
    });    
    },
    dateFromat:(edate)=>{
        var myDate = new Date(edate);
        var d = myDate.getDate();
        var m =  myDate.getMonth();
        m += 1;  
        var y = myDate.getFullYear();
        var newdate=(y+ "-" + m + "-" + d);
        return newdate;
    },
    ServerSideProcessing :(req)=>{

    var deferred = Q.defer();
    
    var searchStr = req.body.search;
    if(req.body.search)
    {
            var regex = new RegExp(req.body.search, "i")
            searchStr = {"userID":mongoose.Types.ObjectId(req.body.userID), $or: [{'_id':regex },{'packageTypeName': regex},{'packageContent': regex }]};
    }
    else
    {
         searchStr={"userID":mongoose.Types.ObjectId(req.body.userID)};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    packageModel.count({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        packageModel.count(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
                packageModel.find(searchStr, '_id userID packageTypeName packageContent packageImage createdAt updateAt',{'skip': req.body.start, 'limit': req.body.length }, function (err, results) {
                    if (err) {
                        let obj = {"status":0,"data":err}
                        deferred.resolve(obj)
                        
                        return;
                    }else{
                     let obj = {"status":1,"draw": req.body.draw,"recordsFiltered": recordsFiltered,"recordsTotal": recordsTotal,"data":results}
                     deferred.resolve(obj)    
                    }
                    
                });
        
          });
   });
   return deferred.promise;
},
    ssp:(request, table, primaryKey, columns, callback)=>{
    var where = filter(request, columns);
    var orderBy = order(request, columns);
    var limitBy = limit(request);

    var query = "SELECT COUNT(" + primaryKey + ") AS count FROM " + table;

    //bind params
    var params = [];
    for (var i in columns) {
        params.push({key: "search", value: "%" + request.search.value + "%"});
    }

    sql.connect(db, function(err) {
      if (err) {
        console.log("SQL Connection Error");
        console.log("Error: " + err);
      } else {
            var request = new sql.Request();

        request.query(query, function(err, result) {
          if (err) {
                    console.log("ssp.count error: " + err);
          } else {

            var recordSet = result.recordsets[0];
                    query = "SELECT COUNT(" + primaryKey + ") AS count FROM " + table + where;

                    request.query(query, function(err, result) {
                        if (err) {
                            console.log("ssp.recordFiltered error: " + err);
                        }

                        var recordSet2 = result.recordsets[0];

                        var recordsFiltered = parseInt(recordSet2[0].count);
                        if ((recordsFiltered - parseInt(request.start)) < request.length) { //check if last page
                            request.length = recordsFiltered - parseInt(request.start);
                        }

                        // query = "SELECT " + columns.join(', ') + " FROM " + table + where + orderBy + limitBy; //MYSQL
                        if (orderBy.column == "") {
                            orderBy.column = 1;
                        }

                        query = "SELECT * FROM (SELECT TOP " + request.length + " * FROM  (SELECT TOP " + (parseInt(request.start) + parseInt(request.length)) + " " + columns.join(', ') + " FROM " + table + where + " ORDER BY " + orderBy.column + " " + orderBy.columnOrder + ") AS SOD ORDER BY " + orderBy.column + " " + orderBy.invertColumnOrder + ") AS SOD2 ORDER BY " + orderBy.column + " " + orderBy.columnOrder;

                        request.query(query, function(err, result) {
                            if (err) {
                                console.log("ssp error: " + err);
                            } else {
                                var datatableResult = {
                                    "draw": parseInt(request.draw),
                                    "recordsTotal": parseInt(recordSet[0].count),
                                    "recordsFiltered": recordsFiltered,
                                    data: recordSet3
                                };

                                callback(err, datatableResult);
                            }
                        });
                    });
          }
        });
        }
    });
},
filter:(request, columns)=>{
    var where = "";
    if (request.search.value != "" && request.search != null) {
        for (var i in columns) { //loop to columns to build the WHERE LIKE clause
            var column = columns[i];

            if (where == "") {
                where = " WHERE CONVERT(VARCHAR, " + column + ") LIKE @search";
            } else {
                where += " OR CONVERT(VARCHAR, " + column + ") LIKE @search";
            }
        }
 }

    return where;
},
order:(request, columns)=>{
    var columnIndex = request.order[0].column;
    var columnOrder = request.order[0].dir;

    var invertColumnOrder = "ASC";
    if (columnOrder == "ASC") {
        invertColumnOrder == "DESC";
    }

    var orderDetail = {
        column: request.columns[columnIndex].data,
        columnOrder: columnOrder,
        invertColumnOrder: invertColumnOrder
    };

    return orderDetail;
},
limit:(request)=>{
    var limit = "";

    if (request.start != null && request.length != -1) {
        limit = " LIMIT " + parseInt(request.start) + ", " + parseInt(request.length);
    }

    return limit;
},
jsonToArray:(datas)=>{
    var array = [];

    for (var i in datas) {
      var arrayObj = [];
      for (var j in datas[i]) {
        if (datas[i][j] == null) {
          datas[i][j] = "";
        }

        arrayObj.push(datas[i][j].toString());
      }

      array.push(arrayObj);
    }

    return array;
}    
};




