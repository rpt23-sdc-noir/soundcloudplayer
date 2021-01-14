import http from 'k6/http';
import { check, sleep } from 'k6';

// Set Number of VUs - GET (READ) Request

// export let options = {
//   vus: 550,
//   duration: '60s',
// };
// export default function () {
//   let res = http.get('http://localhost:3005/10000000');
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }

// Ramp Test - GET (READ) Request

export let options = {
  rps: 1000,
  VUs: 1000,
  duration: '4m'
  // stages: [
  //   { duration: '120s', target: 1000 }
  // ]n
};
export default function () {
  let max = 10000000;
  let min = 9999900;
  // let randomId = 9999998;
  let randomId = Math.random() * (max - min) + min;
  let res = http.get(`http://localhost:3005/${randomId}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

/*

-1 rps for 10 seconds
-ramp from 1 to 10 for 15 seconds
-stay at 10 for 60 seconds
-ramp from 10 to 100 for 30 seconds
-stay at 100 for 60 seconds
-ramp from 100 to 550 for 45 seconds
-stay at 550 for 60 seconds
-ramp from 550 to 1000 for 60 seconds
-stay at 1000 for 120 seconds

*/

// ----------------------- POST (CREATE) Request

// export default function () {
//   var url = 'http://localhost:3005/10000001';
//   var payload = JSON.stringify({
//     song_id: 10000001,
//     song_name: '',
//     song_length:,
//     song_url: ,
//     song_image TEXT NOT NULL
//   });
//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   http.post(url, payload, params);
// }

// ------------------ PUT (UPDATE) Request


// export let options = {
//   stages: [
//     { duration: '60s', target: 1000 }
//   ],
//   startVUs: 550
// };

// export default function () {
//   const max = 10000000;
//   const min = 9000000;
//   let randomId = Math.random() * (max - min) + min;
//   const url = `http://localhost:3005/${randomId}`;
//   const headers = { 'Content-Type': 'application/json' };
//   const data = { "song_name": 'New Song Name' };

//   let res = http.put(url, data, { headers: headers });

//   // console.log(JSON.parse(res.body).json.name);

// }

// --------------------- DELETE Request

// export default function () {
//   const url = 'http://localhost:3005/10000001';
//   const headers = { 'Content-Type': 'application/json' };
//   const data = { name: 'Bert' };

//   let res = http.del(url, JSON.stringify(data), { headers: headers });

//   console.log(JSON.parse(res.body).json.name);
// }
