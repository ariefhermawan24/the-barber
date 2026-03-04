document.addEventListener('DOMContentLoaded', () => {
    const services = [
        { 
            name: 'The Executive Haircut', 
            price_non_member: '$45', 
            price_member: '$35',
            image: 'https://via.placeholder.com/500x300?text=Executive+Haircut',
            description: 'A tailored, contemporary haircut designed to enhance your personal style and character with clean lines and a polished finish.'
        },
        { 
            name: 'Signature Hot Towel Shave', 
            price_non_member: '$30', 
            price_member: '$25',
            image: 'https://via.placeholder.com/500x300?text=Hot+Towel+Shave',
            description: 'A classic shaving ritual using warm towels, essential oils, and precision blades for an incredibly close and refined finish.'
        },
        { 
            name: 'Beard Sculpting & Trim', 
            price_non_member: '$25', 
            price_member: '$20',
            image: 'https://via.placeholder.com/500x300?text=Beard+Trim',
            description: 'Professional beard grooming to shape and maintain your facial hair, ensuring a sharp, clean, and well-defined look.'
        },
        { 
            name: 'Deluxe Grooming Package', 
            price_non_member: '$80', 
            price_member: '$65',
            image: 'https://via.placeholder.com/500x300?text=Grooming+Package',
            description: 'The ultimate grooming experience. Includes a haircut, a hot towel shave, and a scalp treatment for total relaxation and style.'
        },
        { 
            name: 'Scalp Treatment & Massage', 
            price_non_member: '$50', 
            price_member: '$40',
            image: 'https://via.placeholder.com/500x300?text=Scalp+Treatment',
            description: 'Revitalize your hair and scalp with a deep cleansing treatment and a relaxing massage that improves blood flow and hair health.'
        },
        { 
            name: 'Hair Coloring & Style', 
            price_non_member: '$120', 
            price_member: '$100',
            image: 'https://via.placeholder.com/500x300?text=Hair+Coloring',
            description: 'Professional hair coloring options that bring out bold sophistication and timeless elegance with long-lasting, vibrant results.'
        }
    ];

    const pricingList = document.querySelector('.pricing-list');
    const modal = document.getElementById('service-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.querySelector('.close-btn');

    // Populate service list
    services.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = 'price-item';
        div.innerHTML = `
            <div class="service-header">
                <span class="service-name">${service.name}</span>
                <i class="fas fa-eye" data-index="${index}"></i>
            </div>
            <div class="prices">
                <div class="price-info">
                    <span class="price-label">Non-Member</span>
                    <span class="price-non-member">${service.price_non_member}</span>
                </div>
                <div class="price-info">
                    <span class="price-label">Member</span>
                    <span class="price-member">${service.price_member}</span>
                </div>
            </div>
        `;
        div.addEventListener('click', (e) => {
            if (!e.target.classList.contains('fa-eye')) {
                selectService(div);
            }
        });
        pricingList.appendChild(div);
    });

    // Add event listener to preview icons
    pricingList.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-eye')) {
            const index = e.target.dataset.index;
            const service = services[index];
            showModal(service);
        }
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showModal(service) {
        modalImage.src = service.image;
        modalTitle.textContent = service.name;
        modalDescription.textContent = service.description;
        modal.style.display = 'flex';
    }

    // Custom Time Toggle
    const toggleCustomTimeBtn = document.getElementById('toggle-custom-time');
    const customTimeInput = document.getElementById('custom-time-input');
    const timeSlots = document.querySelector('.time-slots');

    toggleCustomTimeBtn.addEventListener('click', () => {
        const isCustomTimeActive = toggleCustomTimeBtn.classList.toggle('active');

        if (isCustomTimeActive) {
            toggleCustomTimeBtn.textContent = 'Cancel Custom Time';
            timeSlots.style.opacity = '0';
            setTimeout(() => {
                timeSlots.style.display = 'none';
                customTimeInput.style.display = 'block';
                setTimeout(() => {
                    customTimeInput.classList.add('show');
                    customTimeInput.focus();
                }, 10);
                selectedTime = null;
                document.querySelectorAll('.time-slot').forEach(item => item.classList.remove('selected'));
            }, 400);
        } else {
            toggleCustomTimeBtn.textContent = 'Set Custom Time';
            customTimeInput.classList.remove('show');
            setTimeout(() => {
                customTimeInput.style.display = 'none';
                timeSlots.style.display = 'grid';
                timeSlots.style.opacity = '1';
                customTimeInput.value = '';
                selectedTime = null;
            }, 400);
        }
    });

    // Payment Method Selection & Simulation
    const paymentDetailsContainer = document.getElementById('payment-details-container');
    const paymentMethods = document.querySelectorAll('.payment-option');
    let isTransitioning = false;

    paymentMethods.forEach(option => {
        option.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const method = option.dataset.method;
            paymentMethods.forEach(item => item.classList.remove('selected'));
            option.classList.add('selected');
            
            showPaymentDetails(method);
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Debounce time
        });
    });

    function showPaymentDetails(method) {
        let content = '';
        if (method === 'qr') {
            content = `
                <div class="payment-details-content">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TheBarberShop" alt="Dummy QR Code">
                    <p class="qr-code-id">Scan this QR Code to pay</p>
                    <p class="qr-code-id">ID: QRDUMMY12345</p>
                    <label class="form-input upload-label" for="proof-of-payment-qr">
                        <i class="fas fa-upload"></i> Upload Proof of Payment
                        <input type="file" id="proof-of-payment-qr" accept="image/*" style="display: none;">
                    </label>
                </div>
            `;
        } else if (method === 'digital-app') {
            content = `
                <div class="digital-app-options">
                    <div class="app-option" data-app="paypal">
                        <i class="fa-brands fa-paypal"></i>
                        <span>PayPal</span>
                        <div class="pay-btn-container"></div>
                    </div>
                    <div class="app-option" data-app="google-pay">
                        <i class="fa-brands fa-google-pay"></i>
                        <span>Google Pay</span>
                        <div class="pay-btn-container"></div>
                    </div>
                    <div class="app-option" data-app="apple-pay">
                        <i class="fa-brands fa-apple-pay"></i>
                        <span>Apple Pay</span>
                        <div class="pay-btn-container"></div>
                    </div>
                </div>
            `;
        } else if (method === 'transfer') {
            content = `
                <div class="payment-details-content">
                    <div class="bank-info">
                        <h4>Bank Transfer Details</h4>
                        <p>Bank: BCA</p>
                        <p>Account Number: 123-456-7890</p>
                        <p>Name: The Barber Shop</p>
                    </div>
                    <input type="text" id="transfer-amount" class="form-input" placeholder="Amount (e.g., $50)">
                    <input type="text" id="sender-name" class="form-input" placeholder="Sender Name">
                    <label class="form-input upload-label" for="proof-of-payment-transfer">
                        <i class="fas fa-upload"></i> Upload Proof of Payment
                        <input type="file" id="proof-of-payment-transfer" accept="image/*" style="display: none;">
                    </label>
                </div>
            `;
        }
        
        paymentDetailsContainer.classList.remove('show');
        setTimeout(() => {
            paymentDetailsContainer.innerHTML = content;
            paymentDetailsContainer.classList.add('show');
            if (method === 'digital-app') {
                attachDigitalAppListeners();
            }
        }, 400);
    }
    
    function attachDigitalAppListeners() {
        document.querySelectorAll('.app-option').forEach(app => {
            app.addEventListener('click', () => {
                // Remove .selected from all cards first, and hide all buttons smoothly
                document.querySelectorAll('.app-option').forEach(otherApp => {
                    const payBtnContainer = otherApp.querySelector('.pay-btn-container');
                    if (otherApp !== app && otherApp.classList.contains('selected')) {
                        otherApp.classList.remove('selected');
                        payBtnContainer.classList.remove('show');
                        setTimeout(() => {
                            payBtnContainer.innerHTML = '';
                        }, 400);
                    }
                });

                // Toggle the selected state on the clicked card
                const isSelected = app.classList.toggle('selected');
                const payBtnContainer = app.querySelector('.pay-btn-container');

                if (isSelected) {
                    const payBtn = document.createElement('button');
                    payBtn.className = 'pay-btn';
                    payBtn.textContent = 'Pay Now';
                    payBtn.onclick = () => alert(`Simulating payment with ${app.dataset.app.toUpperCase()}`);
                    payBtnContainer.appendChild(payBtn);
                    setTimeout(() => payBtnContainer.classList.add('show'), 10);
                } else {
                    payBtnContainer.classList.remove('show');
                    setTimeout(() => {
                        payBtnContainer.innerHTML = '';
                    }, 400);
                }
            });
        });
    }
    
    // Generate time slots
    const timeSlotsContainer = document.querySelector('.time-slots');
    const startHour = 9;
    const endHour = 21;
    for (let i = startHour; i < endHour; i++) {
        const timeSlot = document.createElement('div');
        const hour = i < 10 ? `0${i}` : `${i}`;
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00`;
        timeSlot.addEventListener('click', () => selectTime(timeSlot));
        timeSlotsContainer.appendChild(timeSlot);
    }
});

let currentStep = 1;
let selectedService = null;
let selectedTime = null;

function selectService(element) {
    const isAlreadySelected = element.classList.contains('selected');
    const serviceItems = document.querySelectorAll('.price-item');
    serviceItems.forEach(item => {
        item.classList.remove('selected');
        const oldBtnContainer = item.querySelector('.reserve-btn-container');
        if (oldBtnContainer) {
            oldBtnContainer.classList.remove('show');
            setTimeout(() => {
                oldBtnContainer.remove();
            }, 400);
        }
    });

    if (isAlreadySelected) {
        selectedService = null;
    } else {
        element.classList.add('selected');
        selectedService = element.querySelector('.service-name').textContent;
        const reserveBtnContainer = document.createElement('div');
        reserveBtnContainer.className = 'reserve-btn-container';
        const reserveBtn = document.createElement('button');
        reserveBtn.className = 'reserve-btn';
        reserveBtn.textContent = 'Reserve Now';
        reserveBtn.onclick = () => nextStep();
        reserveBtnContainer.appendChild(reserveBtn);
        element.appendChild(reserveBtnContainer);
        setTimeout(() => {
            reserveBtnContainer.classList.add('show');
        }, 10);
    }
}

function selectTime(element) {
    if (element.classList.contains('unavailable')) return;
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedTime = element.textContent;
    document.getElementById('custom-time-input').value = '';
    document.getElementById('toggle-custom-time').classList.remove('active');
    document.getElementById('toggle-custom-time').textContent = 'Set Custom Time';
    document.getElementById('custom-time-input').classList.remove('show');
    document.getElementById('custom-time-input').style.display = 'none';
    document.querySelector('.time-slots').style.display = 'grid';
    document.querySelector('.time-slots').style.opacity = '1';
}

function nextStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const nextStepEl = document.getElementById(`step${currentStep + 1}`);

    if (currentStep === 1 && !selectedService) {
        alert('Please select a service first.');
        return;
    }
    
    if (currentStep === 2) {
        const customTimeInput = document.getElementById('custom-time-input');
        if (customTimeInput.classList.contains('show') && customTimeInput.value) {
            selectedTime = customTimeInput.value;
        } else if (!selectedTime) {
            alert('Please select a time or set a custom time.');
            return;
        }
    }

    if (currentStep === 3) {
        const fullName = document.getElementById('user-fullname').value;
        const phone = document.getElementById('user-phone').value;
        if (!fullName || !phone) {
            alert('Full Name and Phone Number are required.');
            return;
        }
    }

    if (nextStepEl) {
        currentStepEl.classList.remove('active');
        nextStepEl.classList.add('active');
        currentStep++;
    }
}

function prevStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const prevStepEl = document.getElementById(`step${currentStep - 1}`);
    if (prevStepEl) {
        currentStepEl.classList.remove('active');
        prevStepEl.classList.add('active');
        currentStep--;
    }
}

function submitReservation() {
    const fullName = document.getElementById('user-fullname').value;
    const phone = document.getElementById('user-phone').value;
    const email = document.getElementById('user-email').value;
    const notes = document.getElementById('user-notes').value;
    const selectedPaymentOption = document.querySelector('.payment-option.selected');
    if (!selectedPaymentOption) {
        alert('Please select a payment method.');
        return;
    }
    const selectedPaymentMethod = selectedPaymentOption.dataset.method;
    
    // Simulate sending data and show success screen
    document.getElementById('step4').classList.remove('active');
    document.getElementById('step5').classList.add('active');
    
    // Log final data
    console.log("Reservation Summary:");
    console.log(`Service: ${selectedService}`);
    console.log(`Date: ${document.getElementById('reservation-date').value}`);
    console.log(`Time: ${selectedTime}`);
    console.log(`Full Name: ${fullName}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Notes: ${notes}`);
    console.log(`Payment Method: ${selectedPaymentMethod}`);
    
    // Reset form after a delay
    setTimeout(() => {
        resetForm();
    }, 5000); // Reset after 5 seconds
}

function resetForm() {
    document.getElementById('step5').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    currentStep = 1;
    selectedService = null;
    selectedTime = null;
    document.querySelectorAll('.price-item, .time-slot').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('input, textarea').forEach(el => el.value = '');
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('payment-details-container').innerHTML = '';
}