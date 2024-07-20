";
const urlPath = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();

const generate = document.getElementById("generate");
const mainContainer = document.querySelector(".main-container");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");

const getData = async (zip) => {
  const url = `${urlPath}${zip}&APPID=${key}&units=imperial`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    const temp = data.main.temp;

    const savedData = {
      temp: temp,
      date: newDate,
      content: feelingsInput.value,
    };

    postData(savedData);
  } catch (error) {
    console.log(error);
  }
};

generate.addEventListener("click", () => {
  const zipValue = zipInput.value;
  const feelingValue = feelingsInput.value;

  if (zipValue === "" || feelingValue === "") {
    alert("Empty Feild detected");
  } else {
    getData(zipValue);
  }
});

postData = async (info) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const newData = await res.json();

    setUi();
  } catch (error) {
    console.log(error);
  }
};
const setUi = async () => {
  const res = await fetch("http://127.0.0.1:3000/all");
  const data = await res.json();

  mainContainer.insertAdjacentHTML("beforeend",`
  
  <div class="entry-holder " id="entryHolder">
        
  <h4 id="date-text">Date: ${data.date}</h4>

  <h3 id="temp-text">Tempreture: ${data.temp}</h3>
 
  <h4>Feelings:</h4>
  <h5 id="feelings">${data.content}</h5>

</div>
  
  `)

}

{
  /* <div class="entry-holder " id="entryHolder">
        
        <h4 id="date-text">18 Tue</h4>
      
        <h3 id="temp-text"></h3>
        <h5 id="weather-description"></h5>
        <h5 id="city"></h5>
        <h4>Feelings:</h4>
        <h5 id="feelings"></h5>
     
    </div> */
}
