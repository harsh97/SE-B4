select driver_id from driver where driver_id not in (select driver_id from trip where trip_date=current_date+1 and timing= '8:00');
select bus_no from bus where bus_no not in (select bus_no from trip where trip_date=current_date+1 and timing= '8:00');
select trip.route_no as routeNumber , trip.no_of_stu as noOfStudents, trip.timing, trip.bus_no as busNumber, driver.driver_name as driverName
from trip
inner join driver on trip.driver_id=driver.driver_id;



select trip_id from  Fut_trip order by  trip_date,timing limit 1;

select uid from stu_trip_data;

select uid from stu_trip_data where uid not in(select cancel_trip.uid from cancel_trip
inner join stu_trip_data on  cancel_trip.uid = stu_trip_data.uid
where cancel_trip.trip_id=1);


SELECT Fut_trip.trip_id
FROM Fut_trip
WHERE Fut_trip.trip_id NOT IN (
SELECT Cancel_trip.trip_id FROM Cancel_trip
INNER JOIN USN_UID ON Cancel_trip.UID = USN_UID.UID) and Fut_trip.trip_id IN (1) ;

select uid,latitude,longitude from chan_loc where trip_id in (select trip_id from  Fut_trip order by  trip_date,timing limit 1)  and UID in(select uid from stu_trip_data where uid not in(select cancel_trip.uid from cancel_trip inner join stu_trip_data on  cancel_trip.uid = stu_trip_data.uid where cancel_trip.trip_id=1));

select uid,latitude,longitude from stu_trip_data where uid not in (select uid from cancel_trip where trip_id=1);

INSERT INTO Trip (route_no,No_of_stu, timing, Bus_no, Driver_id, trip_id,trip_date,route_data) VALUES(${res},${cluster.points.length},'8:00:00', '${res1[1].rows[i].bus_no}', '${res1[0].rows[i].driver_id}',1,'2018-11-12','${response.requestUrl}')
update stu_trip_data set route_no={$res}
