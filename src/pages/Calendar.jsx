import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { Modal, Button, Form } from 'react-bootstrap';

const Calendar = ({ darkMode, setDarkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    category: 'general',
    startTime: '09:00',
    endTime: '10:00'
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const categories = {
    general: { color: '#6c757d', label: 'General' },
    meeting: { color: '#007bff', label: 'Meeting' },
    task: { color: '#28a745', label: 'Task' },
    reminder: { color: '#ffc107', label: 'Reminder' }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setEventForm({
      title: '',
      description: '',
      category: 'general',
      startTime: '09:00',
      endTime: '10:00'
    });
    setShowEventModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      category: event.category,
      startTime: event.startTime,
      endTime: event.endTime
    });
    setShowEventModal(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: selectedEvent?.id || Date.now(),
      ...eventForm,
      date: selectedDate
    };

    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? newEvent : event
      ));
    } else {
      setEvents([...events, newEvent]);
    }

    setShowEventModal(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setShowEventModal(false);
  };

  const getEventsForDay = (day) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  return (
    <div className="calendar-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-success" onClick={() => alert('Google Calendar sync coming soon!')}>
          📅 Sync with Google Calendar
        </button>
      </div>
      <div className="calendar-header d-flex justify-content-between align-items-center mb-4">
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={previousMonth}>
            Previous
          </button>
          <button className="btn btn-outline-primary" onClick={nextMonth}>
            Next
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`calendar-day ${
                !isSameMonth(day, currentDate) ? 'other-month' : ''
              } ${isToday(day) ? 'today' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="calendar-day-number">{format(day, 'd')}</div>
              <div className="calendar-events">
                {getEventsForDay(day).map(event => (
                  <div
                    key={event.id}
                    className="calendar-event"
                    style={{ backgroundColor: categories[event.category].color }}
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? 'Edit Event' : 'Create Event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEventSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={eventForm.category}
                onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
              >
                {Object.entries(categories).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={eventForm.startTime}
                onChange={(e) => setEventForm({...eventForm, startTime: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={eventForm.endTime}
                onChange={(e) => setEventForm({...eventForm, endTime: e.target.value})}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                {selectedEvent ? 'Update Event' : 'Create Event'}
              </Button>
              {selectedEvent && (
                <Button variant="danger" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar; 