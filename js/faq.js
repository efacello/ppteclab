document.addEventListener("DOMContentLoaded", function () {
  var accItems = document.querySelectorAll(".accordion li");

  accItems.forEach(function (item) {
    var label = item.querySelector("label");
    var content = item.querySelector(".content");

    label.addEventListener("click", function () {
      var isOpen = content.style.maxHeight;

      if (isOpen) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      accItems.forEach(function (otherItem) {
        var otherContent = otherItem.querySelector(".content");
        if (otherContent !== content) {
          otherContent.style.maxHeight = null;
        }
      });
    });
  });
});
