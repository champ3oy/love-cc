window.addEventListener("load", () => {
  firebase
    .database()
    .ref("Argon/week3")
    .once("value", (snapshot) => {
      let arrayF = [];
      let arrayS = [];
      let arrayT = [];
      snapshot.forEach((child) => {
        if (child.toJSON().service === "first") {
          arrayF.push(child.toJSON());
        } else if (child.toJSON().service === "second") {
          arrayS.push(child.toJSON());
        } else if (child.toJSON().service === "third") {
          arrayT.push(child.toJSON());
        }
      });

      let arr = ["First", "Second", "Third"];
      let arrTime = ["7:00 - 8:00 AM", "9:00 - 10:00 AM", "11:00 - 12:00 PM"];
      let numbers = [arrayF.length, arrayS.length, arrayT.length];

      document.getElementById('loading').style.display = 'none';

      arr.map((item, index) => {
        $(".main").append(
          ' <div class="cards-container"> <div class="card"> <div class="card-preview"> <h6>Love community church</h6> <h2 style="display: none">Service Name</h2> <a href="#">' +
            arrTime[index] +
            '<i class="fas fa-chevron-right"></i></a> </div> <div class="card-info"> <div class="progress-container"> <div class="progress"><div class="progressgreen" style="background-color: #2a265f; width: ' +
            (numbers[index] / 100) * 100 +
            "%" +
            '; height: 5px; border-radius: 10px"></div></div> <span class="progress-text"> ' +
            numbers[index] +
            '/100 attendees </span> </div> <h6>service</h6> <h2 class="see">' +
            item +
            " Service</h2> " +
            `${
              numbers[index] == 100
                ? '<button style="background-color: #fb4e4e; border: 0; border-radius: 10px; box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2); color: #fff; font-size: 16px; padding: 12px 25px; position: initial; bottom: 30px; right: 30px; letter-spacing: 1px; cursor: not-allowed;">Full</button> '
                : '<a href="booking/register' +
                  (Number(index) + Number(1)) +
                  '.html"><button class="btn">Register</button><a/>'
            }` +
            "</div> </div> </div>"
        );
      });
    });
});
