/**
 * Course Class - Demonstrates Encapsulation
 */
class Course {
    #id;           // Private property
    #maxCapacity;
    
    constructor(code, name, instructor, credits, capacity = 30) {
        this.#id = this.generateId();
        this.code = code;           // e.g., "CS101"
        this.name = name;
        this.instructor = instructor;
        this.credits = credits;
        this.#maxCapacity = capacity;
        this.enrolledStudents = [];  // Array of student IDs
        this.schedule = null;        // Can be extended with schedule object
    }
    
    // Private method to generate unique ID
    generateId() {
        return `COURSE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Getter for private property
    get id() {
        return this.#id;
    }
    
    get maxCapacity() {
        return this.#maxCapacity;
    }
    
    get availableSlots() {
        return this.#maxCapacity - this.enrolledStudents.length;
    }
    
    get isFull() {
        return this.enrolledStudents.length >= this.#maxCapacity;
    }
    
    // Set capacity
    setCapacity(capacity) {
        if (capacity >= this.enrolledStudents.length) {
            this.#maxCapacity = capacity;
            return true;
        }
        return false;
    }
    
    // Add student to course
    addStudent(studentId) {
        if (this.isFull) {
            return { success: false, message: 'Course is full' };
        }
        
        if (this.enrolledStudents.includes(studentId)) {
            return { success: false, message: 'Student already enrolled' };
        }
        
        this.enrolledStudents.push(studentId);
        return { success: true, message: 'Student enrolled successfully' };
    }
    
    // Remove student from course
    removeStudent(studentId) {
        const index = this.enrolledStudents.indexOf(studentId);
        if (index !== -1) {
            this.enrolledStudents.splice(index, 1);
            return true;
        }
        return false;
    }
    
    // Get course info
    getInfo() {
        return `${this.code}: ${this.name} - ${this.instructor} (${this.credits} credits)`;
    }
    
    // Get detailed info
    getDetailedInfo() {
        return {
            id: this.#id,
            code: this.code,
            name: this.name,
            instructor: this.instructor,
            credits: this.credits,
            enrolled: this.enrolledStudents.length,
            capacity: this.#maxCapacity,
            availableSlots: this.availableSlots,
            isFull: this.isFull
        };
    }
}

