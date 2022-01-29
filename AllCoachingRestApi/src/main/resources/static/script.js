
let intervalTimeInSec=5
function startTimer(value){
   let interval = setInterval(()=>{
    intervalTimeInSec= intervalTimeInSec-1

    $("#countDown").html("Redirecting back in "+intervalTimeInSec)
    if(intervalTimeInSec==0)
    {
        clearInterval(interval)
        window.ReactNativeWebView.postMessage(value)
    }
            

    },1000)
}