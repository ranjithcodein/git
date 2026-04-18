const busLayout = document.getElementById("busLayout");
const selectedSeatsDisplay = document.getElementById("selectedSeats");

let selectedSeats = [];
let bookedSeats = [5, 10, 15]; // Example booked seats from DB

// Create 40 seats
for (let i = 1; i <= 40; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i;

  if (bookedSeats.includes(i)) {
    seat.classList.add("booked");
  }

  seat.addEventListener("click", () => {
    if (seat.classList.contains("booked")) return;

    seat.classList.toggle("selected");

    if (selectedSeats.includes(i)) {
      selectedSeats = selectedSeats.filter(s => s !== i);
    } else {
      selectedSeats.push(i);
    }

    selectedSeatsDisplay.innerText = selectedSeats.join(", ");
  });

  busLayout.appendChild(seat);
}