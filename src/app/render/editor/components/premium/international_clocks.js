/*

  editor/premium/components/international_clocks.js

*/

waitForGlobalsLoaded().then(() => {
  appSageComponents['internationalClocks'].html_template = `
    <div class="internationalClocks-container" data-component-name="internationalClocks" data-component-id="{{internationalClocks.id}}" data-timezone="UTC" data-show-seconds="true" data-design="circle">
      <div class="clock-display text-3xl font-bold text-center"></div>

      <div class="circle-design relative hidden mx-auto">
        <div class="-rotate-90 w-48 h-48 border-4 border-black rounded-full">
          <div class="hour-hand absolute w-[32%] h-[3px] bg-black top-1/2 left-1/2 origin-left transform translate-x-[-50%] translate-y-[-50%]"></div>
          <div class="minute-hand absolute w-[42%] h-[2px] bg-black top-1/2 left-1/2 origin-left transform translate-x-[-50%] translate-y-[-50%]"></div>
          <div class="second-hand absolute w-[46%] hidden h-0 border-t border-russett-500 top-1/2 left-1/2 origin-left transform translate-x-[-50%] translate-y-[-50%]"></div>
          <div class="absolute w-2.5 h-2.5 bg-black rounded-full top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"></div>
        </div>
      </div>
    </div>
  `;

  appSageComponents['internationalClocks'].form_template = `
    <form class="internationalClocks-form space-y-2" data-initialized="false" data-component-name="internationalClocks" data-component-id="{{internationalClocks.id}}">
      <div>
        <label class="block font-medium text-mine-shaft-700">Timezone:</label>
        <select
          class="appSage-timezone-select timezone-select block w-full p-2 mt-1 border-mine-shaft-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          name="timezone" placeholder="e.g., UTC, America/New_York">
        </select>
      </div>

      <div>
        <label class="block font-medium text-mine-shaft-700">Display Seconds:</label>
        <input type="checkbox" name="show-seconds" class="show-seconds-checkbox mt-1">
      </div>

      <div>
        <label class="block font-medium text-mine-shaft-700">Design:</label>
        <div class="flex items-center space-x-4">
          <label>
            <input type="radio" name="design" value="digits" checked class="form-radio design-radio text-indigo-600">
            Digits
          </label>
          <label>
            <input type="radio" name="design" value="circle" class="form-radio design-radio text-indigo-600">
            Circle
          </label>
        </div>
      </div>
    </form>
  `;
});

// Function to get all clock containers
function getClockContainers() {
  return document.querySelectorAll('.internationalClocks-container');
}
window.getClockContainers = getClockContainers;

// Function to initialize the clock data from the form inputs, if available
function initializeClockDataFromForm(clockContainer) {
  const clockId = clockContainer.getAttribute('data-component-id');
  const form = document.querySelector(`.internationalClocks-form[data-component-id="${clockId}"]`);

  if (!form) return;

  // Populate the timezone select field with available timezones
  populateTimezoneSelects();

  // Update clock data attributes based on form inputs
  function updateClockDataFromForm() {
    const timezoneInput = form.querySelector('.timezone-select');
    const initialized = form.getAttribute('data-initialized');

    if (timezoneInput) {
      if (initialized === 'false') {
        const timezone = (clockContainer.getAttribute('data-timezone'));
        timezoneInput.value = timezone;
      } else {
        const timezone = timezoneInput.value || 'UTC';
        clockContainer.setAttribute('data-timezone', timezone);
      }
    }

    const showSecondsInput = form.querySelector('.show-seconds-checkbox');
    if (showSecondsInput) {
      if (initialized === 'false') {
        const showSeconds = (clockContainer.getAttribute('data-show-seconds'));
        showSecondsInput.setAttribute('checked', showSeconds ? 'checked' : '');
      } else {
        const showSeconds = showSecondsInput.checked ? 'true' : 'false';
        clockContainer.setAttribute('data-show-seconds', showSeconds);
      }
    }

    if (initialized === 'false') {
      const design = (clockContainer.getAttribute('data-design'));
      const designInputAll = form.querySelectorAll('input[name="design"]');
      designInputAll.forEach(designInput => {
        if (designInput.value !== design) return;
        designInput.setAttribute('checked', 'checked');
      });
    } else {
      const designInput = form.querySelector('input[name="design"]:checked');
      if (designInput) {
        designInput.setAttribute('checked', 'checked');
        clockContainer.setAttribute('data-design', designInput.value);
      }
    }
  }

  // Call the function to set the initial data
  updateClockDataFromForm();

  // Add event listeners to update the clock data dynamically when the form changes
  form.querySelector('.timezone-select').addEventListener('change', updateClockDataFromForm);
  form.querySelector('.show-seconds-checkbox').addEventListener('change', updateClockDataFromForm);

  form.querySelectorAll('input[name="design"]').forEach((designRadio) => {
    designRadio.addEventListener('change', updateClockDataFromForm);
  });
}
window.initializeClockDataFromForm = initializeClockDataFromForm;

function populateTimezoneSelects() {
  const timezones = [
    { "label": "(GMT-12:00) International Date Line West", "value": "Etc/GMT+12" },
    { "label": "(GMT-11:00) Midway Island, Samoa", "value": "Pacific/Midway" },
    { "label": "(GMT-10:00) Hawaii", "value": "Pacific/Honolulu" },
    { "label": "(GMT-09:00) Alaska", "value": "US/Alaska" },
    { "label": "(GMT-08:00) Pacific Time (US & Canada)", "value": "America/Los_Angeles" },
    { "label": "(GMT-08:00) Tijuana, Baja California", "value": "America/Tijuana" },
    { "label": "(GMT-07:00) Arizona", "value": "US/Arizona" },
    { "label": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "value": "America/Chihuahua" },
    { "label": "(GMT-07:00) Mountain Time (US & Canada)", "value": "US/Mountain" },
    { "label": "(GMT-06:00) Central America", "value": "America/Managua" },
    { "label": "(GMT-06:00) Central Time (US & Canada)", "value": "US/Central" },
    { "label": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "value": "America/Mexico_City" },
    { "label": "(GMT-06:00) Saskatchewan", "value": "Canada/Saskatchewan" },
    { "label": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "value": "America/Bogota" },
    { "label": "(GMT-05:00) Eastern Time (US & Canada)", "value": "US/Eastern" },
    { "label": "(GMT-05:00) Indiana (East)", "value": "US/East-Indiana" },
    { "label": "(GMT-04:00) Atlantic Time (Canada)", "value": "Canada/Atlantic" },
    { "label": "(GMT-04:00) Caracas, La Paz", "value": "America/Caracas" },
    { "label": "(GMT-04:00) Manaus", "value": "America/Manaus" },
    { "label": "(GMT-04:00) Santiago", "value": "America/Santiago" },
    { "label": "(GMT-03:30) Newfoundland", "value": "Canada/Newfoundland" },
    { "label": "(GMT-03:00) Brasilia", "value": "America/Sao_Paulo" },
    { "label": "(GMT-03:00) Buenos Aires, Georgetown", "value": "America/Argentina/Buenos_Aires" },
    { "label": "(GMT-03:00) Greenland", "value": "America/Godthab" },
    { "label": "(GMT-03:00) Montevideo", "value": "America/Montevideo" },
    { "label": "(GMT-02:00) Mid-Atlantic", "value": "America/Noronha" },
    { "label": "(GMT-01:00) Cape Verde Is.", "value": "Atlantic/Cape_Verde" },
    { "label": "(GMT-01:00) Azores", "value": "Atlantic/Azores" },
    { "label": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "value": "Africa/Casablanca" },
    { "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "value": "Etc/Greenwich" },
    { "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "value": "Europe/Amsterdam" },
    { "label": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "value": "Europe/Belgrade" },
    { "label": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "value": "Europe/Brussels" },
    { "label": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "value": "Europe/Sarajevo" },
    { "label": "(GMT+01:00) West Central Africa", "value": "Africa/Lagos" },
    { "label": "(GMT+02:00) Amman", "value": "Asia/Amman" },
    { "label": "(GMT+02:00) Athens, Bucharest, Istanbul", "value": "Europe/Athens" },
    { "label": "(GMT+02:00) Beirut", "value": "Asia/Beirut" },
    { "label": "(GMT+02:00) Cairo", "value": "Africa/Cairo" },
    { "label": "(GMT+02:00) Harare, Pretoria", "value": "Africa/Harare" },
    { "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "value": "Europe/Helsinki" },
    { "label": "(GMT+02:00) Jerusalem", "value": "Asia/Jerusalem" },
    { "label": "(GMT+02:00) Minsk", "value": "Europe/Minsk" },
    { "label": "(GMT+02:00) Windhoek", "value": "Africa/Windhoek" },
    { "label": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "value": "Asia/Kuwait" },
    { "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "value": "Europe/Moscow" },
    { "label": "(GMT+03:00) Nairobi", "value": "Africa/Nairobi" },
    { "label": "(GMT+03:00) Tbilisi", "value": "Asia/Tbilisi" },
    { "label": "(GMT+03:30) Tehran", "value": "Asia/Tehran" },
    { "label": "(GMT+04:00) Abu Dhabi, Muscat", "value": "Asia/Muscat" },
    { "label": "(GMT+04:00) Baku", "value": "Asia/Baku" },
    { "label": "(GMT+04:00) Yerevan", "value": "Asia/Yerevan" },
    { "label": "(GMT+04:30) Kabul", "value": "Asia/Kabul" },
    { "label": "(GMT+05:00) Yekaterinburg", "value": "Asia/Yekaterinburg" },
    { "label": "(GMT+05:00) Islamabad, Karachi, Tashkent", "value": "Asia/Karachi" },
    { "label": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "value": "Asia/Calcutta" },
    { "label": "(GMT+05:30) Sri Jayawardenapura", "value": "Asia/Calcutta" },
    { "label": "(GMT+05:45) Kathmandu", "value": "Asia/Katmandu" },
    { "label": "(GMT+06:00) Almaty, Novosibirsk", "value": "Asia/Almaty" },
    { "label": "(GMT+06:00) Astana, Dhaka", "value": "Asia/Dhaka" },
    { "label": "(GMT+06:30) Yangon (Rangoon)", "value": "Asia/Rangoon" },
    { "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "value": "Asia/Bangkok" },
    { "label": "(GMT+07:00) Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
    { "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "value": "Asia/Hong_Kong" },
    { "label": "(GMT+08:00) Kuala Lumpur, Singapore", "value": "Asia/Kuala_Lumpur" },
    { "label": "(GMT+08:00) Irkutsk, Ulaan Bataar", "value": "Asia/Irkutsk" },
    { "label": "(GMT+08:00) Perth", "value": "Australia/Perth" },
    { "label": "(GMT+08:00) Taipei", "value": "Asia/Taipei" },
    { "label": "(GMT+09:00) Osaka, Sapporo, Tokyo", "value": "Asia/Tokyo" },
    { "label": "(GMT+09:00) Seoul", "value": "Asia/Seoul" },
    { "label": "(GMT+09:00) Yakutsk", "value": "Asia/Yakutsk" },
    { "label": "(GMT+09:30) Adelaide", "value": "Australia/Adelaide" },
    { "label": "(GMT+09:30) Darwin", "value": "Australia/Darwin" },
    { "label": "(GMT+10:00) Brisbane", "value": "Australia/Brisbane" },
    { "label": "(GMT+10:00) Canberra, Melbourne, Sydney", "value": "Australia/Canberra" },
    { "label": "(GMT+10:00) Hobart", "value": "Australia/Hobart" },
    { "label": "(GMT+10:00) Guam, Port Moresby", "value": "Pacific/Guam" },
    { "label": "(GMT+10:00) Vladivostok", "value": "Asia/Vladivostok" },
    { "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "value": "Asia/Magadan" },
    { "label": "(GMT+12:00) Auckland, Wellington", "value": "Pacific/Auckland" },
    { "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "value": "Pacific/Fiji" },
    { "label": "(GMT+13:00) Nuku'alofa", "value": "Pacific/Tongatapu" }
  ]

  // Select all elements with the class 'timezone-select'
  const timezoneSelectElements = document.querySelectorAll('.timezone-select');

  // Iterate over each timezone-select element and populate the options
  timezoneSelectElements.forEach(selectElement => {
    // Clear the select before populating (optional)
    selectElement.innerHTML = '';

    // Create an option for each timezone
    timezones.forEach(timezone => {
      const option = document.createElement('option');
      option.text = timezone.label;
      option.value = timezone.value;
      selectElement.appendChild(option);
    });
  });
}
window.populateTimezoneSelects = populateTimezoneSelects;

// Function to update the clock based purely on data- attributes
function updateClock(clockContainer) {
  const timezone = clockContainer.getAttribute('data-timezone') || 'UTC';
  const showSeconds = clockContainer.getAttribute('data-show-seconds') === 'true';
  const design = clockContainer.getAttribute('data-design') || 'circle';

  const now = new Date().toLocaleString('en-US', { timeZone: timezone });
  const currentTime = new Date(now);

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  let timeString = `${hours}:${minutes}`;
  if (showSeconds) {
    timeString += `:${seconds}`;
  }

  if (design === 'digits') {
    clockContainer.querySelector('.clock-display').innerHTML = timeString;
    clockContainer.querySelector('.circle-design').classList.add('hidden');
    clockContainer.querySelector('.clock-display').classList.remove('hidden');
  } else {
    updateCircleDesign(clockContainer, hours, minutes, showSeconds ? seconds : null);
    clockContainer.querySelector('.circle-design').classList.remove('hidden');
    clockContainer.querySelector('.clock-display').classList.add('hidden');
  }
}
window.updateClock = updateClock;

// Function to update the clock hands for circle design
function updateCircleDesign(clockContainer, hours, minutes, seconds) {
  const hourHand = clockContainer.querySelector('.hour-hand');
  const minuteHand = clockContainer.querySelector('.minute-hand');
  const secondHand = clockContainer.querySelector('.second-hand');

  const hoursRotation = (hours % 12) * 30;
  const minutesRotation = minutes * 6;
  const secondsRotation = seconds * 6;

  hourHand.style.transform = `rotate(${hoursRotation}deg)`;
  minuteHand.style.transform = `rotate(${minutesRotation}deg)`;

  if (seconds !== null) {
    secondHand.style.transform = `rotate(${secondsRotation}deg)`;
    secondHand.classList.add('block');
    secondHand.classList.remove('hidden');
  } else {
    secondHand.classList.add('hidden');
    secondHand.classList.remove('block');
  }
}
window.updateCircleDesign = updateCircleDesign;

// Function to start the clock for a given clock container
function startClock(clockContainer) {
  setInterval(() => updateClock(clockContainer), 1000);
}
window.startClock = startClock;

function initializeInternationalClocks(componentContainer) {
  startClock(componentContainer);
}
window.initializeInternationalClocks = initializeInternationalClocks;
