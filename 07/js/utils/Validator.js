/**
 * Validator Class - Demonstrates Static Methods
 * Utility class with static methods for validation
 */
class Validator {
    // Static method - validate email
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Static method - validate student ID format
    static validateStudentId(studentId) {
        // Format: STU2024-1234
        const pattern = /^STU\d{4}-\d{4}$/;
        return pattern.test(studentId);
    }
    
    // Static method - validate course code
    static validateCourseCode(code) {
        // Format: CS101, MATH201, etc.
        const pattern = /^[A-Z]{2,4}\d{3}$/;
        return pattern.test(code);
    }
    
    // Static method - validate age
    static validateAge(age) {
        const numAge = parseInt(age);
        return !isNaN(numAge) && numAge >= 15 && numAge <= 100;
    }
    
    // Static method - validate name
    static validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }
    
    // Static method - validate grade points
    static validateGradePoints(points) {
        const numPoints = parseFloat(points);
        return !isNaN(numPoints) && numPoints >= 0 && numPoints <= 4.0;
    }
    
    // Static method - validate credits
    static validateCredits(credits) {
        const numCredits = parseInt(credits);
        return !isNaN(numCredits) && numCredits > 0 && numCredits <= 6;
    }
}

