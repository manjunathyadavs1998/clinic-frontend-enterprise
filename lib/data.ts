export const stats = [
  { label: "Consultations Today", value: "128" },
  { label: "Doctors Available", value: "12" },
  { label: "Lab Tests Pending", value: "18" },
  { label: "Total Revenue", value: "₹84,600" }
];

export const services = [
  {
    title: "Reception Management",
    description: "Fast patient entry, consultation creation, doctor selection, and billing in one place."
  },
  {
    title: "Doctor Workflow",
    description: "View assigned patients, update consultation status, and add screening notes."
  },
  {
    title: "Lab Coordination",
    description: "Track suggested tests, update statuses, and maintain clear billing visibility."
  },
  {
    title: "Admin Control",
    description: "Manage doctors, roles, and access rights with a secure operational dashboard."
  }
];

export const doctors = [
  { id: 1, name: "Dr Manjunath", specialty: "General Medicine", room: "101", status: "Available", fee: "₹300" },
  { id: 2, name: "Dr Rashmi", specialty: "Gynecologist", room: "105", status: "Available", fee: "₹300" },
  
];

export const consultations = [
  { id: "C-1001", patient: "Anita Sharma", phone: "9876543210", doctor: "Dr Manjunath", symptoms: "Fever and body pain", status: "Scheduled", time: "10:30 AM" },
  { id: "C-1002", patient: "Kiran Das", phone: "9123456780", doctor: "Dr Rashmi", symptoms: "Periodontitis", status: "In Progress", time: "11:00 AM" },
 ];

export const billingItems = [
  { id: "B-2001", patient: "Anita Sharma", consultation: "₹300", tests: "₹500", total: "₹800", status: "Pending" },
  { id: "B-2002", patient: "Kiran Das", consultation: "₹400", tests: "₹0", total: "₹400", status: "Paid" },
  { id: "B-2003", patient: "Rahul Jain", consultation: "₹500", tests: "₹800", total: "₹1300", status: "Pending" }
];

export const testimonials = [
  {
    name: "Hospital Reception Team",
    text: "The interface is simple, fast, and reduces manual coordination between reception, doctors, and billing."
  },
  {
    name: "Small Clinic Admin",
    text: "This design works well for clinics that do not need heavy patient registration but still want proper records."
  }
];
