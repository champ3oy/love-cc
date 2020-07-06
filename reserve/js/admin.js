window.addEventListener("load", () => {
  firebase
    .database()
    .ref("Argon/week2")
    .once("value", (snapshot) => {
      let array = [];
      snapshot.forEach((child) => {
        array.push(child.toJSON());
      });
      array.map((item, index) => {
        $("#tab").append(
          "<tr> <td style='text-align: center'>" +
            item.name +
            "</td> <td style='text-align: center'>" +
            item.service +
            "</td> <td style='text-align: center'>" +
            item.phone +
            "</td> <td style='text-align: center'>" +
            item.city +
            `</td> <td style="text-align: center">${new Date(
              item.date
            )}</td> </tr>`
        );
      });
    });
});

document.getElementById("print").addEventListener("click", () => {
  var url =
    "data:application/vnd.ms-excel," + encodeURIComponent($("#tablewrap").html());
  location.href = url;
  return false;
});

