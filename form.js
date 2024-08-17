window.onload = function () {
  var tenMinutes = 60 * 10,
    display = document.querySelector("#timer");
  startTimer(tenMinutes, display);
  show(question_count);
  let naam = sessionStorage.getItem("name");
  document.getElementById("welcome-header").innerHTML = "Welcome! " + naam;
};
//Questions
let questions = [
  {
    id: 1,
    question: "Who is the Prime Minister of India?",
    answer: "Narendra Modi",
    options: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Amitabh Bachan"],
  },
  {
    id: 2,
    question: "What is the capital of India?",
    answer: "New Delhi",
    options: ["New Delhi", "Surat", "Mumbai", "Bangalore"],
  },
  {
    id: 3,
    question: "Who among the following wrote Sanskrit grammar?",
    answer: "Panini",
    options: ["Panini", "Charak", "Kalidasa", "Aryabhatt"],
  },
  {
    id: 4,
    question: "The metal whose salts are sensitive to light is?",
    answer: "Silver",
    options: ["Copper", "Aluminium", "Silver", "Zinc"],
  },
  {
    id: 5,
    question: "The hottest planet in the entire solar system?",
    answer: "Venus",
    options: ["Jupiter", "Mars", "Mercury", "Venus"],
  },
  {
    id: 6,
    question: "Where was the electricity supply first introduced in India?",
    answer: "Darjeeling",
    options: ["Mumbai", "Darjeeling", "Dehradun", "Chennai"],
  },
  {
    id: 7,
    question: "Which one of the following ports is the oldest port in India?",
    answer: "Chennai Port",
    options: [
      "Vishakhapatnam Port",
      "Kolkata Port",
      "Chennai Port",
      "Mumbai Port",
    ],
  },
  {
    id: 8,
    question: "Which of the following is not one of a nuclear power center?",
    answer: "Chamera",
    options: ["Narora", "Kota", "Chamera", "Kakrapara"],
  },
  {
    id: 9,
    question: "Friction can be reduced by changing from",
    answer: "sliding to rolling",
    options: [
      "rolling to sliding",
      "dynamic to static",
      "sliding to rolling",
      "P.E TO K.E",
    ],
  },
  {
    id: 10,
    question: "Entomology is branch of science that studies",
    answer: "Insects",
    options: [
      "origin of technical and scientific terms",
      "Behavior of human beings",
      "Insects",
      "The formation of rocks",
    ],
  },
];
function submitform(e) {
  //prevent form submission
  e.preventDefault();
  //---name validation----------------------->

  console.log("Form Submitted");
  let username = document.forms["welcome_form"]["name"].value;
  console.log(username);
  if (username.length == 0) {
    alert("FILL OUT ALL THE FIELDS");
    return false;
  }
  let dob = document.forms["welcome_form"]["dob"].value;
  console.log(dob);
  if (dob.length == 0) {
    alert("FILL OUT ALL THE FIELDS");
    return false;
  }
  let cityy = document.forms["welcome_form"]["city"].value;
  console.log(cityy);
  if (cityy.length == 0) {
    alert("FILL OUT ALL THE FIELDS");
    return false;
  }
  let emaill = document.forms["welcome_form"]["email"].value;
  console.log(emaill);
  if (emaill.length == 0) {
    alert("FILL OUT ALL THE FIELDS");
    return false;
  }
  // Name Validation-------------------------->

  if (username.length < 5) {
    alert("CHARACTERS IN NAME SHOULD BE MORE THAN 5 ");
    return false;
  }
  // save name in session storage
  sessionStorage.setItem("name", username);
  //----DOB validation------------------------------->
  let birthday = document.forms["welcome_form"]["dob"].value;
  var optimizedBirthday = birthday.replace(/-/g, "/");
  var myBirthday = new Date(optimizedBirthday);
  var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
  var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

  if (myAge < 18) {
    alert("AGE BELOW 18 ");
    return false;
  }

  // city and mail validation-------------------------------------------->
  let city = document.forms["welcome_form"]["city"].value;
  if (city.length == 0) {
    alert("Please Enter a city Name");
    return false;
  }
  let email = document.forms["welcome_form"]["email"].value;
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email) == false) {
    alert("EMAIL INVALID");
    return false;
  }

  location.href = "ques_template.html";
}

let question_count = 0;
sessionStorage.setItem("count", question_count);
let score = 0;

let arr = [];

function next() {
  console.log(question_count);
  console.log(questions.length - 1);
  let input_answer = document.querySelectorAll("li.option.active");

  if (question_count == questions.length - 2) {
    location.href = "end.html";
    clearInterval(mytimer);
    return;
  }

  question_count += 2;
  // sessionStorage.setItem('page',question_count);
  show(question_count);
}
function prev() {
  question_count -= 2;
  console.log(question_count);
  show(question_count);
  // sessionStorage.setItem('page',question_count);
}
// this function renders the questions on html format
function show(count) {
  // count the page and store it
  sessionStorage.setItem("page", question_count);

  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;
  question.innerHTML = `<h2 >Q${count + 1}. ${questions[count].question}</h2>
    <ul class="options_group" type="none">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul> <div class="prev">
    <button class="btn-dir" onclick="prev()" >PREV</button>
    </div>`;
  let ques = document.getElementById("ques");
  let [fi, s, t, f] = questions[count + 1].options;
  ques.innerHTML = `<h2 >Q${count + 2}. ${questions[count + 1].question}</h2>
     <ul class="options_group" type="none">
    <li class="option">${fi}</li>
    <li class="option">${s}</li>
    <li class="option">${t}</li>
    <li class="option">${f}</li>
  </ul> <div class="next">
  <button class="btn-dir" onclick="next()" >NEXT</button>
</div>`;
  if (count == 0) {
    document.getElementsByClassName("prev")[0].style.display = "none";
  }
  if (count == 8) {
    document.getElementsByClassName(
      "next"
    )[0].innerHTML = `<button class="btn-dir" onclick="next()" >SUBMIT</button>`;
  }
  console.log(count);
  toggleactive();
}

function toggleactive() {
  let option = document.querySelectorAll("li.option");
  // check if they are already null or not
  // if they are not null get the ans wers and tag them first
  if (sessionStorage.getItem(`answer${question_count}`) != null) {
    let chosen = sessionStorage.getItem(`answer${question_count}`);
    option[chosen].classList.add("active");
  }
  if (sessionStorage.getItem(`answer${question_count + 1}`) != null) {
    let chosen = sessionStorage.getItem(`answer${question_count + 1}`);
    option[chosen].classList.add("active");
  }
  for (let i = 0; i < 4; i++) {
    let c = 0;
    option[i].onclick = function () {
      c++;
      console.log(c);
      if (c % 2 == 0) {
        option[i].classList.remove("active");
        console.log("unselect");
      } else {
        for (let i = 0; i < 4; i++) {
          if (option[i].classList.contains("active")) {
            option[i].classList.remove("active");
            console.log("select");
          }
        }

        option[i].classList.add("active");
        sessionStorage.setItem(`answer${question_count}`, i);
      }
    };
  }

  for (let i = 4; i < 8; i++) {
    let c = 0;
    option[i].onclick = function () {
      c++;
      console.log(c);
      if (c % 2 == 0) {
        option[i].classList.remove("active");
        console.log("unselect");
      } else {
        for (let j = 4; j < 8; j++) {
          if (option[j].classList.contains("active")) {
            option[j].classList.remove("active");
          }
        }
        option[i].classList.add("active");
        sessionStorage.setItem(`answer${question_count + 1}`, i);
      }
    };
  }
}

// TIMER LOGIC-------------------------------->>>>
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var mytimer = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
    if (minutes == 0 && seconds == 0) {
      location.href = "end.html";
      clearInterval(mytimer);
    }
  }, 1000);

  if (minutes == 0 && seconds == 0) {
    location.href = "end.html";
  }
}
// ----------------------------------------->
let naaame = sessionStorage.getItem("name");

let endscore = 0;
for (let i = 0; i < 10; i++) {
  let choice = sessionStorage.getItem(`answer${i}`);
  if (choice >= 4) {
    choice -= 4;
  }
  if (questions[i].options[choice] == questions[i].answer) {
    endscore += 10;
    console.log("true");
  }

  console.log(sessionStorage.getItem(`answer${i}`));
}

if (endscore >= 30) {
  result = "PASS";
} else {
  result = "FAIL";
}
document.getElementById("score").innerHTML = endscore;
document.getElementById("name").innerHTML = naaame;
document.getElementById("result").innerHTML = result;
