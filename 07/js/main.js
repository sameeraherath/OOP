/**
 * Main Application - Student Management Console App
 * Demonstrates OOP usage in a practical application
 */

// Global student manager instance
let studentManager;

// Initialize the application
function initializeApp() {
    studentManager = new StudentManager();
    
    // Add sample data
    initializeSampleData();
    
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   STUDENT MANAGEMENT SYSTEM         ║');
    console.log('║   Learning OOP with JavaScript      ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    displayMenu();
}

// Initialize sample data for testing
function initializeSampleData() {
    // Add sample students
    studentManager.addStudent('John Doe', 'john.doe@email.com', 20, 'STU2024-1001');
    studentManager.addStudent('Jane Smith', 'jane.smith@email.com', 21, 'STU2024-1002');
    studentManager.addStudent('Bob Johnson', 'bob.johnson@email.com', 19, 'STU2024-1003');
    studentManager.addStudent('Alice Williams', 'alice.williams@email.com', 22);
    
    // Add sample courses
    studentManager.addCourse('CS101', 'Introduction to Programming', 'Dr. Smith', 3, 30);
    studentManager.addCourse('MATH201', 'Calculus I', 'Prof. Johnson', 4, 25);
    studentManager.addCourse('ENG101', 'English Composition', 'Dr. Brown', 3, 40);
    studentManager.addCourse('PHY101', 'Physics Fundamentals', 'Prof. Davis', 4, 30);
    
    // Enroll students in courses
    studentManager.enrollStudentInCourse('STU2024-1001', 'CS101');
    studentManager.enrollStudentInCourse('STU2024-1001', 'MATH201');
    studentManager.enrollStudentInCourse('STU2024-1002', 'CS101');
    studentManager.enrollStudentInCourse('STU2024-1002', 'ENG101');
    studentManager.enrollStudentInCourse('STU2024-1003', 'MATH201');
    studentManager.enrollStudentInCourse('STU2024-1003', 'PHY101');
    
    // Add sample grades
    studentManager.addGrade('STU2024-1001', 'CS101', 3.5, 3, 'Fall 2024');
    studentManager.addGrade('STU2024-1001', 'MATH201', 4.0, 4, 'Fall 2024');
    studentManager.addGrade('STU2024-1002', 'CS101', 3.7, 3, 'Fall 2024');
    studentManager.addGrade('STU2024-1002', 'ENG101', 3.3, 3, 'Fall 2024');
    studentManager.addGrade('STU2024-1003', 'MATH201', 2.8, 4, 'Fall 2024');
    studentManager.addGrade('STU2024-1003', 'PHY101', 3.2, 4, 'Fall 2024');
    
    console.log('Sample data initialized successfully!\n');
}

// Display main menu
function displayMenu() {
    console.log('\n═══════════════════════════════════════════');
    console.log('           MAIN MENU');
    console.log('═══════════════════════════════════════════');
    console.log('STUDENT MANAGEMENT:');
    console.log('  1. Add New Student');
    console.log('  2. View All Students');
    console.log('  3. Search Students');
    console.log('  4. View Student Details');
    console.log('  5. Update Student Status');
    console.log('  6. Remove Student');
    console.log('\nCOURSE MANAGEMENT:');
    console.log('  7. Add New Course');
    console.log('  8. View All Courses');
    console.log('  9. Search Courses');
    console.log('  10. View Course Details');
    console.log('  11. Remove Course');
    console.log('\nENROLLMENT MANAGEMENT:');
    console.log('  12. Enroll Student in Course');
    console.log('  13. Unenroll Student from Course');
    console.log('  14. View Student Enrollments');
    console.log('\nGRADE MANAGEMENT:');
    console.log('  15. Add Grade');
    console.log('  16. View Student Grades');
    console.log('  17. View Course Grades');
    console.log('  18. Calculate Student GPA');
    console.log('\nREPORTS & STATISTICS:');
    console.log('  19. View System Statistics');
    console.log('  20. Top Performing Students');
    console.log('  21. Students by GPA Range');
    console.log('\n  0. Exit');
    console.log('═══════════════════════════════════════════\n');
}

// Handle user choice
async function handleChoice(choice) {
    switch(choice) {
        case '1':
            await addNewStudent();
            break;
        case '2':
            viewAllStudents();
            break;
        case '3':
            await searchStudents();
            break;
        case '4':
            await viewStudentDetails();
            break;
        case '5':
            await updateStudentStatus();
            break;
        case '6':
            await removeStudent();
            break;
        case '7':
            await addNewCourse();
            break;
        case '8':
            viewAllCourses();
            break;
        case '9':
            await searchCourses();
            break;
        case '10':
            await viewCourseDetails();
            break;
        case '11':
            await removeCourse();
            break;
        case '12':
            await enrollStudentInCourse();
            break;
        case '13':
            await unenrollStudentFromCourse();
            break;
        case '14':
            await viewStudentEnrollments();
            break;
        case '15':
            await addGrade();
            break;
        case '16':
            await viewStudentGrades();
            break;
        case '17':
            await viewCourseGrades();
            break;
        case '18':
            await calculateStudentGPA();
            break;
        case '19':
            viewStatistics();
            break;
        case '20':
            viewTopStudents();
            break;
        case '21':
            await viewStudentsByGPARange();
            break;
        case '0':
            console.log('\nThank you for using Student Management System!');
            console.log('Goodbye! 👋\n');
            return false;
        default:
            console.log('❌ Invalid choice! Please try again.');
    }
    return true;
}

// ========== STUDENT MANAGEMENT FUNCTIONS ==========

async function addNewStudent() {
    console.log('\n─── Add New Student ───');
    const name = prompt('Enter student name:');
    const email = prompt('Enter email:');
    const age = prompt('Enter age:');
    const studentId = prompt('Enter student ID (or leave blank for auto-generate):') || null;
    
    const result = studentManager.addStudent(name, email, age, studentId);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
        console.log(`Student Info: ${result.student.getInfo()}`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

function viewAllStudents() {
    console.log('\n─── All Students ───');
    const students = studentManager.getAllStudents();
    
    if (students.length === 0) {
        console.log('No students found.');
        return;
    }
    
    students.forEach((student, index) => {
        const gpa = student.calculateGPA();
        console.log(`${index + 1}. ${student.getInfo()} | GPA: ${gpa} | Status: ${student.status}`);
    });
    console.log(`\nTotal: ${students.length} students`);
}

async function searchStudents() {
    console.log('\n─── Search Students ───');
    const query = prompt('Enter search term (name, email, or student ID):');
    
    const results = studentManager.searchStudents(query);
    
    if (results.length === 0) {
        console.log('No students found.');
        return;
    }
    
    console.log(`\nFound ${results.length} student(s):`);
    results.forEach((student, index) => {
        console.log(`${index + 1}. ${student.getInfo()}`);
    });
}

async function viewStudentDetails() {
    console.log('\n─── Student Details ───');
    const studentId = prompt('Enter student ID:');
    
    const student = studentManager.findStudent(studentId);
    
    if (!student) {
        console.log('❌ Student not found.');
        return;
    }
    
    const details = student.getDetailedInfo();
    console.log('\n═══════════════════════════════════════');
    console.log('STUDENT DETAILS:');
    console.log('═══════════════════════════════════════');
    console.log(`Name: ${details.name}`);
    console.log(`Student ID: ${details.studentId}`);
    console.log(`Email: ${details.email}`);
    console.log(`Age: ${details.age}`);
    console.log(`Status: ${details.status.toUpperCase()}`);
    console.log(`Enrolled Courses: ${details.enrolledCourses}`);
    console.log(`GPA: ${details.gpa}`);
    
    // Display enrolled courses
    if (student.enrolledCourses.length > 0) {
        console.log('\nEnrolled Courses:');
        student.enrolledCourses.forEach(courseId => {
            const course = studentManager.findCourse(courseId);
            if (course) {
                console.log(`  - ${course.getInfo()}`);
            }
        });
    }
    
    // Display grades
    if (student.grades.length > 0) {
        console.log('\nGrades:');
        student.grades.forEach(grade => {
            const course = studentManager.findCourse(grade.courseId);
            console.log(`  - ${course ? course.code : 'Unknown'}: ${grade.getLetterGrade()} (${grade.points} points) - ${grade.semester}`);
        });
    }
}

async function updateStudentStatus() {
    console.log('\n─── Update Student Status ───');
    const studentId = prompt('Enter student ID:');
    const status = prompt('Enter new status (active/graduated/suspended):');
    
    const result = studentManager.updateStudentStatus(studentId, status);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

async function removeStudent() {
    console.log('\n─── Remove Student ───');
    const studentId = prompt('Enter student ID:');
    
    const confirm = prompt(`Are you sure you want to remove student ${studentId}? (yes/no):`);
    
    if (confirm.toLowerCase() === 'yes') {
        const result = studentManager.removeStudent(studentId);
        
        if (result.success) {
            console.log(`\n✅ ${result.message}`);
        } else {
            console.log(`\n❌ ${result.message}`);
        }
    } else {
        console.log('Operation cancelled.');
    }
}

// ========== COURSE MANAGEMENT FUNCTIONS ==========

async function addNewCourse() {
    console.log('\n─── Add New Course ───');
    const code = prompt('Enter course code (e.g., CS101):');
    const name = prompt('Enter course name:');
    const instructor = prompt('Enter instructor name:');
    const credits = prompt('Enter credits (1-6):');
    const capacity = prompt('Enter capacity (default 30):') || 30;
    
    const result = studentManager.addCourse(code, name, instructor, credits, capacity);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
        console.log(`Course Info: ${result.course.getInfo()}`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

function viewAllCourses() {
    console.log('\n─── All Courses ───');
    const courses = studentManager.getAllCourses();
    
    if (courses.length === 0) {
        console.log('No courses found.');
        return;
    }
    
    courses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.getInfo()} | Enrolled: ${course.enrolledStudents.length}/${course.maxCapacity}`);
    });
    console.log(`\nTotal: ${courses.length} courses`);
}

async function searchCourses() {
    console.log('\n─── Search Courses ───');
    const query = prompt('Enter search term (code, name, or instructor):');
    
    const results = studentManager.searchCourses(query);
    
    if (results.length === 0) {
        console.log('No courses found.');
        return;
    }
    
    console.log(`\nFound ${results.length} course(s):`);
    results.forEach((course, index) => {
        console.log(`${index + 1}. ${course.getInfo()}`);
    });
}

async function viewCourseDetails() {
    console.log('\n─── Course Details ───');
    const courseId = prompt('Enter course code or ID:');
    
    const course = studentManager.findCourse(courseId);
    
    if (!course) {
        console.log('❌ Course not found.');
        return;
    }
    
    const details = course.getDetailedInfo();
    console.log('\n═══════════════════════════════════════');
    console.log('COURSE DETAILS:');
    console.log('═══════════════════════════════════════');
    console.log(`Code: ${details.code}`);
    console.log(`Name: ${details.name}`);
    console.log(`Instructor: ${details.instructor}`);
    console.log(`Credits: ${details.credits}`);
    console.log(`Enrolled: ${details.enrolled}/${details.capacity}`);
    console.log(`Available Slots: ${details.availableSlots}`);
    console.log(`Status: ${details.isFull ? 'FULL' : 'Available'}`);
    
    // Display enrolled students
    if (course.enrolledStudents.length > 0) {
        console.log('\nEnrolled Students:');
        course.enrolledStudents.forEach((studentId, index) => {
            const student = studentManager.findStudent(studentId);
            if (student) {
                console.log(`  ${index + 1}. ${student.name} (${student.studentId})`);
            }
        });
    }
}

async function removeCourse() {
    console.log('\n─── Remove Course ───');
    const courseId = prompt('Enter course code or ID:');
    
    const confirm = prompt(`Are you sure you want to remove course ${courseId}? (yes/no):`);
    
    if (confirm.toLowerCase() === 'yes') {
        const result = studentManager.removeCourse(courseId);
        
        if (result.success) {
            console.log(`\n✅ ${result.message}`);
        } else {
            console.log(`\n❌ ${result.message}`);
        }
    } else {
        console.log('Operation cancelled.');
    }
}

// ========== ENROLLMENT MANAGEMENT FUNCTIONS ==========

async function enrollStudentInCourse() {
    console.log('\n─── Enroll Student in Course ───');
    const studentId = prompt('Enter student ID:');
    const courseId = prompt('Enter course code:');
    
    const result = studentManager.enrollStudentInCourse(studentId, courseId);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

async function unenrollStudentFromCourse() {
    console.log('\n─── Unenroll Student from Course ───');
    const studentId = prompt('Enter student ID:');
    const courseId = prompt('Enter course code:');
    
    const result = studentManager.unenrollStudentFromCourse(studentId, courseId);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

async function viewStudentEnrollments() {
    console.log('\n─── Student Enrollments ───');
    const studentId = prompt('Enter student ID:');
    
    const student = studentManager.findStudent(studentId);
    
    if (!student) {
        console.log('❌ Student not found.');
        return;
    }
    
    console.log(`\nEnrollments for ${student.name} (${student.studentId}):`);
    
    if (student.enrolledCourses.length === 0) {
        console.log('No enrollments found.');
        return;
    }
    
    student.enrolledCourses.forEach((courseId, index) => {
        const course = studentManager.findCourse(courseId);
        if (course) {
            console.log(`${index + 1}. ${course.getInfo()}`);
        }
    });
}

// ========== GRADE MANAGEMENT FUNCTIONS ==========

async function addGrade() {
    console.log('\n─── Add Grade ───');
    const studentId = prompt('Enter student ID:');
    const courseId = prompt('Enter course code:');
    const points = prompt('Enter grade points (0.0-4.0):');
    const credits = prompt('Enter credits:');
    const semester = prompt('Enter semester (default: Fall 2024):') || 'Fall 2024';
    
    const result = studentManager.addGrade(studentId, courseId, points, credits, semester);
    
    if (result.success) {
        console.log(`\n✅ ${result.message}`);
        console.log(`Grade: ${result.grade.getLetterGrade()} (${result.grade.points} points)`);
    } else {
        console.log(`\n❌ ${result.message}`);
    }
}

async function viewStudentGrades() {
    console.log('\n─── Student Grades ───');
    const studentId = prompt('Enter student ID:');
    
    const result = studentManager.getStudentGrades(studentId);
    
    if (!result.success) {
        console.log(`\n❌ ${result.message}`);
        return;
    }
    
    const student = studentManager.findStudent(studentId);
    console.log(`\nGrades for ${student.name} (${student.studentId}):`);
    console.log(`GPA: ${student.calculateGPA()}`);
    
    if (result.grades.length === 0) {
        console.log('No grades found.');
        return;
    }
    
    console.log('\nGrade Details:');
    result.grades.forEach((grade, index) => {
        const course = studentManager.findCourse(grade.courseId);
        console.log(`${index + 1}. ${course ? course.code : 'Unknown'}: ${grade.getLetterGrade()} (${grade.points} points) - ${grade.credits} credits - ${grade.semester}`);
    });
}

async function viewCourseGrades() {
    console.log('\n─── Course Grades ───');
    const courseId = prompt('Enter course code:');
    
    const result = studentManager.getCourseGrades(courseId);
    
    if (!result.success) {
        console.log(`\n❌ ${result.message}`);
        return;
    }
    
    const course = studentManager.findCourse(courseId);
    console.log(`\nGrades for ${course.code}: ${course.name}`);
    
    if (result.grades.length === 0) {
        console.log('No grades found.');
        return;
    }
    
    console.log('\nGrade Details:');
    result.grades.forEach((grade, index) => {
        const student = studentManager.findStudent(grade.studentId);
        console.log(`${index + 1}. ${student ? student.name : 'Unknown'} (${student ? student.studentId : 'N/A'}): ${grade.getLetterGrade()} (${grade.points} points)`);
    });
}

async function calculateStudentGPA() {
    console.log('\n─── Calculate Student GPA ───');
    const studentId = prompt('Enter student ID:');
    
    const student = studentManager.findStudent(studentId);
    
    if (!student) {
        console.log('❌ Student not found.');
        return;
    }
    
    const gpa = student.calculateGPA();
    console.log(`\nGPA for ${student.name} (${student.studentId}): ${gpa}`);
    
    if (student.grades.length > 0) {
        console.log('\nGrade Breakdown:');
        student.grades.forEach((grade, index) => {
            const course = studentManager.findCourse(grade.courseId);
            console.log(`${index + 1}. ${course ? course.code : 'Unknown'}: ${grade.getLetterGrade()} (${grade.points} points × ${grade.credits} credits)`);
        });
    }
}

// ========== STATISTICS FUNCTIONS ==========

function viewStatistics() {
    console.log('\n─── System Statistics ───');
    const stats = studentManager.getStatistics();
    
    console.log('\n═══════════════════════════════════════');
    console.log('SYSTEM STATISTICS:');
    console.log('═══════════════════════════════════════');
    console.log(`Total Students: ${stats.totalStudents}`);
    console.log(`Active Students: ${stats.activeStudents}`);
    console.log(`Graduated Students: ${stats.graduatedStudents}`);
    console.log(`Total Courses: ${stats.totalCourses}`);
    console.log(`Total Grades: ${stats.totalGrades}`);
    console.log(`Average GPA: ${stats.averageGPA}`);
    console.log(`Total Enrollments: ${stats.totalEnrollments}`);
}

function viewTopStudents() {
    console.log('\n─── Top Performing Students ───');
    const limit = parseInt(prompt('Enter number of top students to display (default 10):') || 10);
    
    const topStudents = studentManager.getTopStudents(limit);
    
    if (topStudents.length === 0) {
        console.log('No students found.');
        return;
    }
    
    console.log(`\nTop ${topStudents.length} Students by GPA:\n`);
    topStudents.forEach((student, index) => {
        const gpa = student.calculateGPA();
        console.log(`${index + 1}. ${student.name} (${student.studentId}) - GPA: ${gpa}`);
    });
}

async function viewStudentsByGPARange() {
    console.log('\n─── Students by GPA Range ───');
    const minGPA = parseFloat(prompt('Enter minimum GPA (0.0-4.0):'));
    const maxGPA = parseFloat(prompt('Enter maximum GPA (0.0-4.0):'));
    
    if (isNaN(minGPA) || isNaN(maxGPA) || minGPA < 0 || maxGPA > 4.0 || minGPA > maxGPA) {
        console.log('❌ Invalid GPA range.');
        return;
    }
    
    const students = studentManager.getStudentsByGPARange(minGPA, maxGPA);
    
    if (students.length === 0) {
        console.log(`No students found with GPA between ${minGPA} and ${maxGPA}.`);
        return;
    }
    
    console.log(`\nStudents with GPA between ${minGPA} and ${maxGPA}:`);
    students.forEach((student, index) => {
        const gpa = student.calculateGPA();
        console.log(`${index + 1}. ${student.name} (${student.studentId}) - GPA: ${gpa}`);
    });
}

// ========== MAIN LOOP ==========

// For browser console - use prompt
async function startBrowserApp() {
    initializeApp();
    
    let running = true;
    while (running) {
        const choice = prompt('\nEnter your choice (0-21) or type "menu" to see menu:');
        
        if (choice === null) {
            running = false;
            break;
        }
        
        if (choice.toLowerCase() === 'menu') {
            displayMenu();
            continue;
        }
        
        running = await handleChoice(choice);
    }
}

// For Node.js console - use readline
function startNodeApp() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    initializeApp();
    
    function askQuestion() {
        rl.question('\nEnter your choice (0-21) or type "menu" to see menu: ', async (choice) => {
            if (choice.toLowerCase() === 'menu') {
                displayMenu();
                askQuestion();
                return;
            }
            
            const running = await handleChoice(choice);
            
            if (running) {
                askQuestion();
            } else {
                rl.close();
            }
        });
    }
    
    askQuestion();
}

// Auto-detect environment
if (typeof window !== 'undefined') {
    // Browser environment
    window.startApp = startBrowserApp;
    console.log('Type startApp() to begin the application');
} else {
    // Node.js environment
    startNodeApp();
}

