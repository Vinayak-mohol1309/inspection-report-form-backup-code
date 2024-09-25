// Fetch the JSON data from the external file
fetch('productData.json') // Ensure the path is correct
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse JSON data
    })
    .then(data => {
        // Now you have the JSON data
        console.log(data); // This will log the loaded productData
	     const productData = data;
 })
    .catch(error => {
        console.error('Error loading the JSON data:', error);
    });





    // refresh page script code
    document.addEventListener('DOMContentLoaded', () => {
    let startY = 0;
    const refreshIcon = document.createElement('div');
    refreshIcon.classList.add('refresh-icon');
    refreshIcon.innerHTML = '&#x21bb;';
    document.body.appendChild(refreshIcon);

    window.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) startY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
        if (window.scrollY === 0 && e.touches[0].clientY > startY + 50) {
            refreshIcon.style.display = 'block';
        }
    });

    window.addEventListener('touchend', () => {
        if (refreshIcon.style.display === 'block') location.reload();
        refreshIcon.style.display = 'none';
    });
});

	
    // fuction to generate reference code    
    function generateReferenceNumber() {
    const prefix = 'SSQC';
    // Get the current date and time
    const now = new Date();
    // Extract date parts
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
    // Extract time parts
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Form the date and time parts
    const datePart = `${day}${month}${year}`;
    const timePart = `${hours}${minutes}${seconds}`;
    const referenceNumber = `${prefix}-${datePart}/${timePart}`;// Form the reference number
    return referenceNumber;
}
    // console.log(generateReferenceNumber());
    var referenceNumber = generateReferenceNumber();
         
        // Options for each dropdown
        const nameOptions = ["Balu Limhan", "Pradeep Karlekar"];
        const supplierOptions = [
    "HINDUSTAN PLATINUM",
    "AARADHYA ENTERPRISES",
    "MARUTI ENTERPRISES",
    "ALFA TOOLS",
    "Oswal Daga Agencies",
    "Nagnath Lashkar -e",
    "Upasana Enterprises",
    "Sunkraft Industries-m",
    "Rungta electrical Industries -e",
    "Ganeshkrupa packaging",
    "Fluxion Process Solution -m",
    "Shreya System-e",
    "Accord Tech pvt. ltd.",
    "Alpha Engineers",
    "Chaneyco Refratech pvt. ltd.",
    "Raysons Sand Chem pvt. ltd.",
    "RESUCERIAL QUARTZ LIANYUNGANG IND.& TRADING CO.LTD",
    "Fortis Metals",
    "Sanduif Asia ltd(Kanthal Division)",
    "M.R Enterprises",
    "PayPay Instrumentation",
    "Turbo Electronic system",
    "Jai lakshmi Agro-chemical pvt. ltd.-e",
    "Twintech control system pvt. ltd.-e",
    "Rajendra industries-m",
    "Shah wadilal Narottamdas-m",
    "Rexor & Company INC",
    "Pandurang paper & board mill-m",
    "Syno plast",
    "RAINBOW COLOR PLAST",
    "S.K. Traders",
    "Sadguru Trading CORP. -e",
    "Changzhou foreign Trade CORP.",
    "Shree Datt Eng. works",
    "NAV Bharat trading company",
    "Bombay Silicate works-e",
    "Superb Components-m",
    "PLASTIC PRODUCTS -M",
    "PATIL INDUSTRIES",
    "SRI RAAM GOWRI HI-TECH POLYMERS P.LTDL - e",
    "JOHNSON MATTHEY PLC.",
    "IMERY REFRACTORY MINERALS (AGS MINERAUX)",
    "Almatis Alumina Pvt.Ltd. - e",
    "PRISM INDUSTRIES",
    "ASSOCIATED REFRACTORIES AND MINERALS (PUNE)",
    "PLASTIC PRODUCTS -M",
    "Goodfellow Cambridge Limited",
    "SHREE GURUDATTA INDUSTRIES PRIVATE LIMITED - e",
    "M-ALLOYS CORPORATION - e",
    "TULSI IMPEX",
    "NITYANAND ENTERPRISES. - e",
    "NAAM ENGINEERING ASSOCIATES",
    "SIMOND FIBERTECH LIMITED -m",
    "DKIC PRIVATE LIMITED. - e",
    "REXOR AND COMPANY INC",
    "Babji Tin Works",
    "Shakti Industries",
    "Refractory Udhyog",
    "Siddhakala Packaging",
    "Bethel Systems",
    "Iprint",
    "Shree Foundry Chemicals India pvt. ltd.",
    "Prism Cabel Company"
];
        const productOptions = productData.products.map(product => product.name);

        // Set default date to current date
        document.getElementById('date').value = new Date().toISOString().split('T')[0];

        // Function to handle 'other' option selection
        function handleOtherField(option, inputField) {
            const element = document.getElementById(inputField);
            if (element) {
                if (option === 'Other') {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                    element.value = '';
                }
            }
        }

        // Function to filter and show suggestions
        function showSuggestions(inputElement, suggestionsElement, options) {
            const filter = inputElement.value.toLowerCase().trim();
            const suggestions = options.filter(option => option.toLowerCase().includes(filter));
            suggestionsElement.innerHTML = suggestions.map(option => `<div class="suggestion-item" onclick="selectSuggestion('${option}', '${inputElement.id}', '${suggestionsElement.id}')">${option}</div>`).join('');
            suggestionsElement.style.display = suggestions.length > 0 ? 'block' : 'none';
        }

        // Function to handle suggestion selection
        function selectSuggestion(option, inputId, suggestionsId) {
            document.getElementById(inputId).value = option;
            document.getElementById(suggestionsId).style.display = 'none';
            handleOtherField(option, `other${inputId.charAt(0).toUpperCase() + inputId.slice(1, -5)}`);
            if (inputId === 'productInput') {
                updateItemCodeAndQualityChecks();
            }
        }

        // Function to handle item code input
        function handleItemCodeInput() {
            const itemCodeInput = document.getElementById('itemCodeInput');
            const productName = document.getElementById('productInput').value;
            const product = productData.products.find(p => p.code === itemCodeInput.value && p.name === productName);
            if (product) {
                generateQualityChecks(product.fields);
            } else {
                generateStandardQualityChecks();
            }
        }

        // Function to generate quality check fields based on product fields
        function generateQualityChecks(fields) {
            const qualityChecksContainer = document.getElementById('qualityChecksContainer');
            qualityChecksContainer.innerHTML = ''; // Clear previous fields
            
            fields.forEach(field => {
                const label = document.createElement('label');
                label.textContent = field.label;
    
                const checkRow = document.createElement('div');
                checkRow.classList.add('check-row');
    
                for (let i = 0; i < 3; i++) { // Generate three input fields per label
                    const input = document.createElement('input');
                    input.type = 'text';
                    
                    input.name = field.name; // Unique name for each input
                    checkRow.appendChild(input);
                }
    
                qualityChecksContainer.appendChild(label);
                qualityChecksContainer.appendChild(checkRow);
            });
        }

        // Function to generate standard quality check fields
        function generateStandardQualityChecks() {
            const qualityChecksContainer = document.getElementById('qualityChecksContainer');
            qualityChecksContainer.innerHTML = ''; // Clear previous fields
            
            productData.standardFields.forEach(field => {
                const label = document.createElement('label');
                label.textContent = field.label;
    
                const checkRow = document.createElement('div');
                checkRow.classList.add('check-row');
    
                for (let i = 0; i < 3; i++) { // Generate three input fields per label
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = field.name; // Unique name for each input
                    checkRow.appendChild(input);
                }
    
                qualityChecksContainer.appendChild(label);
                qualityChecksContainer.appendChild(checkRow);
            });
        }

        // Hide suggestions when clicking outside
        document.addEventListener('click', (event) => {
            const inputIds = ['nameInput', 'supplierInput', 'productInput', 'itemCodeInput'];
            const suggestionsIds = ['nameSuggestions', 'supplierSuggestions', 'productSuggestions', 'itemCodeSuggestions'];
            inputIds.forEach(inputId => {
                const inputElement = document.getElementById(inputId);
                if (inputElement && !inputElement.contains(event.target)) {
                    const suggestionsElement = inputElement.nextElementSibling;
                    if (suggestionsElement) {
                        suggestionsElement.style.display = 'none';
                    }
                }
            });
            suggestionsIds.forEach(suggestionsId => {
                const suggestionsElement = document.getElementById(suggestionsId);
                if (suggestionsElement && !suggestionsElement.contains(event.target)) {
                    suggestionsElement.style.display = 'none';
                }
            });
        });

        // Attach event listeners for input fields
        document.getElementById('nameInput').addEventListener('input', () => {
            showSuggestions(document.getElementById('nameInput'), document.getElementById('nameSuggestions'), nameOptions);
        });

        document.getElementById('supplierInput').addEventListener('input', () => {
            showSuggestions(document.getElementById('supplierInput'), document.getElementById('supplierSuggestions'), supplierOptions);
        });

        document.getElementById('productInput').addEventListener('input', () => {
            showSuggestions(document.getElementById('productInput'), document.getElementById('productSuggestions'), productOptions);
            updateItemCodeAndQualityChecks();
        });

        // Update item code and quality checks based on selected product
        function updateItemCodeAndQualityChecks() {
            const productName = document.getElementById('productInput').value;
            const product = productData.products.find(p => p.name === productName);
            if (product) {
                document.getElementById('itemCodeInput').value = product.code;
                generateQualityChecks(product.fields);
            } else {
                document.getElementById('itemCodeInput').value = '';
                generateStandardQualityChecks();
            }
        }

        document.getElementById('itemCodeInput').addEventListener('input', handleItemCodeInput);

        // Handle form submission
        function submitForm(event) {
            event.preventDefault(); // Prevent default form submission
            // no internet connection alert
              if (!navigator.onLine) {
        alert('No internet connection.');
        return;
    }
            // Gather form data
            const formData = {
                code: referenceNumber,
                name: document.getElementById('nameInput').value,
                date: document.getElementById('date').value,
                supplierName: document.getElementById('supplierInput').value,
                billNo: document.getElementById('billNo').value,
                 gateEntryNo: document.getElementById('gateEntryNo').value,
                productName: document.getElementById('productInput').value,
                invoiceQuantity: document.getElementById('invoiceQuantity').value,
                actualQuantity: document.getElementById('actualQuantity').value,
                itemCode: document.getElementById('itemCodeInput').value,
                qualityChecks: [],
                remark: document.getElementById('remark').value,
                actionTaken: document.getElementById('actionTaken').value
            };

      // Collect all quality check values
        const qualityChecksContainer = document.getElementById('qualityChecksContainer');
        const checkRows = qualityChecksContainer.querySelectorAll('.check-row');
        checkRows.forEach((row) => {
            const inputs = row.querySelectorAll('input');
            inputs.forEach((input) => {
                formData.qualityChecks.push({ name: input.name, value: input.value });
            });
        });
            

            // Prepare data to send
            // const dataToSend = JSON.stringify(formData);
             console.log(formData);
             var url = 'https://script.google.com/macros/s/AKfycbz8hHqeleBytlB3cXLLPisSer6mTtEIUI3XIJbe9ufdLMQdTiFwaznFU3lYVrAqRcVlBg/exec';
                fetch(url, {
                    redirect:"follow",
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                   
                })
                .then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            if (data.status === 'success') {
                alert("Form submitted successfully.\nReference number :- "+referenceNumber );
                document.getElementById('inspectionForm').reset();
                document.getElementById('date').value = new Date().toISOString().split('T')[0];
                document.getElementById('qualityChecksContainer').innerHTML = '';
                location.reload(); //it refresh the page after click 'ok' to successful alert message.
            } else {
                throw new Error('Failed to submit form.');
            }
        })
        .catch((error) => {
            alert('Failed to submit the form.');
            console.error('Error:', error);
        });
};
         document.addEventListener('focusin', (event) => {
            const target = event.target;
            if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
