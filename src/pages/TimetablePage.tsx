
import DashboardLayout from "@/components/layout/DashboardLayout";
import Timetable from "@/components/timetable/Timetable";
import { useParams } from "react-router-dom";

const TimetablePage = () => {
  const { userType } = useParams<{ userType: string }>();
  
  // Check if userType is valid
  const validUserType = (userType === "student" || userType === "teacher" || userType === "admin") 
    ? userType 
    : "student";
  
  // Sample data - would normally come from API
  const studentSchedule = [
    {
      day: "Monday",
      slots: [
        { time: "08:00-09:00", subject: "Mathematics", teacher: "Prof. Johnson", location: "A101" },
        { time: "09:15-10:15", subject: "Science", teacher: "Dr. Smith", location: "B202" },
        { time: "10:30-11:30", subject: "History", teacher: "Mrs. Davis", location: "C303" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "English", teacher: "Mr. Wilson", location: "D404" },
        { time: "14:15-15:15", subject: "Physical Education", teacher: "Coach Brown", location: "Gym" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "08:00-09:00", subject: "Biology", teacher: "Dr. Smith", location: "B202" },
        { time: "09:15-10:15", subject: "Mathematics", teacher: "Prof. Johnson", location: "A101" },
        { time: "10:30-11:30", subject: "Art", teacher: "Ms. Anderson", location: "Art Studio" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Computer Science", teacher: "Mr. Thompson", location: "Computer Lab" },
        { time: "14:15-15:15", subject: "Geography", teacher: "Mrs. Davis", location: "C303" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "08:00-09:00", subject: "English", teacher: "Mr. Wilson", location: "D404" },
        { time: "09:15-10:15", subject: "Chemistry", teacher: "Dr. Roberts", location: "Science Lab" },
        { time: "10:30-11:30", subject: "Mathematics", teacher: "Prof. Johnson", location: "A101" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Physics", teacher: "Dr. Smith", location: "B202" },
        { time: "14:15-15:15", subject: "Music", teacher: "Mr. Garcia", location: "Music Room" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "08:00-09:00", subject: "History", teacher: "Mrs. Davis", location: "C303" },
        { time: "09:15-10:15", subject: "Physical Education", teacher: "Coach Brown", location: "Gym" },
        { time: "10:30-11:30", subject: "Economics", teacher: "Mr. Clark", location: "E505" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Study Hall", location: "Library" },
        { time: "14:15-15:15", subject: "Mathematics", teacher: "Prof. Johnson", location: "A101" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "08:00-09:00", subject: "Literature", teacher: "Mr. Wilson", location: "D404" },
        { time: "09:15-10:15", subject: "Mathematics", teacher: "Prof. Johnson", location: "A101" },
        { time: "10:30-11:30", subject: "Science", teacher: "Dr. Smith", location: "B202" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Foreign Language", teacher: "Ms. Martinez", location: "F606" },
        { time: "14:15-15:15", subject: "Club Activities", location: "Various" },
      ],
    },
  ];
  
  const teacherSchedule = [
    {
      day: "Monday",
      slots: [
        { time: "08:00-09:00", subject: "Mathematics", class: "Grade 10-A", location: "A101" },
        { time: "09:15-10:15", subject: "Mathematics", class: "Grade 11-B", location: "A101" },
        { time: "10:30-11:30", subject: "Office Hours", location: "Faculty Room" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Mathematics", class: "Grade 9-A", location: "A101" },
        { time: "14:15-15:15", subject: "Department Meeting", location: "Conference Room" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "08:00-09:00", subject: "Prep Time", location: "Faculty Room" },
        { time: "09:15-10:15", subject: "Mathematics", class: "Grade 10-A", location: "A101" },
        { time: "10:30-11:30", subject: "Mathematics", class: "Grade 9-B", location: "A101" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Office Hours", location: "Faculty Room" },
        { time: "14:15-15:15", subject: "Mathematics", class: "Grade 11-A", location: "A101" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "08:00-09:00", subject: "Mathematics", class: "Grade 9-A", location: "A101" },
        { time: "09:15-10:15", subject: "Advanced Math", class: "Grade 12-A", location: "A101" },
        { time: "10:30-11:30", subject: "Mathematics", class: "Grade 10-B", location: "A101" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Mathematics", class: "Grade 11-B", location: "A101" },
        { time: "14:15-15:15", subject: "Faculty Development", location: "Conference Room" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "08:00-09:00", subject: "Prep Time", location: "Faculty Room" },
        { time: "09:15-10:15", subject: "Mathematics", class: "Grade 9-B", location: "A101" },
        { time: "10:30-11:30", subject: "Mathematics", class: "Grade 10-A", location: "A101" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Advanced Math", class: "Grade 12-B", location: "A101" },
        { time: "14:15-15:15", subject: "Office Hours", location: "Faculty Room" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "08:00-09:00", subject: "Mathematics", class: "Grade 11-A", location: "A101" },
        { time: "09:15-10:15", subject: "Mathematics", class: "Grade 10-B", location: "A101" },
        { time: "10:30-11:30", subject: "Mathematics", class: "Grade 9-A", location: "A101" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Math Club", class: "All Grades", location: "A101" },
        { time: "14:15-15:15", subject: "Prep Time", location: "Faculty Room" },
      ],
    },
  ];
  
  const adminSchedule = [
    {
      day: "Monday",
      slots: [
        { time: "08:00-09:00", subject: "Administrative Meeting", location: "Conference Room" },
        { time: "09:15-10:15", subject: "Classroom Observations", location: "Various" },
        { time: "10:30-11:30", subject: "Budget Planning", location: "Admin Office" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Parent Meetings", location: "Meeting Room" },
        { time: "14:15-15:15", subject: "Staff Review", location: "Admin Office" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "08:00-09:00", subject: "Department Heads Meeting", location: "Conference Room" },
        { time: "09:15-10:15", subject: "Facility Inspection", location: "Campus" },
        { time: "10:30-11:30", subject: "Academic Planning", location: "Admin Office" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Student Affairs Meeting", location: "Meeting Room" },
        { time: "14:15-15:15", subject: "Administrative Tasks", location: "Admin Office" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "08:00-09:00", subject: "Strategic Planning", location: "Admin Office" },
        { time: "09:15-10:15", subject: "Teacher Evaluations", location: "Various" },
        { time: "10:30-11:30", subject: "Curriculum Review", location: "Conference Room" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Inventory Management", location: "Storage" },
        { time: "14:15-15:15", subject: "Board Update Preparation", location: "Admin Office" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "08:00-09:00", subject: "Weekly Staff Meeting", location: "Conference Room" },
        { time: "09:15-10:15", subject: "HR Tasks", location: "Admin Office" },
        { time: "10:30-11:30", subject: "Financial Review", location: "Finance Office" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Student Discipline", location: "Meeting Room" },
        { time: "14:15-15:15", subject: "Policy Development", location: "Admin Office" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "08:00-09:00", subject: "Administrative Planning", location: "Admin Office" },
        { time: "09:15-10:15", subject: "Classroom Visits", location: "Various" },
        { time: "10:30-11:30", subject: "Community Outreach", location: "Conference Room" },
        { time: "11:45-12:45", subject: "Lunch", location: "Cafeteria" },
        { time: "13:00-14:00", subject: "Emergency Preparedness", location: "Campus" },
        { time: "14:15-15:15", subject: "Weekly Wrap-up", location: "Admin Office" },
      ],
    },
  ];
  
  const getSchedule = () => {
    switch (validUserType) {
      case "student":
        return studentSchedule;
      case "teacher":
        return teacherSchedule;
      case "admin":
        return adminSchedule;
      default:
        return studentSchedule;
    }
  };
  
  const getTitle = () => {
    switch (validUserType) {
      case "student":
        return "My Class Schedule";
      case "teacher":
        return "Teaching Schedule";
      case "admin":
        return "Administrative Schedule";
      default:
        return "Timetable";
    }
  };
  
  const getDescription = () => {
    switch (validUserType) {
      case "student":
        return "Your weekly class schedule";
      case "teacher":
        return "Your weekly teaching assignments";
      case "admin":
        return "Administrative calendar and school-wide schedules";
      default:
        return "Weekly schedule";
    }
  };
  
  return (
    <DashboardLayout 
      userType={validUserType as "student" | "teacher" | "admin"} 
      pageTitle="Timetable"
    >
      <div className="animate-fadeIn">
        <Timetable
          schedules={getSchedule()}
          viewType={validUserType as "student" | "teacher" | "admin"}
          title={getTitle()}
          description={getDescription()}
          showFilters={validUserType === "admin"}
        />
      </div>
    </DashboardLayout>
  );
};

export default TimetablePage;
