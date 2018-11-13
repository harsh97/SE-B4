const pg = require('pg');
var distance = require('euclidean-distance')
var http = require('http');
var fs = require('fs');
const config = require('../config');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCCtwx1FLuy40tqWrXIBIxhxwCI-f71wXw',
  Promise: Promise
});
var clusterMaker = require('clusters');
var resUser = {};

const approveUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const approveQuery = `SELECT adminApproves('${userUSN.AId}');`;
    return new Promise((resolve, reject) => {
        clientTrip.connect()
        .then(() =>
            clientTrip.query(approveQuery)
                .then(res => {
                        resUser.AId=userUSN.AId;

                })
                .catch(err => {
                    reject(err);
                    console.log(`Fetch error: ${err}`);
                })
                .then(async () => {
                    resolve(resUser.AId);
                    clientTrip.end();
                })
        )
        .catch(err => {
            reject(err);
            console.log(`Connection error: ${err}`);
        });
    });
}
const tripJson = (routeNumber)=>
{
  return new Promise((resolve, reject)=>{
    console.log("route number ="+routeNumber);
    const get_json= `select route_data from trip where route_no=${routeNumber}`;
    const clientTrip = new pg.Client(config);
    clientTrip.connect()
    .then(()=>
    {
      clientTrip.query(get_json)
      .then((res)=>
      {
        var file = fs.createWriteStream("file.jpg");
        var request = http.get(res.rows[0].route_data, function(response) {
          response.pipe(file);
          resolve(file);
        });
      })
    })
  })


}
const updateTrips = (user) => {

  const getTripId = () =>{
    return new Promise((resolve,reject) =>{
      const get_trip_id='select trip_id from  Fut_trip order by  trip_date,timing';
      const clientTrip = new pg.Client(config);
      clientTrip.connect()
      .then(()=>
      {
        clientTrip.query(get_trip_id)
        .then((res)=>
        {
          clientTrip.end();
          console.log("current trip_id= "+res.rows[0].trip_id);
          resolve(res.rows[0].trip_id);
        },function(err)
        {
          clientTrip.end();
          reject(err);
        })
      })
    });
  }
  const getUids = (uid) =>{
    return new Promise((resolve,reject)=>
    {
      const clientTrip = new pg.Client(config);
      const get_uids = 'select uid from stu_trip_data';
      clientTrip.connect()
      .then(()=>
      {
        clientTrip.query(get_uids)
        .then((res)=>
        {
          console.log("uid of student in syu_trip_data= "+res.rows);
          resolve(res.rows);
        })

      })
    });
  }


  const getAvlDriverBus = (user) =>{
    const dbCon = new pg.Client(config);
    const getAvlDrivers = "select driver_id from driver";
    const getAvlBuses = "select bus_no from bus";
    // const getAvlDrivers = "select driver_id from driver where driver_id not in (select driver_id from trip where trip_date=current_date+1 and timing= '8:00')";
    // const getAvlBuses = "select bus_no from bus where bus_no not in (select bus_no from trip where trip_date=current_date+1 and timing= '8:00')";
    return new Promise((resolve,reject)=>{
      dbCon.connect()
      .then(() =>
      {
        dbCon.query(getAvlDrivers)
        .then(res => {
          dbCon.query(getAvlBuses)
            .then(res2 =>{
              dbCon.end();
              // console.log(res2);
              resolve([res,res2]);

            })
            .catch(err => {
                reject(err);
                console.log(`Fetch error: ${err}`);
            })
          })
          .catch(err => {
              reject(err);
              console.log(`Fetch error: ${err}`);
          })
        })
        .catch(err => {
            reject(err);
            console.log(`Fetch error: ${err}`);
        })


    });
  }
  const getLocationForTrip = () =>
  {
    return new Promise((resolve,reject)=>
    {
      const clientTrip = new pg.Client(config);
      const location_chan_loc = "select uid,latitude,longitude from chan_loc where trip_id in (select trip_id from  Fut_trip order by  trip_date,timing limit 1)  and UID in(select uid from stu_trip_data where uid not in(select cancel_trip.uid from cancel_trip inner join stu_trip_data on  cancel_trip.uid = stu_trip_data.uid where cancel_trip.trip_id=1))";
      const location = "select uid,latitude,longitude from stu_trip_data where uid not in (select uid from cancel_trip where trip_id in (select trip_id from  Fut_trip order by  trip_date,timing limit 1))";
      clientTrip.connect()
      .then(()=>{
        clientTrip.query(location_chan_loc)
        .then((res)=>{
          console.log("Students in the chan_loc trip "+res.rows);
          clientTrip.query(location)
          .then((res1)=>
          {
            clientTrip.end();
            resolve([res,res1]);
          })

        })
      })
    });

  }
  const optimize=(clusters)=>
  {
    for(var i=0;i<clusters.length;i++)
    {
      var minDist=-1;
      var minIndex=-1;
      for(var j=i+1;j<clusters.length;j++)
      {
        if(clusters[i].points.length +clusters[j].points.length<21)
        {
          var dist=distance[clusters[i].centroid,clusters[j].centroid];
          if(minDist==-1 || minDist>distance)
          {
            minDist=dist;
            minIndex=j;
          }
        }
      }
      if(minIndex!=-1)
      {
        for(var x=0;x<clusters[i].points.length;x++)
        {
          clusters[minIndex].points.push(clusters[i].points[x]);
        }
        delete clusters[i];
      }

    }
    return clusters;
  }
  const calcRoutes = (cluster,res1,dict,i,res)=>{
    googleMapsClient.directions({
      origin: [12.934528, 77.533794],
      destination: [12.934528, 77.533794],
      waypoints: cluster.points,

      optimize: true,
      mode: 'driving',
      departure_time: new Date(Date.now()+18000000)


    }) .asPromise()
    .then((response) => {
      // console.log(response.json);
      const dbConn = new pg.Client(config);
      dbConn.connect();
      // console.log(response.requestUrl);
        res=res+i;
        console.log("res1= "+res1[0].rows[i].driver_id);
        const storeTrip = `INSERT INTO Trip (route_no,No_of_stu, timing, Bus_no, Driver_id, trip_id,trip_date,route_data) VALUES(${res},${cluster.points.length},'8:00:00', '${res1[1].rows[i].bus_no}', '${res1[0].rows[i].driver_id}',1,'2018-11-12','${response.requestUrl}')`;


        dbConn.query(storeTrip)
        .then(res1=>{
          // console.log(res1.rows[0]['max']);
          for(var i=0;i<cluster.points.length;i++)
          {
            // console.log("key used= "+cluster.points[i][0]+''+cluster.points[i][1]);
            var uid=dict[cluster.points[i][0]+''+cluster.points[i][1]].pop();

            const store_stu_trip = `update stu_trip_data set route_no=${res} where uid = ${uid}`;

            dbConn.query(store_stu_trip)
            .then(res=>
              {
                console.log("Success");
              })
          }


        })

      })
      .catch(err=>{
        console.log("Error "+err);
      })


    .catch((err) => {
      console.log(err);
    });
  }
  var dataset = new Array();
  const clientTrip = new pg.Client(config);
  const getCoordsQuery = 'select uid,latitude,longitude from stu_trip_data';
  return new Promise((resolve,reject) => {
      clientTrip.connect()
        .then(() =>
        getLocationForTrip()
        .then(res => {
                    clientTrip.end();
                    var dict =[];
                    var latlang=[];
                    for(var j=0;j<2;j++)
                    {
                      for(var i=0;i<res[j].rows.length;i++)
                      {

                        latlang.push([res[j].rows[i].latitude,res[j].rows[i].longitude]);
                        if(typeof dict[res[j].rows[i].latitude + '' + res[j].rows[i].longitude]=='undefined')
                        {
                          dict[res[j].rows[i].latitude + '' + res[j].rows[i].longitude]=[res[j].rows[i].uid];
                        }
                        else
                        {
                          dict[res[j].rows[i].latitude + '' + res[j].rows[i].longitude].push(res[j].rows[i].uid);
                        }


                      }
                    }
                    var clust_num=6;
                    clusterMaker.k(clust_num);
                    clusterMaker.iterations(750);
                    clusterMaker.data(latlang);
                    clusters=clusterMaker.clusters();
                    console.log("Unoptimized clusters "+clusters);

                    clusters=optimize(clusters);
                    console.log("optimized Clusters"+clusters);
                    getAvlDriverBus().then(function(res1)
                    {
                      // console.log(res1[1]);
                      const clientTrip = new pg.Client(config);
                      clientTrip.connect();


                      clientTrip.query('delete from trip')
                      .then(()=>{
                        clientTrip.end();
                        for(var i=0;i<clusters.length;i++)
                        {

                          if(typeof(clusters[i])!='undefined')
                            calcRoutes(clusters[i],res1,dict,i,0);

                        }
                      })
                    });
                      const clientTrip1 = new pg.Client(config);
                      clientTrip1.connect()
                      clientTrip1.query('select * from trip')
                      .then(res=>
                      {
                        clientTrip1.end();
                        dataset=res;
                      })

        })
        .catch(err => {
          reject(err);
          console.log(`Fetch error: ${err}`);
        })
        .then(async ()=>{
          resolve(dataset);
          clientTrip.end();
        })
      )
      .catch(err => {
        reject(err);
        console.log(`Connection error: ${err}`);
      });
    });
}
const blockUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const disapproveQuery = `UPDATE Stu_Per_Data SET Status = 'f' WHERE USN = '${userUSN.AId}'`;
    return new Promise((resolve, reject) => {
        clientTrip.connect()
        .then(() =>
            clientTrip.query(disapproveQuery)
                .then(res => {
                            resUser.AId=userUSN.AId;
                })
                .catch(err => {
                    reject(err);
                    console.log(`Fetch error: ${err}`);
                })
                .then(async () => {
                    resolve(resUser.AId);
                    clientTrip.end();
                })
        )
        .catch(err => {
            reject(err);
            console.log(`Connection error: ${err}`);
        });
    });
}

const getUsers =  (user) => {
    var users = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                var usersQuery = `SELECT  usn as usn from Stu_per_data where status='f';`;
                client.query(usersQuery)
                    .then((res)=>{
                        res.rows.forEach(user1 => {
                            users.push(user1);
                        })
                        resolve(users);
                        client.end();
                        })
                        .catch(err => {
                            console.log(`Fetch error: ${err}`);
                            reject(err);
                        });
                })
                .catch(err => {
                   console.log(`Connection error: ${err}`);
                   reject(err);
               });
        });
}

const getTrips =  (user) => {
    var trips = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
               var tripsQuery = `SELECT route_no as routeNumber, no_of_stu as noOfStudents, timing, bus_no as busNumber, driver.driver_name as driverName from trip, driver where driver.driver_id = trip.driver_id;`;
                client.query(tripsQuery)
                    .then((res)=>{
                        res.rows.forEach(trip => {
                            trips.push(trip);
                        })
                        resolve(trips);
                        client.end();
                        })

                    .catch(err => {
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    });
            })
            .catch(err => {
               console.log(`Connection error: ${err}`);
               reject(err);
           });
    });
}

module.exports = { approveUser, blockUser, getUsers, getTrips, updateTrips, tripJson};
