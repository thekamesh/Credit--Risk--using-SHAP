const form=document.getElementById("riskForm");
const predictBtn=document.getElementById("predictBtn");
const result=document.getElementById("result");
const errorBox=document.getElementById("errorBox");
const demoBtn=document.getElementById("demoBtn");
const resetBtn=document.getElementById("resetBtn");
const ratioInput=document.getElementById("loan_percent_income");
const ratioOutput=document.getElementById("loanPercentOutput");

ratioInput.addEventListener("input",()=>ratioOutput.value=Number(ratioInput.value).toFixed(2));

const get=id=>document.getElementById(id).value;

function loadDemo(){
  const demo={
    person_age:30,person_income:55000,person_home_ownership:"RENT",
    person_emp_length:4,loan_intent:"PERSONAL",loan_grade:"C",
    loan_amnt:10000,loan_int_rate:12.5,loan_percent_income:.18,
    cb_person_default_on_file:"N",cb_person_cred_hist_length:7
  };
  Object.entries(demo).forEach(([k,v])=>{
    const el=document.getElementById(k);
    if(el)el.value=v;
  });
  ratioOutput.value=".18";
  hideError();result.classList.add("hidden");
}

function showError(msg){errorBox.textContent=msg;errorBox.classList.remove("hidden")}
function hideError(){errorBox.classList.add("hidden");errorBox.textContent=""}
function loading(on){predictBtn.disabled=on;predictBtn.classList.toggle("loading",on)}
function pct(v){return `${(v*100).toFixed(1)}%`}

function countUp(el,target,duration=900){
  const start=performance.now();
  function frame(now){
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=pct(target*eased);
    if(p<1)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function renderResult(data){
  const probability=Number(data.default_probability);
  const threshold=Number(data.threshold);
  const high=Number(data.default_prediction)===1;

  result.classList.remove("hidden","high-risk");
  if(high)result.classList.add("high-risk");

  document.getElementById("resultTitle").textContent=data.Result;
  document.getElementById("riskIcon").textContent=high?"!":"✓";
  document.getElementById("threshold").textContent=threshold.toFixed(2);
  document.getElementById("resultMessage").textContent=high
    ?"The model estimates that this application is above the configured default-risk threshold."
    :"The model estimates that this application is below the configured default-risk threshold.";

  const fill=document.getElementById("meterFill");
  const marker=document.getElementById("meterMarker");
  fill.style.width="0%";

  requestAnimationFrame(()=>{
    fill.style.width=`${Math.max(0,Math.min(probability*100,100))}%`;
    marker.style.left=`calc(${Math.max(0,Math.min(threshold*100,100))}% - 1px)`;
  });

  const probabilityEl=document.getElementById("probability");
  countUp(probabilityEl,probability);
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
}

form.addEventListener("submit",async e=>{
  e.preventDefault();hideError();loading(true);

  const payload={
    person_age:Number(get("person_age")),
    person_income:Number(get("person_income")),
    person_home_ownership:get("person_home_ownership"),
    person_emp_length:Number(get("person_emp_length")),
    loan_intent:get("loan_intent"),
    loan_grade:get("loan_grade"),
    loan_amnt:Number(get("loan_amnt")),
    loan_int_rate:Number(get("loan_int_rate")),
    loan_percent_income:Number(get("loan_percent_income")),
    cb_person_default_on_file:get("cb_person_default_on_file"),
    cb_person_cred_hist_length:Number(get("cb_person_cred_hist_length"))
  };

  try{
    const response=await fetch("/predict",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    const data=await response.json();
    if(!response.ok)throw new Error(data.detail||"Prediction request failed.");
    renderResult(data);
  }catch(err){
    showError(err.message||"Unable to contact the prediction API.");
  }finally{loading(false)}
});

demoBtn.addEventListener("click",loadDemo);
resetBtn.addEventListener("click",()=>{
  result.classList.add("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});
ratioOutput.value=Number(ratioInput.value).toFixed(2);
