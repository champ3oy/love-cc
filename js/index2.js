let reg2 = document.getElementById("reg2");

reg2.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub2").innerHTML = "Loading";
  document.getElementById("sub2").setAttribute("disabled", "true");

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
        service: "second",
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
                if (child.toJSON().service === "second") {
                  array.push(child.toJSON());
                }});
              var storageId = "parms" + String(Date.now());
              sessionStorage.setItem(
                storageId,
                JSON.stringify({ data: array.length })
              );
              if (array.length < 100) {
                window.open(
                  "../booking/thank.html" + "?sid=" + storageId,
                  "_self"
                );
              } else {
                alert("First Serive is currently full");
              }
            });
        }
      }
    );
});
