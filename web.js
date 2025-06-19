// Mobile Menu Toggle
const navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

// Scan Process Functionality
const uploadArea = document.getElementById("uploadArea");
const previewArea = document.getElementById("previewArea");
const analysisArea = document.getElementById("analysisArea");
const resultsArea = document.getElementById("resultsArea");
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const fileDate = document.getElementById("fileDate");
const consentCheck = document.getElementById("consentCheck");
const tumorResult = document.getElementById("tumorResult");
const lambertexScore = document.getElementById("lambertexScore");
const amidoneRange = document.getElementById("amidoneRange");
const resultImage = document.getElementById("resultImage");
const analysisProgress = document.getElementById("analysisProgress");

// File Upload Handling
fileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        // Update file info
        fileName.textContent = file.name;
        fileSize.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        fileDate.textContent = new Date().toLocaleString();
        
        // Preview image if it's an image file
        if (file.type.match("image.*")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                resultImage.src = e.target.result; // Also set for results
            };
            reader.readAsDataURL(file);
        }
        
        // Move to preview step
        uploadArea.classList.add("hidden");
        previewArea.classList.remove("hidden");
        updateStep(2);
    }
});

// Drag and Drop Functionality
uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--primary)";
    uploadArea.style.backgroundColor = "rgba(42, 92, 141, 0.1)";
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.borderColor = "var(--light-gray)";
    uploadArea.style.backgroundColor = "transparent";
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--light-gray)";
    uploadArea.style.backgroundColor = "transparent";
    
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        const event = new Event("change");
        fileInput.dispatchEvent(event);
    }
});

// Back to Upload
function backToUpload() {
    previewArea.classList.add("hidden");
    uploadArea.classList.remove("hidden");
    updateStep(1);
}

// Start Analysis
function startAnalysis() {
    if (!consentCheck.checked) {
        alert("Please consent to the analysis before proceeding");
        return;
    }
    
    previewArea.classList.add("hidden");
    analysisArea.classList.remove("hidden");
    updateStep(3);
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        analysisProgress.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(showResults, 500);
        }
    }, 300);
}

// Show Results
function showResults() {
    analysisArea.classList.add("hidden");
    resultsArea.classList.remove("hidden");
    updateStep(4);
    
    // Simulate results (in a real app, this would come from the server)
    const hasTumor = Math.random() > 0.7; // 30% chance of tumor for demo
    
    if (hasTumor) {
        tumorResult.textContent = "Detected (Glioma)";
        tumorResult.style.color = "var(--danger)";
        lambertexScore.textContent = (Math.random() * 5 + 3).toFixed(1);
        amidoneRange.textContent = `${Math.floor(Math.random() * 100 + 50)}-${Math.floor(Math.random() * 100 + 150)} ng/mL`;
        
        // Add annotation to image (simulated tumor location)
        const annotations = document.getElementById("resultAnnotations");
        annotations.innerHTML = `
            <div class="annotation" style="position: absolute; top: 30%; left: 40%; width: 60px; height: 60px; border: 2px solid var(--danger); border-radius: 50%;">
                <div class="annotation-label" style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: var(--danger); font-weight: bold;">Tumor</div>
            </div>
        `;
    } else {
        tumorResult.textContent = "No tumor detected";
        tumorResult.style.color = "var(--success)";
        lambertexScore.textContent = (Math.random() * 2).toFixed(1);
        amidoneRange.textContent = `${Math.floor(Math.random() * 20)}-${Math.floor(Math.random() * 20 + 20)} ng/mL`;
    }
}

// New Scan
function newScan() {
    resultsArea.classList.add("hidden");
    uploadArea.classList.remove("hidden");
    updateStep(1);
    fileInput.value = "";
    analysisProgress.style.width = "0%";
}

// Update Step Indicator
function updateStep(stepNumber) {
    document.querySelectorAll(".step").forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

// Initialize
updateStep(1);  

document.addEventListener('DOMContentLoaded', function () {
    // Sample doctor data
    const doctors = [
        {
            id: 1,
            name: "Dr. Samantha Perera",
            specialty: "Neuro-Oncology",
            hospital: "Nawaloka Hospital",
            location: "Colombo",
            experience: "15 years",
            languages: "English, Sinhala, Tamil",
            rating: 4.8,
            image: "images/doctor1.jpg",
            available: true,
            description: "Specialized in brain tumor diagnosis and treatment with extensive experience in neuro-oncological cases."
        },
        {
            id: 2,
            name: "Dr. Rajiv Fernando",
            specialty: "Neurosurgery",
            hospital: "Asiri Hospitals",
            location: "Colombo",
            experience: "12 years",
            languages: "English, Sinhala",
            rating: 4.6,
            image: "images/doctor2.jpg",
            available: true,
            description: "Expert in minimally invasive neurosurgical procedures with a focus on brain tumor removal."
        },
        {
            id: 3,
            name: "Dr. Nimali Silva",
            specialty: "Pediatric Neurology",
            hospital: "Lanka Hospitals",
            location: "Colombo",
            experience: "10 years",
            languages: "English, Sinhala, Tamil",
            rating: 4.9,
            image: "images/doctor3.jpg",
            available: true,
            description: "Specializes in pediatric brain disorders and tumors with a gentle approach to child care."
        },
        {
            id: 4,
            name: "Dr. Arjun Karunathilake",
            specialty: "Neuroradiology",
            hospital: "Durdans Hospital",
            location: "Colombo",
            experience: "8 years",
            languages: "English, Sinhala",
            rating: 4.5,
            image: "images/doctor4.jpg",
            available: false,
            description: "Expert in diagnostic neuroradiology with advanced imaging techniques for tumor detection."
        },
        {
            id: 5,
            name: "Dr. Priyantha Bandara",
            specialty: "Neuro-Oncology",
            hospital: "Nawaloka Hospital",
            location: "Kandy",
            experience: "18 years",
            languages: "English, Sinhala",
            rating: 4.7,
            image: "images/doctor5.jpg",
            available: true,
            description: "Pioneer in neuro-oncology treatments with extensive research experience."
        },
        {
            id: 6,
            name: "Dr. Anoma Wijesinghe",
            specialty: "Neurosurgery",
            hospital: "Asiri Hospitals",
            location: "Galle",
            experience: "14 years",
            languages: "English, Sinhala",
            rating: 4.8,
            image: "images/doctor6.jpg",
            available: true,
            description: "Specializes in complex brain tumor surgeries with high success rates."
        }
    ] 


    // DOM elements
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const specialtyFilter = document.getElementById('specialty');
    const locationFilter = document.getElementById('location');
    const hospitalFilter = document.getElementById('hospital');
    const sortBy = document.getElementById('sortBy');
    const doctorResults = document.getElementById('doctorResults');
    const resultsCount = document.getElementById('resultsCount');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');

    // Initialize date picker
    if (appointmentDate) {
        flatpickr(appointmentDate, {
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: [
                function (date) {
                    return (date.getDay() === 0 || date.getDay() === 6); // Disable weekends
                }
            ]
        });
    }

    // Populate time slots
    function populateTimeSlots() {
        if (!appointmentTime) return;
        appointmentTime.innerHTML = '<option value="">Select time</option>';
        const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            appointmentTime.appendChild(option);
        });
    }

    // Display doctors
    function displayDoctors(doctorsToDisplay) {
        if (!doctorResults) return;
        doctorResults.innerHTML = '';

        if (doctorsToDisplay.length === 0) {
            doctorResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No doctors found matching your criteria</p>
                </div>`;
            if (resultsCount) resultsCount.textContent = "0 Doctors Found";
            return;
        }

        if (resultsCount) resultsCount.textContent = `${doctorsToDisplay.length} ${doctorsToDisplay.length === 1 ? 'Doctor' : 'Doctors'} Found`;

        doctorsToDisplay.forEach(doctor => {
            const starRating = getStarRating(doctor.rating);
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.innerHTML = `
                <div class="doctor-image">
                    <img src="${doctor.image}" alt="${doctor.name}">
                </div>
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <span class="doctor-specialty">${doctor.specialty}</span>
                    <p class="doctor-description">${doctor.description}</p>
                    <div class="doctor-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${doctor.hospital}, ${doctor.location}</span>
                    </div>
                    <div class="doctor-experience">
                        <i class="fas fa-briefcase"></i>
                        <span>${doctor.experience} experience</span>
                    </div>
                    <div class="doctor-languages">
                        <i class="fas fa-language"></i>
                        <span>${doctor.languages}</span>
                    </div>
                    <div class="doctor-rating">
                        <div class="stars">${starRating}</div>
                        <span>${doctor.rating}/5</span>
                    </div>
                </div>
                <div class="doctor-actions">
                    <button class="btn-view-profile" data-id="${doctor.id}">View Profile</button>
                    <button class="btn-book-consult" data-id="${doctor.id}" ${!doctor.available ? 'disabled' : ''}>
                        ${doctor.available ? 'Book Consultation' : 'Not Available'}
                    </button>
                </div>
                ${doctor.available ?
                    '<div class="doctor-availability"><i class="fas fa-check-circle"></i> Available for appointments</div>' :
                    '<div class="doctor-availability" style="color: var(--danger)"><i class="fas fa-times-circle"></i> Currently not available</div>'}
            `;
            doctorResults.appendChild(doctorCard);
        });

        // Attach listeners
        document.querySelectorAll('.btn-book-consult').forEach(button => {
            button.addEventListener('click', function () {
                const doctorId = parseInt(this.getAttribute('data-id'));
                const doctor = doctors.find(d => d.id === doctorId);
                if (doctor) openBookingModal(doctor);
            });
        });

        document.querySelectorAll('.btn-view-profile').forEach(button => {
            button.addEventListener('click', function () {
                const doctorId = parseInt(this.getAttribute('data-id'));
                const doctor = doctors.find(d => d.id === doctorId);
                if (doctor) openDoctorProfile(doctor);
            });
        });
    }
    
    function openDoctorProfile(doctor) {
        alert(`Doctor Profile:\n\nName: ${doctor.name}\nSpecialty: ${doctor.specialty}\nHospital: ${doctor.hospital}\nExperience: ${doctor.experience}\n\n${doctor.description}`);
    }

    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) stars += '<i class="fas fa-star"></i>';
            else if (i === fullStars + 1 && hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    function filterDoctors() {
        const searchTerm = searchInput?.value.toLowerCase() || '';
        const specialty = specialtyFilter?.value || 'all';
        const location = locationFilter?.value || 'all';
        const hospital = hospitalFilter?.value || 'all';

        let filteredDoctors = doctors.filter(doctor => {
            const matchesSearch = searchTerm === '' ||
                doctor.name.toLowerCase().includes(searchTerm) ||
                doctor.specialty.toLowerCase().includes(searchTerm) ||
                doctor.hospital.toLowerCase().includes(searchTerm) ||
                doctor.description.toLowerCase().includes(searchTerm);

            const matchesSpecialty = specialty === 'all' || doctor.specialty === specialty;
            const matchesLocation = location === 'all' || doctor.location === location;
            const matchesHospital = hospital === 'all' || doctor.hospital === hospital;

            return matchesSearch && matchesSpecialty && matchesLocation && matchesHospital;
        });

        const sortValue = sortBy?.value || 'rating';
        if (sortValue === 'rating') {
            filteredDoctors.sort((a, b) => b.rating - a.rating);
        } else if (sortValue === 'experience') {
            filteredDoctors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        } else if (sortValue === 'name') {
            filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
        }

        displayDoctors(filteredDoctors);
    }

    function openBookingModal(doctor) {
        if (!doctor.available || !bookingModal) {
            alert('This doctor is currently not available for appointments.');
            return;
        }

        document.getElementById('modalDoctorName').textContent = doctor.name;
        document.getElementById('modalDoctorSpecialty').textContent = doctor.specialty;
        document.getElementById('modalDoctorHospital').textContent = doctor.hospital;
        document.getElementById('modalDoctorLocation').textContent = doctor.location;
        document.getElementById('modalDoctorImage').src = doctor.image;
        document.getElementById('modalDoctorImage').alt = doctor.name;

        populateTimeSlots();
        bookingModal.style.display = 'block';
    }

    function closeBookingModal() {
        if (!bookingModal) return;
        bookingModal.style.display = 'none';
        bookingForm?.reset();
    }

    // Event listeners
    searchBtn?.addEventListener('click', filterDoctors);
    searchInput?.addEventListener('keypress', e => { if (e.key === 'Enter') filterDoctors(); });
    specialtyFilter?.addEventListener('change', filterDoctors);
    locationFilter?.addEventListener('change', filterDoctors);
    hospitalFilter?.addEventListener('change', filterDoctors);
    sortBy?.addEventListener('change', filterDoctors);
    closeModal?.addEventListener('click', closeBookingModal);

    window.addEventListener('click', event => {
        if (event.target === bookingModal) closeBookingModal();
    });

    bookingForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = {
            doctorName: document.getElementById('modalDoctorName').textContent,
            date: appointmentDate.value,
            time: appointmentTime.value,
            patientName: document.getElementById('patientName').value,
            patientPhone: document.getElementById('patientPhone').value,
            patientEmail: document.getElementById('patientEmail').value,
            notes: document.getElementById('patientNotes').value
        };

        console.log('Booking submitted:', formData);

        alert(`Appointment booked successfully with ${formData.doctorName} on ${formData.date} at ${formData.time}.
A confirmation has been sent to ${formData.patientEmail}.`);

        closeBookingModal();
    });

    // Initial doctor listing
    displayDoctors(doctors);
});


// Keep your existing mobile menu functions
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
}
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const lambertexData = [4.2, 4.5, 4.3, 3.8, 3.5, 3.2, 3.1, 2.9, 2.8, 2.7, 2.8, 2.8];
    const volumeData = [2.1, 2.3, 2.2, 2.0, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8];
    const amidoneData = [120, 132, 128, 110, 105, 98, 95, 90, 88, 85, 86, 85];
    const symptomsData = [15, 18, 16, 12, 10, 9, 8, 7, 7, 6, 6, 6];

    // Initialize main chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    let mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Lambertex Score',
                data: lambertexData,
                borderColor: '#2a5c8d',
                backgroundColor: 'rgba(42, 92, 141, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#343a40'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Lambertex Score',
                        color: '#343a40'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#343a40'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });

    // Initialize mini charts
    const initMiniChart = (id, data, color) => {
        const ctx = document.getElementById(id).getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    data: data,
                    borderColor: color,
                    backgroundColor: color + '20',
                    borderWidth: 1,
                    tension: 0.3,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    };

    const lambertexChart = initMiniChart('lambertexChart', lambertexData, '#2a5c8d');
    const volumeChart = initMiniChart('volumeChart', volumeData, '#4fc3f7');
    const amidoneChart = initMiniChart('amidoneChart', amidoneData, '#17a2b8');
    const symptomsChart = initMiniChart('symptomsChart', symptomsData, '#28a745');

    // Update chart based on filters
    document.getElementById('updateChart').addEventListener('click', updateChartView);
    document.getElementById('timeRange').addEventListener('change', updateChartView);
    document.getElementById('metricType').addEventListener('change', updateChartView);

    function updateChartView() {
        const timeRange = document.getElementById('timeRange').value;
        const metricType = document.getElementById('metricType').value;
        
        let filteredMonths = [...months];
        let filteredData = [];
        let label = '';
        let color = '#2a5c8d';
        
        // Filter by time range
        if (timeRange === '3m') {
            filteredMonths = months.slice(-3);
        } else if (timeRange === '6m') {
            filteredMonths = months.slice(-6);
        } else if (timeRange === '1y') {
            filteredMonths = months;
        } else if (timeRange === 'all') {
            // In a real app, you would fetch all historical data
            filteredMonths = months;
        }
        
        // Set data based on metric type
        switch(metricType) {
            case 'lambertex':
                filteredData = lambertexData.slice(-filteredMonths.length);
                label = 'Lambertex Score';
                color = '#2a5c8d';
                break;
            case 'volume':
                filteredData = volumeData.slice(-filteredMonths.length);
                label = 'Tumor Volume (cm³)';
                color = '#4fc3f7';
                break;
            case 'amidone':
                filteredData = amidoneData.slice(-filteredMonths.length);
                label = 'Amidone Levels (ng/mL)';
                color = '#17a2b8';
                break;
            case 'symptoms':
                filteredData = symptomsData.slice(-filteredMonths.length);
                label = 'Symptom Frequency (days/month)';
                color = '#28a745';
                break;
        }
        
        // Update the main chart
        mainChart.data.labels = filteredMonths;
        mainChart.data.datasets[0].data = filteredData;
        mainChart.data.datasets[0].label = label;
        mainChart.data.datasets[0].borderColor = color;
        mainChart.data.datasets[0].backgroundColor = color + '20';
        mainChart.options.scales.y.title.text = label;
        mainChart.update();
    }

    // Initialize with default view
    updateChartView();
});

function viewReport(reportId) {
    // Function to view report details
    console.log("Viewing report:", reportId);
    // Implementation would navigate to detailed report view
}

function downloadReport(reportId) {
    // Function to download report
    console.log("Downloading report:", reportId);
    // Implementation would trigger report download
}

function shareReport(reportId) {
    // Function to share report
    console.log("Sharing report:", reportId);
    // Implementation would open share dialog
}

function applyReportFilters() {
    // Function to apply report filters
    const reportType = document.getElementById("reportType").value;
    const timePeriod = document.getElementById("timePeriod").value;
    console.log("Applying filters - Type:", reportType, "Period:", timePeriod);
    // Implementation would filter report list
}
// Mobile menu toggle
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
}

// About page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Any specific about page functionality can be added here
    console.log("About page loaded");
});