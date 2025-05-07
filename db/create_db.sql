-- Create databases table: courses
CREATE TABLE IF NOT EXISTS courses (
  courseid INTEGER PRIMARY KEY AUTOINCREMENT,
  coursecode TEXT NOT NULL,
  coursename TEXT NOT NULL,
  syllabus TEXT NOT NULL,
  progression TEXT NOT NULL
);

-- Insert all courses
INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES
('DT057G', 'Webbutveckling I', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/', 'A'),
('DT084G', 'Introduktion till programmering i JavaScript', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/', 'A'),
('DT200G', 'Grafisk teknik för webb', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/', 'B'),
('DT068G', 'Webbanvändbarhet', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/', 'B'),
('DT003G', 'Databaser', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/', 'A'),
('DT211G', 'Frontend-baserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/', 'B'),
('DT207G', 'Backend-baserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/', 'B'),
('DT208G', 'Programmering i TypeScript', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/', 'B'),
('IK060G', 'Projektledning', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/IK060G/', 'B'),
('DT071G', 'Programmering i C#.net', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT071G/', 'A'),
('DT193G', 'Fullstacks-utveckling med ramverk', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT193G/', 'B'),
('DT209G', 'Webbutveckling för WordPress', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT209G/', 'B'),
('DT191G', 'Webbutveckling med .NET', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT191G/', 'B'),
('DT210G', 'Fördjupad frontend-utveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT210G/', 'B'),
('DT140G', 'Självständigt arbete', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT140G/', 'C');
