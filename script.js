document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('timeBlocksContainer');
    const currentDay = document.getElementById('currentDay');
    const now = new Date();
    currentDay.textContent = `Today is ${now.toLocaleDateString()}`;

    for (let hour = 0; hour < 24; hour++) {
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time-block');
        
        const hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');
        hourDiv.textContent = formatHour(hour);
        
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.contentEditable = true; // Makes the event block editable
        eventDiv.dataset.hour = hour; // Store the hour for saving later
        
        const saveBtn = document.createElement('button');
        saveBtn.classList.add('saveBtn');
        saveBtn.textContent = 'Save';
        saveBtn.onclick = function() {
            saveEvent(hour, eventDiv.textContent);
        };

        // Add classes based on past, present, future
        if (hour < now.getHours()) {
            timeBlock.classList.add('past');
        } else if (hour === now.getHours()) {
            timeBlock.classList.add('present');
        } else {
            timeBlock.classList.add('future');
        }

        // Append all child elements to the time block
        timeBlock.appendChild(hourDiv);
        timeBlock.appendChild(eventDiv);
        timeBlock.appendChild(saveBtn);

        // Append the time block to the container
        container.appendChild(timeBlock);
    }
});

function formatHour(hour) {
    if (hour === 0) {
        return '12AM';
    } else if (hour < 12) {
        return `${hour}AM`;
    } else if (hour === 12) {
        return '12PM';
    } else {
        return `${hour - 12}PM`;
    }
}

function saveEvent(hour, eventText) {
    localStorage.setItem(`event-${hour}`, eventText);
    alert(`Event for ${formatHour(hour)} saved.`);
}

// Load events from localStorage
window.onload = function() {
    const events = document.querySelectorAll('.event');
    events.forEach(eventDiv => {
        const hour = eventDiv.dataset.hour;
        const savedEvent = localStorage.getItem(`event-${hour}`);
        if (savedEvent) {
            eventDiv.textContent = savedEvent;
        }
    });
};
