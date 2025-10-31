/**
 * Grade Class - Represents relationship between Student and Course
 * Demonstrates composition
 */
class Grade {
    #id;
    
    constructor(studentId, courseId, points, credits, semester = 'Fall 2024') {
        this.#id = this.generateId();
        this.studentId = studentId;
        this.courseId = courseId;
        this.points = points;      // Grade points (0-4)
        this.credits = credits;    // Course credits
        this.semester = semester;
        this.dateRecorded = new Date();
    }
    
    // Generate unique ID
    generateId() {
        return `GRADE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    get id() {
        return this.#id;
    }
    
    // Convert points to letter grade
    getLetterGrade() {
        if (this.points >= 4.0) return 'A+';
        if (this.points >= 3.7) return 'A';
        if (this.points >= 3.3) return 'A-';
        if (this.points >= 3.0) return 'B+';
        if (this.points >= 2.7) return 'B';
        if (this.points >= 2.3) return 'B-';
        if (this.points >= 2.0) return 'C+';
        if (this.points >= 1.7) return 'C';
        if (this.points >= 1.3) return 'C-';
        if (this.points >= 1.0) return 'D';
        return 'F';
    }
    
    // Get grade info
    getInfo() {
        return `Grade: ${this.getLetterGrade()} (${this.points} points) - ${this.courseId} - ${this.semester}`;
    }
    
    // Update grade
    updateGrade(newPoints) {
        if (newPoints >= 0 && newPoints <= 4.0) {
            this.points = newPoints;
            this.dateRecorded = new Date();
            return true;
        }
        return false;
    }
}

