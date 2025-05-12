document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Show/hide details fields based on selection
    const tobaccoUse = document.getElementById('tobaccoUse');
    const tobaccoDetailsGroup = document.getElementById('tobaccoDetailsGroup');
    
    const alcoholUse = document.getElementById('alcoholUse');
    const alcoholDetailsGroup = document.getElementById('alcoholDetailsGroup');
    
    const drugUse = document.getElementById('drugUse');
    const drugDetailsGroup = document.getElementById('drugDetailsGroup');
    
    tobaccoUse.addEventListener('change', function() {
        if (this.value === 'current' || this.value === 'former') {
            tobaccoDetailsGroup.style.display = 'block';
        } else {
            tobaccoDetailsGroup.style.display = 'none';
        }
    });
    
    alcoholUse.addEventListener('change', function() {
        if (this.value === 'regular' || this.value === 'occasional') {
            alcoholDetailsGroup.style.display = 'block';
        } else {
            alcoholDetailsGroup.style.display = 'none';
        }
    });
    
    drugUse.addEventListener('change', function() {
        if (this.value === 'current' || this.value === 'former') {
            drugDetailsGroup.style.display = 'block';
        } else {
            drugDetailsGroup.style.display = 'none';
        }
    });
    
    // BMI calculation
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('bmi');
    
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        if (height && weight) {
            // Assuming height is in cm and weight is in kg
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            bmiInput.value = bmi;
        }
    }
    
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);
    
    // Add medication functionality
    const addMedicationBtn = document.getElementById('addMedicationBtn');
    const additionalMedications = document.getElementById('additionalMedications');
    let medCounter = 1;
    
    addMedicationBtn.addEventListener('click', function() {
        medCounter++;
        const newMedication = document.createElement('div');
        newMedication.className = 'medication-entry';
        newMedication.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="medicationName${medCounter}">Medication Name</label>
                    <input type="text" id="medicationName${medCounter}" placeholder="e.g., Amoxicillin">
                </div>
                <div class="form-group">
                    <label for="medicationDosage${medCounter}">Dosage</label>
                    <input type="text" id="medicationDosage${medCounter}" placeholder="e.g., 500mg">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="medicationFrequency${medCounter}">Frequency</label>
                    <input type="text" id="medicationFrequency${medCounter}" placeholder="e.g., BID">
                </div>
                <div class="form-group">
                    <label for="medicationRoute${medCounter}">Route</label>
                    <select id="medicationRoute${medCounter}">
                        <option value="oral">Oral</option>
                        <option value="iv">IV</option>
                        <option value="im">IM</option>
                        <option value="sc">Subcutaneous</option>
                        <option value="topical">Topical</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="medicationStartDate${medCounter}">Start Date</label>
                    <input type="date" id="medicationStartDate${medCounter}">
                </div>
                <div class="form-group">
                    <label for="medicationEndDate${medCounter}">End Date</label>
                    <input type="date" id="medicationEndDate${medCounter}">
                </div>
            </div>

            <div class="form-group">
                <label for="medicationIndication${medCounter}">Indication</label>
                <input type="text" id="medicationIndication${medCounter}" placeholder="Reason for medication">
            </div>
            
            <div class="form-group">
                <label for="medicationNotes${medCounter}">Notes</label>
                <textarea id="medicationNotes${medCounter}" rows="2" placeholder="Additional notes"></textarea>
            </div>
            
            <div class="medication-actions">
                <button type="button" class="remove-btn" data-med="${medCounter}"><i class="fas fa-trash"></i> Remove Medication</button>
            </div>
        `;
        
        additionalMedications.appendChild(newMedication);
        
        // Add event listener to the new remove button
        newMedication.querySelector('.remove-btn').addEventListener('click', function() {
            additionalMedications.removeChild(newMedication);
        });
    });
    
    // Add procedure functionality
    const addProcedureBtn = document.getElementById('addProcedureBtn');
    const additionalProcedures = document.getElementById('additionalProcedures');
    let procedureCounter = 1;
    
    addProcedureBtn.addEventListener('click', function() {
        procedureCounter++;
        const newProcedure = document.createElement('div');
        newProcedure.className = 'procedure-entry';
        newProcedure.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="procedureName${procedureCounter}">Procedure Name</label>
                    <input type="text" id="procedureName${procedureCounter}" placeholder="e.g., Appendectomy">
                </div>
                <div class="form-group">
                    <label for="procedureDate${procedureCounter}">Date</label>
                    <input type="date" id="procedureDate${procedureCounter}">
                </div>
            </div>
            
            <div class="form-group">
                <label for="procedureDescription${procedureCounter}">Description</label>
                <textarea id="procedureDescription${procedureCounter}" rows="3" placeholder="Procedure description"></textarea>
            </div>
            
            <div class="form-group">
                <label for="procedureIndication${procedureCounter}">Indication</label>
                <input type="text" id="procedureIndication${procedureCounter}" placeholder="Reason for procedure">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="procedureOutcome${procedureCounter}">Outcome</label>
                    <select id="procedureOutcome${procedureCounter}">
                        <option value="successful">Successful</option>
                        <option value="complications">With Complications</option>
                        <option value="unsuccessful">Unsuccessful</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="procedureProvider${procedureCounter}">Provider</label>
                    <input type="text" id="procedureProvider${procedureCounter}" placeholder="Who performed the procedure">
                </div>
            </div>
            
            <div class="form-group">
                <label for="procedureNotes${procedureCounter}">Notes</label>
                <textarea id="procedureNotes${procedureCounter}" rows="2" placeholder="Additional notes"></textarea>
            </div>
            
            <div class="procedure-actions">
                <button type="button" class="remove-btn" data-procedure="${procedureCounter}"><i class="fas fa-trash"></i> Remove Procedure</button>
            </div>
        `;
        
        additionalProcedures.appendChild(newProcedure);
        
        // Add event listener to the new remove button
        newProcedure.querySelector('.remove-btn').addEventListener('click', function() {
            additionalProcedures.removeChild(newProcedure);
        });
    });
    
    // Form submission handlers
    document.getElementById('demographicsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Demographic data saved successfully!');
    });
    
    document.getElementById('complaintsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Chief complaints saved successfully!');
    });
    
    document.getElementById('historyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('History data saved successfully!');
    });
    
    document.getElementById('socialForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Social history saved successfully!');
    });
    
    document.getElementById('physicalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Physical examination data saved successfully!');
    });
    
    document.getElementById('labForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Laboratory data saved successfully!');
    });
    
    document.getElementById('diagnosisForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Diagnosis data saved successfully!');
    });
    
    document.getElementById('medicationsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Medications saved successfully!');
    });
    
    document.getElementById('proceduresForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Procedures saved successfully!');
    });
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', function() {
        const patientID = document.getElementById('patientID').value;
        if (patientID) {
            alert(`Searching for patient with MRN: ${patientID}`);
            // In a real app, this would fetch patient data from a server
        } else {
            alert('Please enter a patient MRN');
        }
    });
    
    // New patient functionality
    document.getElementById('newPatientBtn').addEventListener('click', function() {
        if (confirm('Create a new patient record? All unsaved data will be lost.')) {
            // Reset all forms
            document.querySelectorAll('form').forEach(form => form.reset());
            // Clear additional medications and procedures
            additionalMedications.innerHTML = '';
            additionalProcedures.innerHTML = '';
            // Reset counters
            medCounter = 1;
            procedureCounter = 1;
            // Go to demographics tab
            document.querySelector('.tab-btn[data-tab="demographics"]').click();
            alert('New patient record created. Please enter demographic data.');
        }
    });
    
    // Save all functionality
    document.getElementById('saveAllBtn').addEventListener('click', function() {
        if (confirm('Save all patient data?')) {
            // In a real app, this would submit all forms to the server
            alert('All patient data saved successfully!');
        }
    });
    
    // Summary modal functionality
    const summaryModal = document.getElementById('summaryModal');
    const summaryBtn = document.getElementById('summaryBtn');
    const closeBtn = document.querySelector('.close-btn');
    const closeSummaryBtn = document.getElementById('closeSummaryBtn');
    const printSummaryBtn = document.getElementById('printSummaryBtn');
    
    summaryBtn.addEventListener('click', function() {
        // Generate summary content
        const summaryContent = document.getElementById('summaryContent');
        summaryContent.innerHTML = `
            <h3>Patient Summary</h3>
            <p><strong>Name:</strong> ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</p>
            <p><strong>DOB:</strong> ${document.getElementById('dob').value}</p>
            <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
            
            <h4>Chief Complaint</h4>
            <p>${document.getElementById('chiefComplaint').value || 'Not specified'}</p>
            
            <h4>Vital Signs</h4>
            <p><strong>BP:</strong> ${document.getElementById('bloodPressure').value || '--'} | 
            <strong>HR:</strong> ${document.getElementById('heartRate').value || '--'} bpm | 
            <strong>RR:</strong> ${document.getElementById('respiratoryRate').value || '--'} | 
            <strong>Temp:</strong> ${document.getElementById('temperature').value || '--'}</p>
            
            <h4>Diagnosis</h4>
            <p><strong>Primary:</strong> ${document.getElementById('primaryDiagnosis').value || 'Not specified'}</p>
            <p><strong>Secondary:</strong> ${document.getElementById('secondaryDiagnoses').value || 'None'}</p>
            
            <h4>Medications</h4>
            <p>${document.getElementById('medicationName').value ? 
                `${document.getElementById('medicationName').value} ${document.getElementById('medicationDosage').value} ${document.getElementById('medicationFrequency').value}` : 
                'None prescribed'}</p>
            
            <h4>Plan</h4>
            <p>${document.getElementById('labTestsOrdered').value || 'No tests ordered'}</p>
            <p>${document.getElementById('procedureName').value ? `Planned procedure: ${document.getElementById('procedureName').value}` : 'No procedures planned'}</p>
        `;
        
        summaryModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        summaryModal.style.display = 'none';
    });
    
    closeSummaryBtn.addEventListener('click', function() {
        summaryModal.style.display = 'none';
    });
    
    printSummaryBtn.addEventListener('click', function() {
        window.print();
        alert('Printing summary...');
        // In a real app, this would open the print dialog
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === summaryModal) {
            summaryModal.style.display = 'none';
        }
    });
    
    // Print functionality
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
        alert('Printing patient record...');
        // In a real app, this would open the print dialog
    });
});