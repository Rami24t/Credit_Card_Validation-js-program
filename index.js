// // # Project
// # Credit Card Validation
//----------------------------------Part 1-----------------------------------

function validateCreditCard(creditCardNum) {
    // returns  `true`  or  `false`
    creditCardNum = removeDashes(creditCardNum);
    return is16digits(creditCardNum) && isNumber(creditCardNum) && includesDifferent(creditCardNum) && isLastEven(creditCardNum)  && isSumGT16(creditCardNum);
    };
    
    // Is it 16 digits
    function is16digits(n){
        // returns  `true`  or  `false`
        return n.length == 16;
    }
    
    // Are all numbers - n should be a string of numbers - +n tries to turn n into a number.
    function isNumber(n){
        // returns  `true`  or  `false`
       return +n === +n;
       // return Number(n) === Number(n);
    }
    
    // Has at least two different digits represented (all of the digits cannot be the same)
    function includesDifferent(n){
        // returns  `true`  or  `false`
        l=n.length-1;
    //  let different=false;
        for(let i=0;i<l;i++)
        {
            if(n[i]!=n[i+1])
            {
    //      different=true;
            return true;
            }
        }
    //   return different;
    return false;
    }
    
    // The last digit must be even
    function isLastEven(n){
        // returns  `true`  or  `false`
    return +n[15]%2==0
    }
    
    // Is the sum of all the digits must be greater than 16
    // Gives true only if the sum of all digits is greater than 16, otherwise gives false.
    function isSumGT16(n){
        // returns  `true`  or  `false`
        let sum=0;
        for(let i=0;i<n.length;i++)
        {
            sum+= +n[i];
        }
        return sum>16;
    }
    
    /** tests for part 1 **/
    console.log('Tests part 1:\n',
    'Valid:', validateCreditCard('9999777788880000'), validateCreditCard('6666666666661666'), '\n',
     'Invalid:', validateCreditCard('a92332119c011112'), validateCreditCard('4444444444444444'), validateCreditCard('1111111111111110'), validateCreditCard('6666666666666661'));
    
    
    
    //----------------------------------Part 2-----------------------------------
    // Removes dashes from a given string n and returns the new string. Example 9999-7777-8888-0000 gives 9999777788880000 as a result.
    function removeDashes(n){
    if(n.includes('-')||n.includes(' '))
    {
        let length = n.length;
        let result = '';
        for(i=0;i<length;i++)
        {
            if(n[i]!='-'&&n[i]!=' ')
            result += n[i];
        }
        return result;
    }
    else
        return n;
    }
    
    // **Bonus #2:**  Return an object indicating whether the credit card is valid, and if not, what the error is  
    // `{ valid: true, number: '9923-3211-9c01-1112' }`  
    // `{ valid: false, number: '9923-3211-9c01-1112', error: ‘wronglength’ }`
    // ----------
    
    function validateCreditCard(creditCardNum) {
        // returns an object // **Bonus #2:**  Return an object indicating whether the credit card is valid, and if not, what the error is
        let validation = {
            valid: false,
            number: creditCardNum
        }
    
        creditCardNum = removeDashes(creditCardNum);
    
        if(is16digits(creditCardNum))
        {
            if(isNumber(creditCardNum))
            {
                if(includesDifferent(creditCardNum))
                {
                    if(isLastEven(creditCardNum))
                    {
                        if(isSumGT16(creditCardNum))
                        validation.valid = true;
                        else
                        validation.error = 'sum is less than 17';
                    }
                    else
                    {
                        validation.error = 'last number is odd';
                    }
                }
                else{
                    validation.error = 'only one type of number';
                }
            }
            else{
                validation.error = 'invalid characters';
            }
        }
        else
        {
        validation.error = 'is not 16 digits';
        }
        return validation;
        };
    
    // /**** tests Part 2: Bonus Parts 1 and 2 *****/
    console.log(validateCreditCard('9999-7777-8888-0000')); //{ valid: true, number: '9999-7777-8888-0000' }
    console.log(validateCreditCard('6666-6666-6666-1666')); //{ valid: true, number: '6666-6666-6666-1666' }
    console.log(validateCreditCard('a923-3211-9c01-1112')); //{ valid: false,number: 'a923-3211-9c01-1112',error: 'invalid characters' }
    console.log(validateCreditCard('4444-4444-4444-4444')); //{ valid: false,number: '4444-4444-4444-4444',error: 'only one type of number' }
    console.log(validateCreditCard('1211-1111-1111-1112')); //{ valid: true, number: '1211-1111-1111-1112' }
    
    // Bonus 3:
    function validateDigits(creditCardNum){
        return creditCardNum.length>13 && creditCardNum.length<17;
    }
    
    function luhnChecksum(num) {
          // The Luhn Algorithm.
          var nCheck = 0, nDigit = 0, bEven = false;
          num = num.replace(/\D/g, "");
    
          for (var n = num.length - 1; n >= 0; n--) {
              var cDigit = num.charAt(n),
                    nDigit = parseInt(cDigit, 10);
    
              if (bEven) {
                  if ((nDigit *= 2) > 9) nDigit -= 9;
              }
    
              nCheck += nDigit;
              bEven = !bEven;
          }
          return (nCheck % 10) == 0;
      }
    function validateCreditCardBonus3(creditCardNum) {
		if(!creditCardNum)
			return false;
        // returns an object // **Bonus #2:**  Return an object indicating whether the credit card is valid, and if not, what the error is
        let validation = {
            valid: false,
            number: creditCardNum,
            card: 'Card was not recognized!'
        }
    
        creditCardNum = removeDashes(creditCardNum);
    
        if(validateDigits(creditCardNum))
        {
            if(isNumber(creditCardNum))
            {
                if(includesDifferent(creditCardNum))
                {
                        if(isSumGT16(creditCardNum))
                        {
                            if(luhnChecksum(creditCardNum))
                            {let aeCard = /^(?:3[47][0-9]{13})$/;
                            let visaCard = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
                            let masterCard = /^(?:5[1-5][0-9]{14})$/;
                            let discoverCard = /^6(?:011|5[0-9]{2})[0-9]{12}/;
                            let dinersCard =  /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
                            let jcbCard =  /^(?:(?:2131|1800|35\d{3})\d{11})$/;
                            let maestroCard= /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/;
                            if(creditCardNum.match(aeCard))
                            {
                                validation.card = 'American Express';
                                validation.valid = true;
                            }
                            else if(creditCardNum.match(visaCard))
                            {
                                validation.card = 'VISA';
                                validation.valid = true;
                            }
                            else if(creditCardNum.match(masterCard))
                            {
                                validation.card = 'Master';
                                validation.valid = true;
                            }
                            else if(creditCardNum.match(discoverCard))
                            {
                                validation.card = 'Discover';
                                validation.valid = true;
                            }
                            else if(creditCardNum.match(dinersCard))
                            {
                                validation.card = 'Diners';
                                validation.valid = true;
                            }
                            else if(creditCardNum.match(jcbCard))
                            {
                                validation.card = 'JCB';
                                validation.valid = true;
                            }                        
                            else if(creditCardNum.match(maestroCard))
                            {
                                validation.card = 'Maestro';
                                validation.valid = true;
                            }}
                            else
                            {
                                validation.error='Luhn checksum failed'
                            }
                        }
                        else
                        validation.error = 'sum is less than 17';
                    
                }
                else{
                    validation.error = 'only one type of number';
                }
            }
            else{
                validation.error = 'invalid characters';
            }
        }
        else
        {
        validation.error = 'invalid number of digits';
        }
        return validation;
        };
    
    console.log(validateCreditCardBonus3('a923-3211-9c01-1112')); //{ valid: false,number: 'a923-3211-9c01-1112',error: 'invalid characters' }
    console.log(validateCreditCardBonus3('4444-4444-4444-4444')); //{ valid: false,number: '4444-4444-4444-4444',error: 'only one type of number' }
    console.log(validateCreditCardBonus3('5018011773003302')); // Maestro 
    console.log(validateCreditCardBonus3('4368589145622312')); // Visa16
    console.log(validateCreditCardBonus3('5299694182311539')); // MasterCard 
    console.log(validateCreditCardBonus3('6011594786717005')); // Discover 
    console.log(validateCreditCardBonus3('378562160256959')); //  ..."Card was not recognized!", error: "Luhn checksum failed"
    console.log(validateCreditCardBonus3('372352812960339')); // AE
    console.log(validateCreditCardBonus3('30094853632161')); // Diners Club
    console.log(validateCreditCardBonus3('3577648817006573')); // JCB
    console.log(validateCreditCardBonus3('5595252046672181')); // Master
    console.log(validateCreditCardBonus3('4375528504009126')); // VISA
    
    var input=' ';
    while(input!=-1 && input){
      console.log(validateCreditCardBonus3(input=prompt(JSON.stringify(validateCreditCardBonus3(input))+'\nEnter -1 to quit or enter the\n Credit Card Number To Validate and Identify: \n')));
    }