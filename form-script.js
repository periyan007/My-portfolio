// Digital Portfolio Form JavaScript
class PortfolioForm {
    constructor() {
        this.form = document.getElementById('portfolioForm');
        this.educationCount = 1;
        this.projectCount = 1;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDraftData();
    }

    bindEvents() {
        // Add education entry
        document.getElementById('addEducation').addEventListener('click', () => {
            this.addEducationEntry();
        });

        // Add project entry
        document.getElementById('addProject').addEventListener('click', () => {
            this.addProjectEntry();
        });

        // Form actions
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.previewData();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveDraft();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearForm();
        });

        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('editBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('finalSubmitBtn').addEventListener('click', () => {
            this.submitForm();
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.previewData();
        });

        // Auto-save functionality
        this.form.addEventListener('input', this.debounce(() => {
            this.autoSave();
        }, 2000));

        // Auto-fill name fields
        document.getElementById('fullName').addEventListener('input', () => {
            this.autoFillNames();
        });

        // Real-time validation
        this.addRealTimeValidation();
    }

    addEducationEntry() {
        this.educationCount++;
        const educationContainer = document.querySelector('.education-entries');
        const newEntry = this.createEducationEntry(this.educationCount);
        educationContainer.appendChild(newEntry);
    }

    createEducationEntry(count) {
        const div = document.createElement('div');
        div.className = 'education-entry';
        div.innerHTML = `
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="degree${count}">Degree/Certification</label>
                    <input type="text" id="degree${count}" name="degree${count}" 
                           placeholder="e.g., Bachelor's in Engineering">
                </div>
                <div class="form-group half-width">
                    <label for="institution${count}">Institution</label>
                    <input type="text" id="institution${count}" name="institution${count}" 
                           placeholder="University/College name">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="graduationYear${count}">Year of Graduation</label>
                    <input type="number" id="graduationYear${count}" name="graduationYear${count}" 
                           min="1980" max="2030">
                </div>
                <div class="form-group half-width">
                    <label for="gpa${count}">GPA (Optional)</label>
                    <input type="text" id="gpa${count}" name="gpa${count}" placeholder="e.g., 3.8/4.0">
                </div>
            </div>
            <button type="button" class="btn-danger remove-entry" onclick="this.parentElement.remove()">
                Remove Entry
            </button>
        `;
        return div;
    }

    addProjectEntry() {
        this.projectCount++;
        const projectContainer = document.querySelector('.project-entries');
        const newEntry = this.createProjectEntry(this.projectCount);
        projectContainer.appendChild(newEntry);
    }

    createProjectEntry(count) {
        const div = document.createElement('div');
        div.className = 'project-entry';
        div.innerHTML = `
            <div class="form-group">
                <label for="projectName${count}">Project Name</label>
                <input type="text" id="projectName${count}" name="projectName${count}" 
                       placeholder="e.g., Dream It Code It">
            </div>
            <div class="form-group">
                <label for="projectDescription${count}">Project Description</label>
                <textarea id="projectDescription${count}" name="projectDescription${count}" rows="3" 
                          placeholder="Describe your project, technologies used, and outcomes"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="projectUrl${count}">Project URL (Optional)</label>
                    <input type="url" id="projectUrl${count}" name="projectUrl${count}" 
                           placeholder="https://example.com">
                </div>
                <div class="form-group half-width">
                    <label for="projectDate${count}">Completion Date</label>
                    <input type="date" id="projectDate${count}" name="projectDate${count}">
                </div>
            </div>
            <button type="button" class="btn-danger remove-entry" onclick="this.parentElement.remove()">
                Remove Entry
            </button>
        `;
        return div;
    }

    autoFillNames() {
        const fullName = document.getElementById('fullName').value;
        if (fullName.includes(' ')) {
            const names = fullName.split(' ');
            document.getElementById('firstName').value = names[0];
            document.getElementById('lastName').value = names.slice(1).join(' ');
        }
    }

    previewData() {
        const formData = this.getFormData();
        const previewContent = document.getElementById('previewContent');
        
        let html = '<h3>Personal Information</h3>';
        html += `<p><strong>Full Name:</strong> ${formData.fullName || 'Not provided'}</p>`;
        html += `<p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>`;
        html += `<p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>`;
        html += `<p><strong>Address:</strong> ${formData.address || 'Not provided'}</p>`;

        html += '<h3>Professional Information</h3>';
        html += `<p><strong>Current Position:</strong> ${formData.currentPosition || 'Not provided'}</p>`;
        html += `<p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>`;
        html += `<p><strong>Experience:</strong> ${formData.experienceYears || 'Not provided'}</p>`;
        html += `<p><strong>Skills:</strong> ${formData.skills || 'Not provided'}</p>`;

        if (formData.bio) {
            html += `<p><strong>Bio:</strong> ${formData.bio}</p>`;
        }

        // Add education entries
        html += '<h3>Education</h3>';
        for (let i = 1; i <= this.educationCount; i++) {
            if (formData[`degree${i}`] || formData[`institution${i}`]) {
                html += `<p><strong>Degree:</strong> ${formData[`degree${i}`] || 'Not provided'} - 
                         ${formData[`institution${i}`] || 'Not provided'} 
                         (${formData[`graduationYear${i}`] || 'Year not provided'})</p>`;
            }
        }

        // Add project entries
        html += '<h3>Projects</h3>';
        for (let i = 1; i <= this.projectCount; i++) {
            if (formData[`projectName${i}`]) {
                html += `<p><strong>${formData[`projectName${i}`]}:</strong> ${formData[`projectDescription${i}`] || 'No description'}</p>`;
                if (formData[`projectUrl${i}`]) {
                    html += `<p><strong>URL:</strong> <a href="${formData[`projectUrl${i}`]}" target="_blank">${formData[`projectUrl${i}`]}</a></p>`;
                }
            }
        }

        // Add social media
        html += '<h3>Social Media & Contact</h3>';
        if (formData.linkedin) html += `<p><strong>LinkedIn:</strong> <a href="${formData.linkedin}" target="_blank">${formData.linkedin}</a></p>`;
        if (formData.github) html += `<p><strong>GitHub:</strong> <a href="${formData.github}" target="_blank">${formData.github}</a></p>`;
        if (formData.twitter) html += `<p><strong>Twitter:</strong> <a href="${formData.twitter}" target="_blank">${formData.twitter}</a></p>`;

        // Add career goals
        if (formData.currentGoals || formData.fiveYearGoals) {
            html += '<h3>Career Goals</h3>';
            if (formData.currentGoals) html += `<p><strong>Current Goals:</strong> ${formData.currentGoals}</p>`;
            if (formData.fiveYearGoals) html += `<p><strong>5-Year Goals:</strong> ${formData.fiveYearGoals}</p>`;
        }

        previewContent.innerHTML = html;
        document.getElementById('previewModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('previewModal').style.display = 'none';
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    saveDraft() {
        const formData = this.getFormData();
        localStorage.setItem('portfolioFormDraft', JSON.stringify(formData));
        localStorage.setItem('portfolioFormDraftTime', new Date().toISOString());
        this.showNotification('Draft saved successfully!', 'success');
    }

    autoSave() {
        const formData = this.getFormData();
        localStorage.setItem('portfolioFormAutoSave', JSON.stringify(formData));
        localStorage.setItem('portfolioFormAutoSaveTime', new Date().toISOString());
    }

    loadDraftData() {
        const draftData = localStorage.getItem('portfolioFormDraft');
        if (draftData) {
            const data = JSON.parse(draftData);
            this.populateForm(data);
            this.showNotification('Draft data loaded', 'info');
        }
    }

    populateForm(data) {
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key) || document.getElementsByName(key)[0];
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key] === 'on';
                } else {
                    element.value = data[key];
                }
            }
        });
    }

    exportData() {
        const formData = this.getFormData();
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully!', 'success');
    }

    clearForm() {
        if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
            this.form.reset();
            localStorage.removeItem('portfolioFormDraft');
            localStorage.removeItem('portfolioFormAutoSave');
            this.showNotification('Form cleared successfully!', 'info');
        }
    }

    submitForm() {
        const formData = this.getFormData();
        
        // Simulate form submission
        this.form.classList.add('form-loading');
        
        setTimeout(() => {
            this.form.classList.remove('form-loading');
            this.closeModal();
            
            // Clear saved data on successful submission
            localStorage.removeItem('portfolioFormDraft');
            localStorage.removeItem('portfolioFormAutoSave');
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = `
                <h2>Form Submitted Successfully!</h2>
                <p>Your portfolio information has been submitted. Thank you!</p>
                <button onclick="this.parentElement.remove()" class="btn-primary" style="margin-top: 1rem;">
                    Close
                </button>
            `;
            
            this.form.parentNode.insertBefore(successDiv, this.form);
            this.form.style.display = 'none';
            
            // Log the data (in a real application, this would be sent to a server)
            console.log('Form Data Submitted:', formData);
            
        }, 2000);
    }

    addRealTimeValidation() {
        // Email validation
        const emailField = document.getElementById('email');
        emailField.addEventListener('input', () => {
            const isValid = this.validateEmail(emailField.value);
            emailField.style.borderColor = isValid ? '#08FF20' : '#FF4444';
        });

        // Phone validation
        const phoneField = document.getElementById('phone');
        phoneField.addEventListener('input', () => {
            const isValid = this.validatePhone(phoneField.value);
            phoneField.style.borderColor = isValid ? '#08FF20' : '#FF4444';
        });

        // URL validation for social media fields
        ['linkedin', 'github', 'twitter', 'instagram', 'portfolio'].forEach(fieldName => {
            const field = document.getElementById(fieldName);
            field.addEventListener('input', () => {
                if (field.value) {
                    const isValid = this.validateURL(field.value);
                    field.style.borderColor = isValid ? '#08FF20' : '#FF4444';
                }
            });
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[-\s\(\)]/g, ''));
    }

    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#08FF20' : type === 'error' ? '#FF4444' : '#A51BEDE3'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 1rem 2rem;
            border-radius: 1rem;
            z-index: 1001;
            animation: slideIn 0.3s ease;
            box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Add notification animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification button {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        margin-left: 1rem;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioForm();
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});