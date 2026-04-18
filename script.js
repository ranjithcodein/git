const API_BASE = "http://localhost:5000/api";


// ============================
// LOAD BUSES
// ============================
async function loadBuses() {
  try {
    const res = await fetch(`${API_BASE}/buses`);
    const data = await res.json();

    const busesDiv = document.getElementById("buses");
    busesDiv.innerHTML = "";

    data.forEach(bus => {
      busesDiv.innerHTML += `
        <div class="bus-card">
          <h3>${bus.bus_name}</h3>
          <p><strong>Route:</strong> ${bus.source} ➝ ${bus.destination}</p>
          <p><strong>Fare:</strong> ₹${bus.fare}</p>
          <p><strong>Available Seats:</strong> ${bus.total_seats}</p>
        </div>
      `;
    });

  } catch (error) {
    alert("Error loading buses");
  }
}


// ============================
// BOOK TICKET
// ============================
async function bookTicket() {
  const bus_id = document.getElementById("bus_id").value;
  const passenger_name = document.getElementById("passenger_name").value;
  const seats_booked = document.getElementById("seats_booked").value;

  if (!bus_id || !passenger_name || !seats_booked) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bus_id,
        passenger_name,
        seats_booked
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking Successful 🎉");
      loadBookings();
      loadBuses();
    } else {
      alert(data.message || "Booking failed");
    }

  } catch (error) {
    alert("Server error");
  }
}


// ============================
// LOAD BOOKINGS
// ============================
async function loadBookings() {
  try {
    const res = await fetch(`${API_BASE}/bookings`);
    const data = await res.json();

    const bookingsDiv = document.getElementById("bookings");
    bookingsDiv.innerHTML = "";

    data.forEach(book => {
      bookingsDiv.innerHTML += `
        <div class="booking-card">
          <h3>${book.passenger_name}</h3>
          <p><strong>Bus:</strong> ${book.bus_name}</p>
          <p><strong>Seats:</strong> ${book.seats_booked}</p>
          <p><strong>Total:</strong> ₹${book.total_amount}</p>
        </div>
      `;
    });

  } catch (error) {
    alert("Error loading bookings");
  }
}