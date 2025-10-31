/**
 * StudentManager Class - Main system class
 * Demonstrates Composition and Abstraction
 */
class StudentManager {
    #students;      // Private array
    #courses;       // Private array
    #grades;        // Private array
    
    constructor() {
        this.#students = [];
        this.#courses = [];
        this.#grades = [];
    }
    
    // ========== STUDENT MANAGEMENT ==========
    
    // Add a new student
    addStudent(name, email, age, studentId = null) {
        // Validation
        if (!Validator.validateName(name)) {
            return { success: false, message: 'Invalid name format' };
        }
        
        if (!Validator.validateEmail(email)) {
            return { success: false, message: 'Invalid email format' };
        }
        
        if (!Validator.validateAge(age)) {
            return { success: false, message: 'Invalid age (must be 15-100)' };
        }
        
        // Check if email already exists
        if (this.#students.some(s => s.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        // Check if studentId already exists
        if (studentId && this.#students.some(s => s.studentId === studentId)) {
            return { success: false, message: 'Student ID already exists' };
        }
        
        const student = new Student(name, email, parseInt(age), studentId);
        this.#students.push(student);
        
        return { success: true, message: 'Student added successfully', student };
    }
    
    // Find student by ID or studentId
    findStudent(idOrStudentId) {
        return this.#students.find(s => s.id === idOrStudentId || s.studentId === idOrStudentId);
    }
    
    // Get all students
    getAllStudents() {
        return [...this.#students];  // Return copy to prevent direct modification
    }
    
    // Get active students
    getActiveStudents() {
        return this.#students.filter(s => s.status === 'active');
    }
    
    // Search students
    searchStudents(query) {
        const lowerQuery = query.toLowerCase();
        return this.#students.filter(student =>
            student.name.toLowerCase().includes(lowerQuery) ||
            student.email.toLowerCase().includes(lowerQuery) ||
            student.studentId.toLowerCase().includes(lowerQuery)
        );
    }
    
    // Update student status
    updateStudentStatus(studentId, status) {
        const student = this.findStudent(studentId);
        if (student) {
            if (student.updateStatus(status)) {
                return { success: true, message: 'Status updated successfully' };
            }
            return { success: false, message: 'Invalid status' };
        }
        return { success: false, message: 'Student not found' };
    }
    
    // Remove student
    removeStudent(studentId) {
        const index = this.#students.findIndex(s => s.id === studentId || s.studentId === studentId);
        if (index !== -1) {
            const student = this.#students[index];
            
            // Unenroll from all courses
            student.enrolledCourses.forEach(courseId => {
                const course = this.findCourse(courseId);
                if (course) {
                    course.removeStudent(student.id);
                }
            });
            
            // Remove all grades for this student
            this.#grades = this.#grades.filter(g => g.studentId !== student.id);
            
            this.#students.splice(index, 1);
            return { success: true, message: 'Student removed successfully' };
        }
        return { success: false, message: 'Student not found' };
    }
    
    // ========== COURSE MANAGEMENT ==========
    
    // Add a new course
    addCourse(code, name, instructor, credits, capacity = 30) {
        // Validation
        if (!Validator.validateCourseCode(code)) {
            return { success: false, message: 'Invalid course code format (e.g., CS101)' };
        }
        
        if (!Validator.validateCredits(credits)) {
            return { success: false, message: 'Invalid credits (1-6)' };
        }
        
        // Check if course code already exists
        if (this.#courses.some(c => c.code === code)) {
            return { success: false, message: 'Course code already exists' };
        }
        
        const course = new Course(code, name, instructor, parseInt(credits), parseInt(capacity));
        this.#courses.push(course);
        
        return { success: true, message: 'Course added successfully', course };
    }
    
    // Find course by ID or code
    findCourse(idOrCode) {
        return this.#courses.find(c => c.id === idOrCode || c.code === idOrCode);
    }
    
    // Get all courses
    getAllCourses() {
        return [...this.#courses];
    }
    
    // Search courses
    searchCourses(query) {
        const lowerQuery = query.toLowerCase();
        return this.#courses.filter(course =>
            course.code.toLowerCase().includes(lowerQuery) ||
            course.name.toLowerCase().includes(lowerQuery) ||
            course.instructor.toLowerCase().includes(lowerQuery)
        );
    }
    
    // Remove course
    removeCourse(courseId) {
        const index = this.#courses.findIndex(c => c.id === courseId || c.code === courseId);
        if (index !== -1) {
            const course = this.#courses[index];
            
            // Unenroll all students
            course.enrolledStudents.forEach(studentId => {
                const student = this.findStudent(studentId);
                if (student) {
                    student.unenrollCourse(course.id);
                }
            });
            
            // Remove all grades for this course
            this.#grades = this.#grades.filter(g => g.courseId !== course.id);
            
            this.#courses.splice(index, 1);
            return { success: true, message: 'Course removed successfully' };
        }
        return { success: false, message: 'Course not found' };
    }
    
    // ========== ENROLLMENT MANAGEMENT ==========
    
    // Enroll student in course
    enrollStudentInCourse(studentId, courseId) {
        const student = this.findStudent(studentId);
        const course = this.findCourse(courseId);
        
        if (!student) {
            return { success: false, message: 'Student not found' };
        }
        
        if (!course) {
            return { success: false, message: 'Course not found' };
        }
        
        if (student.status !== 'active') {
            return { success: false, message: 'Student is not active' };
        }
        
        // Try to add student to course
        const courseResult = course.addStudent(student.id);
        if (!courseResult.success) {
            return courseResult;
        }
        
        // Enroll student in course
        student.enrollCourse(course.id);
        
        return { success: true, message: 'Student enrolled successfully' };
    }
    
    // Unenroll student from course
    unenrollStudentFromCourse(studentId, courseId) {
        const student = this.findStudent(studentId);
        const course = this.findCourse(courseId);
        
        if (!student || !course) {
            return { success: false, message: 'Student or course not found' };
        }
        
        course.removeStudent(student.id);
        student.unenrollCourse(course.id);
        
        // Remove grades for this student-course combination
        this.#grades = this.#grades.filter(g => 
            !(g.studentId === student.id && g.courseId === course.id)
        );
        
        return { success: true, message: 'Student unenrolled successfully' };
    }
    
    // ========== GRADE MANAGEMENT ==========
    
    // Add grade for student in course
    addGrade(studentId, courseId, points, credits, semester = 'Fall 2024') {
        const student = this.findStudent(studentId);
        const course = this.findCourse(courseId);
        
        if (!student) {
            return { success: false, message: 'Student not found' };
        }
        
        if (!course) {
            return { success: false, message: 'Course not found' };
        }
        
        if (!student.enrolledCourses.includes(course.id)) {
            return { success: false, message: 'Student is not enrolled in this course' };
        }
        
        if (!Validator.validateGradePoints(points)) {
            return { success: false, message: 'Invalid grade points (0-4.0)' };
        }
        
        if (!Validator.validateCredits(credits)) {
            return { success: false, message: 'Invalid credits (1-6)' };
        }
        
        const grade = new Grade(student.id, course.id, parseFloat(points), parseInt(credits), semester);
        student.addGrade(grade);
        this.#grades.push(grade);
        
        return { success: true, message: 'Grade added successfully', grade };
    }
    
    // Get student grades
    getStudentGrades(studentId) {
        const student = this.findStudent(studentId);
        if (!student) {
            return { success: false, message: 'Student not found', grades: [] };
        }
        
        return { success: true, grades: [...student.grades] };
    }
    
    // Get course grades
    getCourseGrades(courseId) {
        const course = this.findCourse(courseId);
        if (!course) {
            return { success: false, message: 'Course not found', grades: [] };
        }
        
        const courseGrades = this.#grades.filter(g => g.courseId === course.id);
        return { success: true, grades: courseGrades };
    }
    
    // ========== STATISTICS ==========
    
    // Get system statistics
    getStatistics() {
        const activeStudents = this.getActiveStudents();
        const totalGPA = activeStudents.reduce((sum, s) => sum + parseFloat(s.calculateGPA()), 0);
        const avgGPA = activeStudents.length > 0 ? (totalGPA / activeStudents.length).toFixed(2) : 0;
        
        return {
            totalStudents: this.#students.length,
            activeStudents: activeStudents.length,
            graduatedStudents: this.#students.filter(s => s.status === 'graduated').length,
            totalCourses: this.#courses.length,
            totalGrades: this.#grades.length,
            averageGPA: avgGPA,
            totalEnrollments: this.#students.reduce((sum, s) => sum + s.enrolledCourses.length, 0)
        };
    }
    
    // Get students by GPA range
    getStudentsByGPARange(minGPA, maxGPA) {
        return this.#students.filter(student => {
            const gpa = parseFloat(student.calculateGPA());
            return gpa >= minGPA && gpa <= maxGPA;
        });
    }
    
    // Get top performing students
    getTopStudents(limit = 10) {
        return [...this.#students]
            .sort((a, b) => parseFloat(b.calculateGPA()) - parseFloat(a.calculateGPA()))
            .slice(0, limit);
    }
    
    // Get students without grades
    getStudentsWithoutGrades() {
        return this.#students.filter(s => s.grades.length === 0);
    }
}

