async function get_IP_on_submit() {
  IP = document.getElementById('user_input').value;
  const response = await fetch(`https://ipapi.co/` + IP + `/json/`)
  const data = await response.json();

  document.getElementById('ipAddress').innerHTML = data.ip
  document.getElementById('location').innerHTML = data.region + "/" + data.country;
  document.getElementById('timeZone').innerHTML = data.timezone
  document.getElementById('isp').innerHTML = data.org
  console.log(map)
  if (map != undefined) {
    map.off()
    map.remove()
  }
  var map = new L.map('map', {
    center: [data.latitude, data.longitude],
    zoom: 13
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

}

/*
const user_ip = async () => {
  const response = await fetch("https://api.db-ip.com/v2/free/self")
  const data = await response.json()
  return data.ipAddress
}
*/

async function get_user_ip() {
  const response = await fetch('https://api.db-ip.com/v2/free/self')
  const data = await response.json()
  const user_ip = data.ipAddress
  document.getElementById("user_input").value = user_ip
}

Promise.resolve(get_user_ip())
get_IP_on_submit()
