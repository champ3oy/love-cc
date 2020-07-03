let reg1 = document.getElementById("reg1");

reg1.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub1").innerHTML = "Loading";
  document.getElementById("sub1").setAttribute("disabled", "true");

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
        service: "first",
        date: Date.now(),
      },
      (error) => {
        if (error) {
          alert(error.message);
        } else {
          firebase
            .database()
            .ref("Argon/week1")
            .once("value", (snapshot) => {
              let array = [];
              snapshot.forEach((child) => {
                if (child.toJSON().service === "first") {
                  array.push(child.toJSON());
                }});
              // document.getElementById("seat").innerHTML = array.length;
              var storageId = "parms" + String(Date.now());
              sessionStorage.setItem(
                storageId,
                JSON.stringify({ data: array.length })
              );
              window.open(
                "../screens/thank.html" + "?sid=" + storageId,
                "_self"
              );
            });
        }
      }
    );
});
