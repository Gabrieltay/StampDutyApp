
const FIRST_TIER = 0.01;
const SECOND_TIER = 0.02;
const THIRD_TIER = 0.03;
const QUANTUM = 180000;

// Calculate Buyer Stamp Duty
function calculateBSD(valuation) {
    var payable = 0;
    // First Tier - First $180,000
    payable += ((valuation > QUANTUM) ? QUANTUM : valuation) * FIRST_TIER;

    // Second Tier - Second $180,000   
    if ( valuation > QUANTUM) {
        payable += ((valuation-QUANTUM > QUANTUM) ? QUANTUM : valuation-QUANTUM) * SECOND_TIER;
    }
    // Third Tier - Remaining
    if ( valuation > QUANTUM * 2 ){
        payable += (valuation - ( QUANTUM * 2 )) * THIRD_TIER;
    }
    return payable;
}

// Resident Type: 0 - SC, 1 - PR, 2 - FR
function calculateABSD(valuation, residentType, propertyCount) {
    var payable = 0;
    // Singapore Citizen
    if ( residentType == 0 ) {
        if ( propertyCount == 2 )
            payable += valuation * 0.07;
        else if ( propertyCount > 2 )
            payable += valuation * 0.1;    
    }
    // Permanent Resident
    else if ( residentType == 1 ) {
        if ( propertyCount ==1 )
            payable += valuation * 0.05;
        else if ( propertyCount > 1 )
            payable += valuation * 0.1;    
    }
    // Foreigner Resident
    else if ( residentType == 2 ) {
        payable += valuation * 0.15;
    }
    else 
        console.log("Invalid Resident Type - " + residentType);
    return payable;
}

// Calculate Seller Stamp Duty
//function calculateSSD(purchaseDate, sellingDate, valuation)
//{
 //   if ( )
//}

function computeBSD(page) {
    var stampDutyEl = page.querySelector("#stampDuty");
    var valuation = page.querySelector('#value').value;
    var propCountEl = page.querySelector("#propCount");
    var propCount = propCountEl.options[propCountEl.selectedIndex].value;
    var residentType = document.querySelector('input[class="residentRb"]:checked').value;

    calculateABSD(valuation, residentType, propCount);
    stampDutyEl.innerHTML = "$" + ( calculateBSD(valuation) + calculateABSD(valuation, residentType, propCount) );
    console.log("Changes - " +  valuation);
}

document.addEventListener("init", function(event) {
    var page = event.target;

    if (page.matches('#BSDPage')) {
        page.querySelector('#value').addEventListener("change", function() { computeBSD(page) } );
        page.querySelector('#propCount').addEventListener("change", function() { computeBSD(page) });
        page.querySelectorAll(".residentRb").forEach(function(element) {
            element.addEventListener('change', function() { computeBSD(page) }, false);
        }, this);
    }
    else if (page.matches('#SSDPage')) {
        console.log("SSD")
    }
});
