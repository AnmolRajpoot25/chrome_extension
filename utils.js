export async function getCurrentTab(){
    let queryoptions = { active :  true , curretWindow :true};
    let [tab] = await chrome.tabs.query ( queryoptions);
    return tab; 
}