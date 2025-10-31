/**
 * Student Class - Demonstrates Encapsulation
 * Private properties: #id, #email
 */
class Student {
    #id;           // Private property
    #email;
    
    constructor(name, email, age, studentId) {
        this.#id = this.generateId();
        this.name = name;
        this.#email = email;
        this.age = age;
        this.studentId = studentId || this.generateStudentId();
        this.enrolledCourses = [];  // Array of course IDs
        this.grades = [];            // Array of grade objects
        this.status = 'active';      // active, graduated, suspended
    }
    
    // Private method to generate unique ID
    generateId() {
        return `STU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Generate student ID format: STU2024-001
    generateStudentId() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 9000) + 1000;
        return `STU${year}-${random}`;
    }
    
    // Getters for private properties
    get id() {
        return this.#id;
    }
    
    get email() {
        return this.#email;
    }
    
    // Setter for email with validation
    set email(newEmail) {
        // Check if Validator is available
        const validator = typeof Validator !== 'undefined' ? Validator : 
                         (typeof window !== 'undefined' && window.Validator ? window.Validator : null);
        
        if (validator && validator.validateEmail(newEmail)) {
            this.#email = newEmail;
        } else if (!validator) {
            // Basic validation if Validator not available
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(newEmail)) {
                this.#email = newEmail;
            } else {
                throw new Error('Invalid email format');
            }
        } else {
            throw new Error('Invalid email format');
        }
    }
    
    // Methods for course enrollment
    enrollCourse(courseId) {
        if (!this.enrolledCourses.includes(courseId)) {
            this.enrolledCourses.push(courseId);
            return true;
        }
        return false;
    }
    
    unenrollCourse(courseId) {
        this.enrolledCourses = this.enrolledCourses.filter(id => id !== courseId);
        this.grades = this.grades.filter(grade => grade.courseId !== courseId);
    }
    
    // Methods for grades
    addGrade(grade) {
        this.grades.push(grade);
    }
    
    // Calculate GPA
    calculateGPA() {
        if (this.grades.length === 0) return 0;
        
        const totalPoints = this.grades.reduce((sum, grade) => sum + grade.points, 0);
        const totalCredits = this.grades.reduce((sum, grade) => sum + grade.credits, 0);
        
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    }
    
    // Get student info
    getInfo() {
        return `${this.name} (${this.studentId}) - ${this.email} - Age: ${this.age}`;
    }
    
    // Get detailed info
    getDetailedInfo() {
        return {
            id: this.#id,
            name: this.name,
            studentId: this.studentId,
            email: this.#email,
            age: this.age,
            status: this.status,
            enrolledCourses: this.enrolledCourses.length,
            gpa: this.calculateGPA()
        };
    }
    
    // Update status
    updateStatus(newStatus) {
        const validStatuses = ['active', 'graduated', 'suspended'];
        if (validStatuses.includes(newStatus.toLowerCase())) {
            this.status = newStatus.toLowerCase();
            return true;
        }
        return false;
    }
}

