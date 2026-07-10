// Lightweight calendar-link helpers — deliberately dependency-free rather
// than pulling in a timezone library for two links. Dates are treated as
// already being in the venue's local time; guests get an event at
// approximately the right time regardless of their own timezone, which is
// good enough for an RSVP-flow "add to calendar" convenience link.

function toCompactUTC(iso: string) {
  return iso.replace(/[-:]/g, "").replace(/\.\d+/, "") + "Z";
}

export function googleCalendarUrl({
  title,
  start,
  end,
  details,
  location,
}: {
  title: string;
  start: string;
  end: string;
  details: string;
  location: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toCompactUTC(start)}/${toCompactUTC(end)}`,
    details,
    location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl({
  title,
  start,
  end,
  details,
  location,
}: {
  title: string;
  start: string;
  end: string;
  details: string;
  location: string;
}) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DTSTART:${toCompactUTC(start)}`,
    `DTEND:${toCompactUTC(end)}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
