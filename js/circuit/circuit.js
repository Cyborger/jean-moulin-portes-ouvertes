async function load(){
    const planRequest = await fetch("js/circuit/plan.json");
    const plan = await planRequest.json();
    console.log(plan)
}
load();