//Interface
function calc() {
        if (document.getElementById('expression').value != '') {
        exp = document.getElementById('expression').value;
        ans = eval(exp);
        console.log(exp, " ", ans);
        if (ans != undefined) {
        document.getElementById('answers').innerHTML+= exp;
        document.getElementById('answers').innerHTML+= '<span class="answertext">\t=\t';
        document.getElementById('answers').innerHTML+= '<b>' + ans + '</b></span>';
        document.getElementById('answers').innerHTML+= '<br><br>';
        document.getElementById('expression').value = ans;
        } else {
            document.getElementById('expression').value = '';
        }
        }
    }
    function focbox() {
        document.getElementById('expression').focus();
    }
    function clear() {
        document.getElementById('expression').value = '';
        console.log('worked');
    }
    // Math functions
    function divide() {
        document.getElementById('expression').value += '/';
    }
    function multiply() {
        document.getElementById('expression').value += '*';
    }
    function btninput(val) {
        document.getElementById('expression').value += val;
    }

    let sqrt = (n) => Math.sqrt(n);

    let pi = Math.PI;

    let sum = (...nums) => [...nums].reduce((acc, val) => (acc + val));