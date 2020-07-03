let reg3 = document.getElementById("reg3");

reg3.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub3").innerHTML = "Loading";
  document.getElementById("sub3").setAttribute("disabled", "true");

  let name = event.target[0].value;
  let city = event.target[1].value;
  let phone = event.target[2].value;

  console.log(name, city, phone);

  firebase
    .database()
    .ref("Argon/week1")
    .push()
    .set(
      {
        name: name,
        city: city,
        phone: phone,
        service: "third",
        date: Date.now(),
      },
      (error) => {
        if (error) {
          alert(error.message);
        } else {
          firebase
            .database()
            .ref("Argon/week1")
            .on("value", (snapshot) => {
              let array = [];
              snapshot.forEach((child) => {
                array.push(child.toJSON());
              });
              $("#seat").innerHTML = array.length;
              window.open("../screens/thank.html", "_self");
            });
        }
      }
    );
});
