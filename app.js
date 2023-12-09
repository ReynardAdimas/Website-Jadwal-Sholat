
function prayerTimes(longitude, latitude,year,month){
    fetch('https://api.aladhan.com/v1/calendar/'+year+'/'+month+'?latitude='+latitude+'&longitude='+longitude+'&method=2') 
    .then(response => response.json())
    .then(function(response){ 
        // mengambil hari dari perangkat user
        let date = new Date(); 
        let today = date.getDate()-1; 
        let dataTimes = response.data[today].timings; 
        let app = document.getElementById('app'); 
        let table = document.createElement('table'); 
        let tableTbody = document.createElement('tbody'); 

        for(i in dataTimes){
            let row = tableTbody.insertRow(); 
            let name = row.insertCell(0); 
            let time = row.insertCell(1); 
            name.innerHTML = i; 
            time.innerHTML = dataTimes[i]; 
            tableTbody.appendChild(row); 
        } 
        table.appendChild(tableTbody);
        app.appendChild(table); 
        
    }); 
}

function success(position){ 
    // mengambil tahun dari perangkat user
    let year = new Date(); 
    let todayYear = year.getFullYear(); 
    // mengambil bulan dari perangkat user 
    let month = new Date(); 
    let todayMonth = month.getMonth()+1;
    
    prayerTimes(position.coords.longitude,position.coords.latitude, todayYear, todayMonth);
    
}

function error(){
    // mengambil tahun dari perangkat user
    let year = new Date(); 
    let todayYear = year.getFullYear(); 
    // mengambil bulan dari perangkat user 
    let month = new Date(); 
    let todayMonth = month.getMonth()+1;
    
    const defaultlongitude = '106.816666';
    const defaultlatitude = '-6.200000';
    prayerTimes(defaultlongitude,defaultlatitude, todayYear, todayMonth);
}

function userLocation(){
    if(!navigator.geolocation){ // jika geolokasi tidak ada
        alert("Browser anda tidak terdapat geolocation, harap menggunakan browser lain");
    }else{
        navigator.geolocation.getCurrentPosition(success, error); // untuk mendapatkan lokasi dari user
    }
} 

userLocation();