/* =====================================================
   THE CUT — BARBER QUEUE
   Main JavaScript
   ===================================================== */


/* =====================================================
   ROLE SCREEN
   ===================================================== */
   /* SUPABASE CONNECTION */

const SUPABASE_URL = "https://kbzekggcwnazyjxahnnd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_d3eOvLPGjmLYRKz7ti3aJg_X_P72Y3k";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const roleScreen = document.getElementById("roleScreen");
const clientApp = document.getElementById("clientApp");
const barberApp = document.getElementById("barberApp");

const clientButton = document.getElementById("clientButton");
const barberButton = document.getElementById("barberButton");

const clientBackButton = document.getElementById("clientBackButton");
const barberBackButton = document.getElementById("barberBackButton");


/* =====================================================
   NAVIGATION
   ===================================================== */

clientButton.addEventListener("click", function () {

  roleScreen.classList.add("hidden");
  barberApp.classList.add("hidden");
  clientApp.classList.remove("hidden");

  updateClientQueue();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


barberButton.addEventListener("click", function () {

  roleScreen.classList.add("hidden");
  clientApp.classList.add("hidden");
  barberApp.classList.remove("hidden");

  updateBarberQueue();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


clientBackButton.addEventListener("click", function () {

  clientApp.classList.add("hidden");
  barberApp.classList.add("hidden");
  roleScreen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


barberBackButton.addEventListener("click", function () {

  clientApp.classList.add("hidden");
  barberApp.classList.add("hidden");
  roleScreen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =====================================================
   QUEUE DATA
   ===================================================== */

let queue = [];

let completedCustomers = 0;


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

const QUEUE_STORAGE_KEY = "theCutQueue";

const COMPLETED_STORAGE_KEY = "theCutCompleted";


/* =====================================================
   SERVICE DURATIONS
   ===================================================== */

const serviceDurations = {

  "Haircut": 30,

  "Hair + Beard": 45,

  "Beard": 20,

  "Line Up": 15

};


/* =====================================================
   LOAD SAVED DATA
   ===================================================== */

function loadSavedData() {

  const savedQueue =
    localStorage.getItem(
      QUEUE_STORAGE_KEY
    );


  const savedCompleted =
    localStorage.getItem(
      COMPLETED_STORAGE_KEY
    );


  /* LOAD QUEUE */

  if (savedQueue) {

    try {

      const parsedQueue =
        JSON.parse(savedQueue);


      if (Array.isArray(parsedQueue)) {

        queue = parsedQueue;

      } else {

        queue = [];

      }

    } catch (error) {

      console.log(
        "Saved queue could not be loaded."
      );

      queue = [];
    }
  }


  /* LOAD COMPLETED COUNT */

  if (savedCompleted !== null) {

    const parsedCompleted =
      parseInt(
        savedCompleted,
        10
      );


    if (
      !isNaN(parsedCompleted) &&
      parsedCompleted >= 0
    ) {

      completedCustomers =
        parsedCompleted;

    } else {

      completedCustomers = 0;
    }
  }


  /* CLEAN INVALID CUSTOMERS */

  queue = queue.filter(function (
    customer
  ) {

    return (
      customer &&
      customer.id &&
      customer.name &&
      customer.service
    );

  });


  /* CLEAN CUSTOMER STATUS */

  queue.forEach(function (
    customer
  ) {

    if (
      customer.status !== "serving"
    ) {

      customer.status =
        "waiting";
    }

  });


  /*
    Only one customer can be
    in the barber chair.
  */

  let servingFound = false;


  queue.forEach(function (
    customer
  ) {

    if (
      customer.status ===
      "serving"
    ) {

      if (!servingFound) {

        servingFound = true;

      } else {

        customer.status =
          "waiting";
      }

    }

  });


  saveData();
}


/* =====================================================
   SAVE DATA
   ===================================================== */

function saveData() {

  localStorage.setItem(
    QUEUE_STORAGE_KEY,
    JSON.stringify(queue)
  );


  localStorage.setItem(
    COMPLETED_STORAGE_KEY,
    completedCustomers
  );
}


/* =====================================================
   LOAD SAVED DATA IMMEDIATELY
   ===================================================== */

loadSavedData();


/* =====================================================
   CLIENT ELEMENTS
   ===================================================== */

const joinQueueButton =
  document.getElementById(
    "joinQueueButton"
  );

const joinQueuePanel =
  document.getElementById(
    "joinQueuePanel"
  );

const viewQueueButton =
  document.getElementById(
    "viewQueueButton"
  );

const queuePanel =
  document.getElementById(
    "queuePanel"
  );

const customerName =
  document.getElementById(
    "customerName"
  );

const confirmQueueButton =
  document.getElementById(
    "confirmQueueButton"
  );

const customerTicket =
  document.getElementById(
    "customerTicket"
  );

const ticketPosition =
  document.getElementById(
    "ticketPosition"
  );

const ticketName =
  document.getElementById(
    "ticketName"
  );

const ticketService =
  document.getElementById(
    "ticketService"
  );

const ticketWait =
  document.getElementById(
    "ticketWait"
  );

const queueList =
  document.getElementById(
    "queueList"
  );

const waitingCount =
  document.getElementById(
    "waitingCount"
  );


/* =====================================================
   BARBER ELEMENTS
   ===================================================== */

const barberWaitingCount =
  document.getElementById(
    "barberWaitingCount"
  );

const completedCount =
  document.getElementById(
    "completedCount"
  );

const barberQueueList =
  document.getElementById(
    "barberQueueList"
  );

const walkInName =
  document.getElementById(
    "walkInName"
  );

const walkInService =
  document.getElementById(
    "walkInService"
  );

const addWalkInButton =
  document.getElementById(
    "addWalkInButton"
  );


/* =====================================================
   CLIENT — JOIN QUEUE PANEL
   ===================================================== */

joinQueueButton.addEventListener(
  "click",
  function () {

    joinQueuePanel.classList.remove(
      "hidden"
    );

    joinQueueButton.classList.add(
      "hidden"
    );


    joinQueuePanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


/* =====================================================
   CLIENT — VIEW CURRENT QUEUE
   ===================================================== */

viewQueueButton.addEventListener(
  "click",
  function () {

    queuePanel.classList.remove(
      "hidden"
    );

    updateClientQueue();


    queuePanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


/* =====================================================
   CLIENT — CONFIRM QUEUE
   ===================================================== */

confirmQueueButton.addEventListener(
  "click",
  function () {

    const name =
      customerName.value.trim();


    const selectedService =
      document.querySelector(
        'input[name="service"]:checked'
      );


    if (name === "") {

      alert(
        "Please enter your name."
      );

      customerName.focus();

      return;
    }


    if (!selectedService) {

      alert(
        "Please select a service."
      );

      return;
    }


    const service =
      selectedService.value;


    const customer = {

      id: Date.now(),

      name: name,

      service: service,

      status: "waiting"

    };


    queue.push(customer);


    saveData();


    updateCustomerTicket(
      customer
    );


    customerTicket.classList.remove(
      "hidden"
    );


    customerName.value = "";


    document
      .querySelectorAll(
        'input[name="service"]'
      )
      .forEach(function (radio) {

        radio.checked = false;

      });


    joinQueuePanel.classList.add(
      "hidden"
    );

    joinQueueButton.classList.remove(
      "hidden"
    );


    updateClientQueue();

    updateBarberQueue();


    queuePanel.classList.remove(
      "hidden"
    );


    customerTicket.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


/* =====================================================
   CALCULATE WAIT TIME
   ===================================================== */

function calculateWaitTime(
  customer
) {

  const currentIndex =
    queue.findIndex(function (
      item
    ) {

      return item.id ===
        customer.id;

    });


  if (currentIndex === -1) {

    return 0;
  }


  let waitTime = 0;


  /*
    Add the service time of every
    customer ahead of this customer.
  */

  for (
    let i = 0;
    i < currentIndex;
    i++
  ) {

    const customerAhead =
      queue[i];


    waitTime +=
      serviceDurations[
        customerAhead.service
      ] || 30;

  }


  return waitTime;
}


/* =====================================================
   FORMAT WAIT TIME
   ===================================================== */

function formatWaitTime(
  waitTime
) {

  if (waitTime === 0) {

    return "Your turn next";
  }


  if (waitTime < 60) {

    return "About " +
      waitTime +
      " min";
  }


  const hours =
    Math.floor(
      waitTime / 60
    );


  const minutes =
    waitTime % 60;


  if (minutes === 0) {

    return "About " +
      hours +
      " hr";

  }


  return "About " +
    hours +
    " hr " +
    minutes +
    " min";
}


/* =====================================================
   CLIENT — UPDATE CUSTOMER TICKET
   ===================================================== */

function updateCustomerTicket(
  customer
) {

  const currentIndex =
    queue.findIndex(function (
      item
    ) {

      return item.id ===
        customer.id;

    });


  if (currentIndex === -1) {

    return;
  }


  const position =
    currentIndex + 1;


  const waitTime =
    calculateWaitTime(
      customer
    );


  ticketPosition.textContent =
    "#" + position;


  ticketName.textContent =
    customer.name;


  ticketService.textContent =
    customer.service;


  ticketWait.textContent =
    formatWaitTime(
      waitTime
    );
}


/* =====================================================
   CLIENT — UPDATE CURRENT TICKET
   ===================================================== */

function updateAllCustomerWaitTimes() {

  if (
    customerTicket.classList.contains(
      "hidden"
    )
  ) {

    return;
  }


  const currentTicketName =
    ticketName.textContent.trim();


  if (currentTicketName === "") {

    return;
  }


  const customer =
    queue.find(function (
      item
    ) {

      return item.name ===
        currentTicketName;

    });


  if (!customer) {

    return;
  }


  updateCustomerTicket(
    customer
  );
}


/* =====================================================
   CLIENT — QUEUE DISPLAY
   ===================================================== */

function updateClientQueue() {

  waitingCount.textContent =
    queue.length;


  queueList.innerHTML = "";


  if (queue.length === 0) {

    queueList.innerHTML = `
      <div class="empty-queue">
        <i class="fa-solid fa-chair"></i>
        <p>The queue is currently empty.</p>
      </div>
    `;


    updateAllCustomerWaitTimes();

    return;
  }


  queue.forEach(function (
    customer,
    index
  ) {

    const queueItem =
      document.createElement(
        "div"
      );


    queueItem.className =
      "queue-item";


    const waitTime =
      calculateWaitTime(
        customer
      );


    queueItem.innerHTML = `
      <div class="queue-number">
        ${index + 1}
      </div>

      <div class="queue-customer">

        <strong>
          ${customer.name}
        </strong>

        <span>
          ${customer.service}
        </span>

        <small class="queue-wait">
          ${formatWaitTime(waitTime)}
        </small>

      </div>
    `;


    queueList.appendChild(
      queueItem
    );

  });


  updateAllCustomerWaitTimes();
}


/* =====================================================
   BARBER — QUEUE DISPLAY
   ===================================================== */

function updateBarberQueue() {

  barberWaitingCount.textContent =
    queue.length;


  completedCount.textContent =
    completedCustomers;


  barberQueueList.innerHTML = "";


  if (queue.length === 0) {

    barberQueueList.innerHTML = `
      <div class="empty-queue">
        <i class="fa-solid fa-users"></i>
        <p>No customers are waiting.</p>
      </div>
    `;

    return;
  }


  queue.forEach(function (
    customer,
    index
  ) {

    const barberItem =
      document.createElement(
        "div"
      );


    barberItem.className =
      "queue-item";


    const waitTime =
      calculateWaitTime(
        customer
      );


    /* ---------------------------------------------
       CUSTOMER IS CURRENTLY BEING SERVED
       --------------------------------------------- */

    if (
      customer.status ===
      "serving"
    ) {

      barberItem.innerHTML = `
        <div class="queue-number">
          ${index + 1}
        </div>

        <div class="queue-customer">

          <strong>
            ${customer.name}
          </strong>

          <span>
            ${customer.service}
          </span>

          <div class="serving-status">
            <i class="fa-solid fa-scissors"></i>
            IN CHAIR
          </div>

        </div>

        <div class="queue-actions">

          <button
            class="complete-button"
            onclick="completeHaircut(${customer.id})"
          >
            COMPLETE
          </button>

          <button
            class="remove-button"
            onclick="removeCustomer(${customer.id})"
          >
            REMOVE
          </button>

        </div>
      `;

    }


    /* ---------------------------------------------
       CUSTOMER IS WAITING
       --------------------------------------------- */

    else {

      barberItem.innerHTML = `
        <div class="queue-number">
          ${index + 1}
        </div>

        <div class="queue-customer">

          <strong>
            ${customer.name}
          </strong>

          <span>
            ${customer.service}
          </span>

          <small class="queue-wait">
            ${formatWaitTime(waitTime)}
          </small>

        </div>

        <div class="queue-actions">

          <button
            class="start-button"
            onclick="startHaircut(${customer.id})"
          >
            START
          </button>

          <button
            class="remove-button"
            onclick="removeCustomer(${customer.id})"
          >
            REMOVE
          </button>

        </div>
      `;
    }


    barberQueueList.appendChild(
      barberItem
    );

  });
}


/* =====================================================
   BARBER — START HAIRCUT
   ===================================================== */

function startHaircut(
  customerId
) {

  const alreadyServing =
    queue.find(function (
      customer
    ) {

      return customer.status ===
        "serving";

    });


  if (alreadyServing) {

    alert(
      alreadyServing.name +
      " is already being served."
    );

    return;
  }


  const customer =
    queue.find(function (
      customer
    ) {

      return customer.id ===
        customerId;

    });


  if (!customer) {

    return;
  }


  customer.status =
    "serving";


  saveData();


  updateClientQueue();

  updateBarberQueue();
}


/* =====================================================
   BARBER — COMPLETE HAIRCUT
   ===================================================== */

function completeHaircut(
  customerId
) {

  const customerIndex =
    queue.findIndex(function (
      customer
    ) {

      return customer.id ===
        customerId;

    });


  if (customerIndex === -1) {

    return;
  }


  const customer =
    queue[customerIndex];


  completedCustomers++;


  queue.splice(
    customerIndex,
    1
  );


  saveData();


  updateClientQueue();

  updateBarberQueue();


  alert(
    customer.name +
    "'s haircut has been completed."
  );
}


/* =====================================================
   BARBER — REMOVE CUSTOMER
   ===================================================== */

function removeCustomer(
  customerId
) {

  const customerIndex =
    queue.findIndex(function (
      customer
    ) {

      return customer.id ===
        customerId;

    });


  if (customerIndex === -1) {

    return;
  }


  const customer =
    queue[customerIndex];


  const confirmRemove =
    confirm(
      "Remove " +
      customer.name +
      " from the queue?"
    );


  if (!confirmRemove) {

    return;
  }


  queue.splice(
    customerIndex,
    1
  );


  saveData();


  updateClientQueue();

  updateBarberQueue();


  alert(
    customer.name +
    " has been removed from the queue."
  );
}


/* =====================================================
   BARBER — ADD WALK-IN
   ===================================================== */

addWalkInButton.addEventListener(
  "click",
  function () {

    const name =
      walkInName.value.trim();


    const service =
      walkInService.value;


    if (name === "") {

      alert(
        "Please enter the customer's name."
      );

      walkInName.focus();

      return;
    }


    if (!service) {

      alert(
        "Please select a service."
      );

      return;
    }


    const customer = {

      id: Date.now(),

      name: name,

      service: service,

      status: "waiting"

    };


    queue.push(customer);


    saveData();


    walkInName.value = "";

    walkInService.value =
      "Haircut";


    updateClientQueue();

    updateBarberQueue();


    alert(
      customer.name +
      " has been added to the queue."
    );

  }
);
/* =====================================================
   SHOP OPEN / CLOSED STATUS
   ===================================================== */

function updateShopStatus() {

  const shopStatus =
    document.getElementById("shopStatus");

  const shopStatusText =
    document.getElementById("shopStatusText");

  if (!shopStatus || !shopStatusText) {
    return;
  }

  // Always use THE CUT's local timezone
  const eswatiniTime = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "Africa/Mbabane",
      hour: "2-digit",
      hour12: false
    }
  ).formatToParts(new Date());

  const hour = Number(
    eswatiniTime.find(
      part => part.type === "hour"
    ).value
  );

  // THE CUT opening hours
  const openingHour = 9;
  const closingHour = 20;

  if (hour >= openingHour && hour < closingHour) {

    shopStatus.textContent = "OPEN";

    shopStatus.classList.remove("status-closed");
    shopStatus.classList.add("status-open");

    shopStatusText.textContent =
      "accepting customers";

  } else {

    shopStatus.textContent = "CLOSED";

    shopStatus.classList.remove("status-open");
    shopStatus.classList.add("status-closed");

    shopStatusText.textContent =
      "opens at 9:00 AM";
  }
}


/* Update when the app loads */
updateShopStatus();


/* Check again every minute */
setInterval(
  updateShopStatus,
  60000
);
/* TEST SUPABASE CONNECTION */

async function testSupabaseConnection() {
  try {
    const { data, error } = await supabaseClient
      .from("queue")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error.message);
      return;
    }

    console.log("Supabase connected successfully!", data);
  } catch (err) {
    console.error("Connection test failed:", err);
  }
}

testSupabaseConnection();